import express from "express";
import { categoryRoutes } from "./category";
import { AdminApiProductsRouter } from "./products";

const router = express.Router();

/**
 * @swagger
 * tags:
 *      -   name: Admin-Panel
 *          description: action of admin (Add, remove, edit and any do)
 *      -   name: product(AdminPanel)
 *          description: management products routes
 *  
 */

router.use("/products", AdminApiProductsRouter)

router.use("/category", categoryRoutes);



export {
    router as AdminRoutes
}