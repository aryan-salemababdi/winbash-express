import express from "express";
import { categoryRoutes } from "./category";

const router = express.Router();

/**
 * @swagger
 * tags:
 *      name: Admin-Panel
 *      description: action of admin (Add, remove, edit and any do)
 */

router.use("/category", categoryRoutes);



export {
    router as AdminRoutes
}