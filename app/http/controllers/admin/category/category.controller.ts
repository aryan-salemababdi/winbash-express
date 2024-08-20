import { NextFunction, Request, Response } from "express";
import Controller from "../../controller";
import CreateCategoryStrategy from "./strategies/CreateCategory";
import UpdateCategoryStrategy from "./strategies/UpdateCategory";
import RemoveCategoryStrategy from "./strategies/RemoveCategory";
import GetAllParentsStrategy from "./strategies/GetAllParents";
import GetAllCategoryStrategy from "./strategies/GetAllCategory";
import GetCategoryByIdStrategy from "./strategies/GetCategoryById";
import GetChildOfParentsStrategy from "./strategies/GetChildOfParents";
import CheckExistCategoryStrategy from "./strategies/CheckExistCategory";

class CategoryController extends Controller {
    private createCategoryStrategy: CreateCategoryStrategy;
    private updateCategoryStrategy: UpdateCategoryStrategy;
    private removeCategoryStrategy: RemoveCategoryStrategy;
    private getAllParentsStrategy: GetAllParentsStrategy;
    private getAllCategoryStrategy: GetAllCategoryStrategy;
    private getCategoryByIdStrategy: GetCategoryByIdStrategy;
    private getChildOfParentsStrategy: GetChildOfParentsStrategy;
    private checkExistCategoryStrategy: CheckExistCategoryStrategy;

    constructor() {
        super();
        this.createCategoryStrategy = new CreateCategoryStrategy();
        this.updateCategoryStrategy = new UpdateCategoryStrategy();
        this.removeCategoryStrategy = new RemoveCategoryStrategy();
        this.getAllParentsStrategy = new GetAllParentsStrategy();
        this.getAllCategoryStrategy = new GetAllCategoryStrategy();
        this.getCategoryByIdStrategy = new GetCategoryByIdStrategy();
        this.getChildOfParentsStrategy = new GetChildOfParentsStrategy();
        this.checkExistCategoryStrategy = new CheckExistCategoryStrategy();
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.createCategoryStrategy.execute(req, res, next);
            return result;
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.updateCategoryStrategy.execute(req, res, next);
            return result;
        } catch (error) {
            console.error("Error updating category:", error);
            throw error;
        }
    }

    async removeCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.removeCategoryStrategy.execute(req, res, next);
            return result;
        } catch (error) {
            console.error("Error removing category:", error);
            throw error;
        }
    }

    async getAllParents(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.getAllParentsStrategy.execute(req, res, next);
            return result;
        } catch (error) {
            console.error("Error fetching all parents:", error);
            throw error;
        }
    }

    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.getAllCategoryStrategy.execute(req, res, next);
            return res.status(200).json({ data: result });
        } catch (error) {
            console.error("Error fetching all categories:", error);
            throw error;
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.getCategoryByIdStrategy.execute(req, res, next);
            return res.status(200).json({
                data: {
                    result
                }
            });
        } catch (error) {
            console.error("Error fetching category by id:", error);
            throw error;
        }
    }

    async getChildOfParents(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.getChildOfParentsStrategy.execute(req, res, next);
            return result;
        } catch (error) {
            console.error("Error fetching children of parent:", error);
            throw error;
        }
    }


    async checkExistCategory(id: number) {
        const result = await this.checkExistCategoryStrategy.execute(id);
        return result;
    }

};

export default CategoryController;
