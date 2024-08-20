import { NextFunction, Request, Response } from "express";
import  httpErrors  from 'http-errors';
import { pool } from "../../../../../../utils/db";
import { createCategorySchema } from "../../../../../validators/admin/category.schema";


class CreateCategoryStrategy {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            
            await createCategorySchema.validateAsync(req.body);

            const { title, parentId } = req.body;

            console.log(title, parentId);
            
            
            console.log(parentId);
            

            if (!title) {
                return res.status(400).json({ message: "Title is required" });
            }

            const query = `
                INSERT INTO category (title, parent_id)
                VALUES ($1, $2)
                RETURNING *;
            `;

            const result = await pool.query(query, [title, Number(parentId) || null]);

            const newCategory = result.rows[0];

            if(!newCategory) throw httpErrors.InternalServerError("Server Error")

            return res.status(201).json({
                message: "دسته بندی با موفقیت افزوده شد",
                category: newCategory,
            });
        } catch (error) {
            console.error("Error creating category:", error);
            return next(new Error("Error creating category"));
        }
    }
}

export default CreateCategoryStrategy;
