import express, {
    Express,
    Request,
    Response,
    NextFunction
} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import http from "http";
import path from "path";
import cors from "cors";
import httpErrors from "http-errors";
import { PoolClient } from "pg";
import { fileURLToPath } from "url";
import { AllRoutes } from "./router/router";
import { pool } from "./utils/db.js";
import morgan from "morgan";

interface ErrorMessage {
    status: number;
    statusCode: number;
    message: string;
}

class Application {

    #app: Express;
    #PORT: number;

    constructor(PORT: number) {
        this.#PORT = PORT;
        this.#app = express();
        this.configApplication();
        this.connectToPgDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }

    configApplication() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.#app.use(morgan("dev"));
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
        this.#app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
            swaggerDefinition: {
                info: {
                    title: "winbash",
                    version: "1.0.0",
                    description: "اولین مرجع خرید و فروش به وسیله قرعه کشی توسط کاربران",
                    contact: {
                        name: "aryan salemabadi",
                        url: "http://localhost:5000",
                        email: "aryansab80@gmail.com"
                    }
                },
                server: [
                    {
                        url: "http://localhost:5000",
                    }
                ]
            },
            apis: ["./app/router/**/*.ts"]
        })))
    }

    createServer() {
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run > http://localhost:${this.#PORT}`);
        });
    }

    async connectToPgDB() {
        let client: PoolClient | undefined;
        try {
            client = await pool.connect();
            console.log('Connected to PostgreSQL!');

            process.on('SIGINT', async () => {
                await pool.end();
                console.log('Disconnected from PostgreSQL!');
                process.exit(0);
            });

        } catch (err) {
            console.error('Could not connect to postgresql', err);
        } finally {
            if (client) client.release();
        }
    }

    createRoutes() {
        this.#app.use(AllRoutes);
    }

    errorHandling() {
        this.#app.use((req, res, next) => {
            next(httpErrors.NotFound("آدرس مورد نظر یافت نشد"));
        });
        this.#app.use((error: ErrorMessage, req: Request, res: Response, next: NextFunction) => {
            const serverError = httpErrors.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                statusCode,
                errors: {
                    message,
                },
            });
        });
    }
}

export default Application;
