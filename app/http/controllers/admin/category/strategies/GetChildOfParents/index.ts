import { NextFunction, Request, Response } from "express";
import { pool } from "../../../../../../utils/db";

class GetChildOfParentsStrategy {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {

            const parentId = Number(req.params.parent);
            

            if (isNaN(parentId)) {
                return res.sendStatus(400);
            }
            const result = await pool.query(`
                SELECT * FROM category
                WHERE id = $1
            `, [parentId]);

            const children = result.rows;
            

            console.log(`Children of parent with ID ${parentId} fetched:`, children);

            return res.status(200).json({
                data: {
                    statusCode: 200,
                    children
                }
            });
        } catch (error) {
            console.error("Error fetching child categories:", error);
            return next(new Error("Error fetching child categories"));
        }
    }
}


export default GetChildOfParentsStrategy;