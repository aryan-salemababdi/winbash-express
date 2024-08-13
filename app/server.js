import express from "express";
import http from "http"
import path from 'path';
import cors from "cors";
import { fileURLToPath } from 'url';
import { AllRoutes } from "./router/router.js";
import {pool} from "./utils/db.js"

class Application {
    #app = express();
    #PORT;
    constructor(PORT) {
        this.#PORT = PORT;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    };
    configApplication() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.#app.use(cors());
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
            await pool.connect();
            console.log('Connected to Postgresql');
        } catch (error) {
            console.error('Could not connect to postgresql', error);
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