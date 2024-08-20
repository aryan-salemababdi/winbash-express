import { NextFunction, Request, Response } from "express";
import httpErrors from 'http-errors';
import { pool } from "../../../../../../utils/db";
import { updateCategorySchema } from "../../../../../validators/admin/category.schema";

class UpdateCategory {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {

            await updateCategorySchema.validateAsync(req.body);

            const { title, id } = req.body;

            if (!id) {
                throw httpErrors.BadRequest("ID is required");
            }

            const result = await pool.query(`
                UPDATE category
                SET title = $1
                WHERE id = $2
                RETURNING *;
            `, [title, Number(id)]);

            if (result.rowCount === 0) {
                throw httpErrors.NotFound("Category not found");
            }

            const updatedCategory = result.rows[0];

            console.log(`Category with ID ${id} updated:`, updatedCategory);

            return res.status(200).json({
                message: "Category updated successfully",
                category: updatedCategory,
            });
        } catch (error) {
            console.error("Error updating category:", error);
            return next(httpErrors.InternalServerError("Error updating category"));
        }
    }
}


export default UpdateCategory;