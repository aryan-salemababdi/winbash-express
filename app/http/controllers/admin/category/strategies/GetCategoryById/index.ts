import { NextFunction, Request, Response } from "express";
import { pool } from "../../../../../../utils/db";

class GetCategoryByIdStrategy {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id)

            const categoryQuery = await pool.query(`
                SELECT id, title, parent_id
                FROM category
                WHERE id = $1
            `, [id]);

            if (categoryQuery.rowCount === 0) {
                throw new Error("Category not found");
            }

            const category = categoryQuery.rows[0];

            let parent = null;
            if (category.parent_id) {
                const parentQuery = await pool.query(`
                    SELECT id, title
                    FROM category
                    WHERE id = $1
                `, [category.parent_id]);

                parent = parentQuery.rows[0];
            }

            const childrenQuery = await pool.query(`
                SELECT id, title
                FROM category
                WHERE parent_id = $1
            `, [id]);

            const children = childrenQuery.rows;

            const fullCategory = {
                id: category.id,
                title: category.title,
                parent: parent,
                children: children,
            };

            console.log(`Category with ID ${id} fetched:`, fullCategory);
            return fullCategory;
        } catch (err) {
            next(err)
        }
    }
}

export default GetCategoryByIdStrategy;
