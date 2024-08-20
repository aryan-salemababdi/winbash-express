import { NextFunction, Request, Response } from "express";
import { pool } from "../../../../../../utils/db";

class GetAllCategoryStrategy {
    async execute(req:Request, res:Response, next:NextFunction) {
        try {
            const result = await pool.query(`
                SELECT * FROM category
                WHERE parent_id IS NULL
                `);

            const category = result.rows;

            console.log("All categories fetched:", category);

            return category
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error("Error fetching categories");
        }
    }
}

export default GetAllCategoryStrategy;
