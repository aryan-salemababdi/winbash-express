import { NextFunction, Request, Response } from "express";
import { pool } from "../../../../../../utils/db";

class GetAllParentsStrategy {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await pool.query(`
                SELECT * FROM category
                WHERE parent_id IS NOT NULL
            `);
            const parents = result.rows;

            console.log("All parent categories fetched:", parents);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    parents
                }
            })
        } catch (error) {
            console.error("Error fetching parent categories:", error);
            throw new Error("Error fetching parent categories");
        }
    }
}

export default GetAllParentsStrategy;
