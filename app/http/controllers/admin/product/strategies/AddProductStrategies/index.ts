import { NextFunction, Request, Response } from "express";
import { pool } from "../../../../../../utils/db";

class AddProductStrategies {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                title,
                describe,
                tags,
                short_text,
                price_per_tickets,
                total_tickets,
                draw_date,
                category,
                images
            } = req.body;

            // تبدیل فیلدهای رشته‌ای به عدد
            const pricePerTickets = parseFloat(price_per_tickets);
            const totalTickets = parseInt(total_tickets, 10);
            const categoryId = parseInt(category, 10);

            // تبدیل `tags` به آرایه اگر رشته باشد
            const tagsArray = typeof tags === 'string' ? tags.split(',') : tags;

            // افزودن محصول جدید به جدول products
            const newProductQuery = `
                INSERT INTO products 
                (title, describe, short_text, price_per_tickets, total_tickets, draw_date, category_id, tags)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id;
            `;

            const productResult = await pool.query(newProductQuery, [
                title,
                describe,
                short_text,
                pricePerTickets,
                totalTickets,
                draw_date,
                categoryId,
                tagsArray // ارسال آرایه تگ‌ها به PostgreSQL
            ]);

            const productId = productResult.rows[0].id;

            // افزودن تصاویر به جدول images
            if (images && images.length > 0) {
                const imagesQuery = `
                    INSERT INTO images (product_id, image_url)
                    VALUES ${images.map((_: any, i: number) => `(${productId}, $${i + 1})`).join(", ")}
                `;
                await pool.query(imagesQuery, images);
            }

            // پاسخ موفقیت‌آمیز به کلاینت
            return res.json({
                message: "Product added successfully",
                productId,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

export default AddProductStrategies;
