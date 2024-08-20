import { pool } from "../../../../../../utils/db";
import httpErrors from 'http-errors';

class CheckExistCategoryStrategy {
    async execute(id: number): Promise<any> {
        try {
            const query = await pool.query(`
                SELECT id FROM category WHERE id = $1
            `, [id]);

            console.log(id);
            

            const category:any = query.rows[0];

            if (!category) throw httpErrors.NotFound("دسته بندی یافت نشد")

            return category.id;

        } catch (error) {
            console.error("Error checking category existence:", error);
            throw new Error("Error checking category existence");
        }
    }
}

export default CheckExistCategoryStrategy;
