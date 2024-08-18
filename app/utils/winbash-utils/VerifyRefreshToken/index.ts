import httpErrors from 'http-errors';
import JWT from 'jsonwebtoken';
import { pool } from '../../../utils/db';
import redisClient from '../../init_redis';

export class VerifyRefreshToken {

    verifyRefreshToken(token: string) {

        const refreshSecret = process.env.REFRESH_TOKEN_SCRET_KEY!;

        return new Promise((resolve, reject) => {
            JWT.verify(token, refreshSecret, async (err, payload) => {
                if (err) {
                    console.log("Token Verification Error:", err);
                    return reject(httpErrors.Unauthorized("مجدد وارد حساب کاربری خود شوید"));
                }

                console.log("JWT payload:", payload);

                const { mobile }: any = payload || {};

                if (!mobile) {
                    console.log("Mobile number is missing in the token.");
                    return reject(httpErrors.Unauthorized("شماره موبایل در توکن یافت نشد"));
                }

                console.log("Extracted mobile from token:", mobile);  // لاگ mobile

                try {
                    const mobileQuery = `SELECT * FROM users WHERE phone_number = $1 LIMIT 1`;
                    const mobileResult = await pool.query(mobileQuery, [mobile]);

                    console.log("Database query result:", mobileResult.rows);  // لاگ نتیجه کوئری

                    if (mobileResult.rowCount === 0) {
                        return reject(httpErrors.NotFound('کاربری با این شماره موبایل پیدا نشد'));
                    }

                    const user = mobileResult.rows[0];
                    if (!user) {
                        console.log("User not found in database.");
                        return reject(httpErrors.Unauthorized("حساب کاربری یافت نشد"));
                    }
                    const refreshToken = await redisClient.get(String(user.id));
                    console.log(`Refresh token from Redis for user ${user.id}: ${refreshToken}`);
                    console.log(`Incoming token: ${token}`);  // توکن ورودی
                    
                    if (refreshToken === token) {
                        console.log("Tokens match!");
                        return resolve(mobile);
                    } else {
                        console.log("Tokens do not match.");
                        return reject(httpErrors.Unauthorized("ورود مجدد به حساب کاربری انجام نشد ..."));
                    }
                } catch (error) {
                    reject(httpErrors.InternalServerError("خطای سرور"));
                }
            });
        })

    }
}
