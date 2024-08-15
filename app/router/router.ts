import express from 'express';
import { HomeRoutes } from './api/index.js';
import { UserAuthRoutes } from './user/auth.js';

const router = express.Router();

router.use("/user", UserAuthRoutes);
router.use("/", HomeRoutes);

export {
    router as AllRoutes,
}