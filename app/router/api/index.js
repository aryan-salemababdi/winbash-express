import  express  from 'express';
import homeController from '../../http/controllers/api/home.controller.js';

const router = express.Router();
router.get("/", homeController.indexPage);


export {
    router as HomeRoutes
}