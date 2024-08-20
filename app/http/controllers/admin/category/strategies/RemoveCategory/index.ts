import { NextFunction, Request, Response } from "express";
import CheckExistCategoryStrategy from "../CheckExistCategory";
import { pool } from "../../../../../../utils/db";
import httpErrors from 'http-errors';

class RemoveCategoryStrategy {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {

            const id  = Number(req.params.id);
            

            const categoryExists = await new CheckExistCategoryStrategy().execute(id);
            

            const deleteResult = await pool.query(`
                DELETE FROM category WHERE id = $1
            `, [categoryExists]);
            

            if (deleteResult.rowCount === 0) throw httpErrors.InternalServerError("حذف دسته بندی انجام نشد")

            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "حذف دسته بندی با موفقیت انجام شد"
                }
            })

        } catch (error) {
            throw next(error);
        }
    }
}


export default RemoveCategoryStrategy;