import { NextFunction, Request, Response } from "express";
import httpErrors from 'http-errors';
import Controller from "../../controller";
import { pool } from "../../../../utils/db";
import { getOtpSchema, checkOtpSchema } from "../../../validators/user/auth.schema";
import FixedDigitRandomNumberGenerator from "../../../../utils/winbash-utils/RandomNumberGenerator";
import { constantValues } from "../../../../utils/winbash-utils/constant";
import { SignAccessToekn } from "../../../../utils/winbash-utils/SignAccessToken";
import { VerifyRefreshToken } from "../../../../utils/winbash-utils/VerifyRefreshToken";
import { RefreshToken } from "../../../../utils/winbash-utils/SignRefreshToken";

class UserAuthController extends Controller {
    async getOtp(req: Request, res: Response, next: NextFunction) {
        try {
            await getOtpSchema.validateAsync(req.body);
            const rng = new FixedDigitRandomNumberGenerator(5); // rng stands for randomNumberGenerator
            const { mobile } = req.body;
            const code = rng.generateRandomNumber();
            const result = await this.saveUser(mobile, code);
            if (!result) throw httpErrors.Unauthorized(`ورود شما انجام نشد!`);
            return res.status(200).send({
                data: {
                    statusCode: 200,
                    message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
                    code,
                    mobile
                }
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(err);
            } else {
                next(err)
            }
        }
    }

    async refreshTokens(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;

            console.log(refreshToken);






            const mobileQuery = `SELECT * FROM users WHERE phone_number = $1 LIMIT 1`;
            const mobile = await new VerifyRefreshToken().verifyRefreshToken(refreshToken);
            const mobileResult = await pool.query(mobileQuery, [mobile]);

            if (mobileResult.rowCount === 0) {
                console.log(mobile);
                throw httpErrors.NotFound('کاربری با این شماره موبایل پیدا نشد');
            }


            const user = mobileResult.rows[0];


            const accessToken = await new SignAccessToekn(user.id).signAccessToken();

            const newRefreshToken = await new RefreshToken(user.id).signAccessToken();

            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })

        } catch (err) {
            next(err)
        }
    }

    async checkOtp(req: Request, res: Response, next: NextFunction) {
        try {
            await checkOtpSchema.validateAsync(req.body);

            const { mobile, code } = req.body;

            const mobileQuery = `SELECT * FROM users WHERE phone_number = $1 LIMIT 1`;
            const mobileResult = await pool.query(mobileQuery, [mobile]);

            if (mobileResult.rowCount === 0) {
                throw httpErrors.NotFound('کاربری با این شماره موبایل پیدا نشد');
            }

            const user = mobileResult.rows[0];

            const storedOtp = user.otp?.code;
            const otpExpiry = user.otp?.expiresIn;

            if (!String(storedOtp) || !otpExpiry) {
                throw httpErrors.Unauthorized('کد اعتبارسنجی معتبر نیست');
            }
            if (String(storedOtp) !== code) {
                throw httpErrors.Unauthorized('کد اعتبارسنجی اشتباه است');
            }
            const currentTime = Date.now();
            if (otpExpiry < currentTime) {
                console.log(otpExpiry);
                console.log(currentTime);

                throw httpErrors.Unauthorized('کد اعتبارسنجی منقضی شده است');
            }

            const accessToken = await new SignAccessToekn(user.id).signAccessToken();

            const refreshToken = await new RefreshToken(user.id).signAccessToken();

            return res.status(200).json({
                statusCode: 200,
                message: "کد اعتبارسنجی صحیح است",
                user,
                date: {
                    accessToken,
                    refreshToken
                }
            });

        } catch (err) {
            if (err instanceof Error) {
                next(httpErrors.BadRequest(err.message));
            } else {
                next(err);
            }
        }
    }

    async saveUser(mobile: string, code: number): Promise<boolean> {
        try {
            const userExists = await this.checkExisUser(mobile);

            if (userExists) {
                const updateResult = await this.updateUser(mobile, {
                    otp: {
                        code,
                        expiresIn: constantValues[0],
                    }

                });
                return updateResult > 0;
            } else {
                const query = `INSERT INTO users (phone_number, otp, role) VALUES ($1, $2, $3)`;
                const values = [
                    mobile,
                    JSON.stringify({
                        code,
                        expiresIn: constantValues[0],
                    }),
                    JSON.stringify({ role: constantValues[1] })
                ];

                const insertResult = await pool.query(query, values);
                const rowCount = insertResult.rowCount ?? 0;
                return rowCount > 0;
            }
        } catch (error) {
            console.error('Error saving user:', error);
            return false;
        }
    }

    async checkExisUser(mobile: string): Promise<boolean> {
        try {
            const result = await pool.query('SELECT 1 FROM users WHERE phone_number = $1 LIMIT 1', [mobile]);
            const rowCount = result.rowCount ?? 0;
            return rowCount > 0;
        } catch (error) {
            console.error('Error checking user existence:', error);
            return false;
        }
    }

    async updateUser(mobile: string, objectData: Record<string, any> = {}): Promise<number> {
        try {
            Object.keys(objectData).forEach(key => {
                if ([null, undefined, '', 0, '0', NaN].includes(objectData[key])) delete objectData[key];
            });

            const setClause = Object.keys(objectData)
                .map((key, index) => `"${key}" = $${index + 1}`)
                .join(', ');

            if (!setClause) {
                console.log('No valid fields to update');
                return 0;
            }

            const query = `UPDATE users SET ${setClause} WHERE phone_number = $${Object.keys(objectData).length + 1}`;
            const values = [...Object.values(objectData), mobile];
            const result = await pool.query(query, values);
            return result.rowCount ?? 0;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
}

export default UserAuthController;