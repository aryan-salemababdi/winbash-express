import express from 'express';
import homeController from '../../http/controllers/api/home.controller.js';
import { VerifyAccessToken } from '../../http/middlewares/VerifyAccessToken/index.js';

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description : index page route and dat
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes 
 *      tags: [IndexPage]
 *      description : get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *              schema: 
 *                  type: string
 *                  example : Index Page Store
 *          404: 
 *              description: not Found
 */


const router = express.Router();
router.get("/",new VerifyAccessToken().verifyAccessToken ,homeController.indexPage);


export {
    router as HomeRoutes
}