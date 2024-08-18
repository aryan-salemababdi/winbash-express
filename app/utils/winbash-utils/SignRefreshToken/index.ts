import JWT from 'jsonwebtoken';
import httpErrors from 'http-errors';
import { pool } from '../../db';
import { AccessToken } from "..";
import redisClient from '../../init_redis';

export class RefreshToken extends AccessToken {

    constructor(userId: number | string) {
        super(userId);
    }

    async findUserById(userId: string | number): Promise<any> {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
            return result.rows[0];
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
                mobile: user.phone_number,
                userID: this.userId
            };

            const refreshSecret = process.env.REFRESH_TOKEN_SCRET_KEY!;
            const options = {
                expiresIn: '1y'
            };
            return new Promise((resolve, reject) => {
                JWT.sign(payload, refreshSecret, options, async (err, token) => {
                    if (err) {
                        reject(httpErrors.InternalServerError('Server Error'));
                    } else {
                        const setResult = await redisClient.SETEX(String(this.userId), (365 * 24 * 60 * 60), token || "");
                        console.log(`Redis SETEX result for user ${this.userId}: ${setResult}`);
                        resolve(token);
                    }
                });
            });
        } catch (err) {
            if (err instanceof Error) throw new Error(err.message || 'Error generating token');
            else console.log(err);
        }
    }
}