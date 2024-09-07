import express from "express";
import multer from "multer";
import ProductController from "../../http/controllers/admin/product/product.controller";

const upload = multer();

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   describe
 *                  -   price_per_tickets
 *                  -   total_tickets
 *                  -   short_text
 *                  -   draw_date
 *                  -   category
 *                  -   images
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of the product
 *                  describe:
 *                      type: string
 *                      description: the description of the product
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                      description: optional list of tags associated with the product
 *                  short_text:
 *                      type: string
 *                      description: the short description of the product
 *                  price_per_tickets:
 *                      type: string
 *                      description: the price per ticket for the product
 *                  total_tickets:
 *                      type: string
 *                      description: the total number of tickets available for the product
 *                  draw_date:
 *                      type: string
 *                      format: date-time
 *                      description: the draw date of the product
 *                  category:
 *                      type: number
 *                      description: the category of the product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: url
 *                      description: list of image URLs of the product
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post: 
 *          security:
 *              -   bearerAuth: []
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:  
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          responses:
 *              201:
 *                  description: created new Product
 * 
 */



router.post("/add", upload.none() ,new ProductController().addProduct);

// router.patch();

// router.delete();

// router.get();

// router.get();


export {
    router as AdminApiProductsRouter
}