import express from 'express';
import { HomeRoutes } from './api/index.js';

const router = express.Router();

router.use("/", HomeRoutes)

export {
    router as AllRoutes,
    
}