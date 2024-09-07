import { NextFunction, Request, Response } from "express";
import Controller from "../../controller";
import AddProductStrategies from './strategies/AddProductStrategies/index';



class ProductController extends Controller {
    private AddProductStrategies: AddProductStrategies;

    constructor() {
        super();
        this.AddProductStrategies = new AddProductStrategies();
    }

    async addProduct(req: Request, res: Response, next: NextFunction) {
        const result = await this.AddProductStrategies.execute(req, res, next);
        return result;
    }
}

export default ProductController;