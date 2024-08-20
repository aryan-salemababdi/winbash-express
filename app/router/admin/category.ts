import express from "express";
import CategoryController from "../../http/controllers/admin/category/category.controller";


const router = express.Router();


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-panel]
 *          summary: create new category title
 *          parameters:
 *              - in: formData
 *                name: title
 *                type: string
 *                required: true
 *              - in: formData
 *                name: parentId
 *                type: string
 *                required: false
 *          responses:
 *              201:
 *                  description: success
 */



router.post("/add", new CategoryController().createCategory)


/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Amin-Panel]
 *          summagry: get All parents of Category or Category Heads
 *          responses:
 *              200:
 *                  description: success
 * 
 * 
 */

router.get("/parents", new CategoryController().getAllParents)


/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Amin-Panel]
 *          summagry: get All Categories
 *          responses:
 *              200:
 *                  description: success
 */

router.get("/all", new CategoryController().getAllCategories)

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Amin-Panel]
 *          summagry: remove category with id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: number
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

router.delete("/remove/:id", new CategoryController().removeCategory)

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Amin-Panel]
 *          summagry: get All parents of Category or Category Heads
 *          parameters: 
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 * 
 * 
 */

router.get("/children/:parent", new CategoryController().getChildOfParents)


export {
    router as categoryRoutes
}