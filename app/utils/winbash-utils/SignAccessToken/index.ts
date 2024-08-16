import JWT from "jsonwebtoken"
import httpErrors from 'http-errors';
import { AccessToken } from "..";
import { pool } from "../../db";


export class SignAccessToekn extends AccessToken {

    constructor(userId: number | string) {
        super(userId);
    }

    private async findUserById(userId: string | number): Promise<any> {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
            return result.rows[0]; // اولین نتیجه را برمی‌گرداند
        } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Database error');
        }
    }

    async signAccessToken(): Promise<string | undefined> {
        try {
            const user = await this.findUserById(this.userId);
            if (!user) {
                throw new Error('User not found');
            }
            const payload = {
                mobile: user.mobile,
                userID: this.userId
            };

            const secret = process.env.SECRET_KEY!;
            const options = {
                expiresIn: '1h'
            };

            return new Promise((resolve, reject) => {
                JWT.sign(payload, secret, options, (err, token) => {
                    if (err) {
                        reject(httpErrors.InternalServerError('Server Error'));
                    } else {
                        resolve(token);
                    }
                });
            });
        } catch (err) {
            if (err instanceof Error) throw new Error(err.message || 'Error generating token');
            else console.log(err);
        }
    }
};