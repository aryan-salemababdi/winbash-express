import express from "express";
import mongoose from "mongoose";
import http from "http"
import path from 'path';
import { fileURLToPath } from 'url';
import { AllRoutes } from "./router/router.js";


class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    };
    configApplication() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
    };
    createServer() {
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run > http://localhost:${this.#PORT}`);
        })
    };
    async connectToMongoDB() {
        try {
            await mongoose.connect(this.#DB_URI);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Could not connect to MongoDB', error);
        }
    }
    createRoutes() {
            this.#app.use(AllRoutes);
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                statusCode: 404,
                message: "آدرس مورد نظر یافت نشد!"
            })
        })
        this.#app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            const message = err.message || "InternalServerError";

            return res.status(statusCode).json({
                statusCode,
                message
            })

        })
    }
};


export default Application;