import { NextFunction, Request, Response } from 'express';
import httpErrors from 'http-errors';
import JWT from 'jsonwebtoken';
import { pool } from '../../../utils/db';

export class VerifyAccessToken {

    verifyAccessToken(req: Request, res: Response, next: NextFunction) {
        const secret = process.env.SECRET_KEY;
        const headers = req.headers;

        console.log('Headers:', headers);


        if (typeof headers?.["access-token"] === 'string') {
            const [bearer, token] = headers["access-token"].split(" ") || [];
            if (bearer?.toLowerCase() === 'bearer' && token) {
                console.log("Token:", token);


                JWT.verify(token, secret!, async (err, payload) => {
                    if (err) {
                        console.log("Token Verification Error:", err);
                        return next(httpErrors.Unauthorized("مجدد وارد حساب کاربری خود شوید"));
                    }

                    const { userID }: any = payload || {};
                    console.log("Payload:", payload);


                    try {
                        const userQuery = `
                            SELECT id, phone_number, first_name, last_name, email, role, created_at, updated_at 
                            FROM users 
                            WHERE id = $1
                        `;
                        const userResult = await pool.query(userQuery, [userID]);
                        console.log("User Result:", userResult.rows);

                        const user = userResult.rows[0];
                        if (!user) return next(httpErrors.Unauthorized("حساب کاربری یافت نشد"));

                        (req as any).user = user;
                        return next();
                    } catch (queryError) {
                        console.error("Database Query Error:", queryError);
                        return next(httpErrors.InternalServerError("خطا در پایگاه داده"));
                    }
                });
            } else {
                return res.status(400).json({ message: "Invalid token format!" });
            }
        } else {
            return res.status(401).json({ message: "توکن مورد نظر یافت نشد" });
        }
    }
}
