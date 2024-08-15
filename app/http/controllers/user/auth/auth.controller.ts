import { NextFunction, Request, Response } from "express";
import authSchema from "../../../validators/user/auth.schema";
import httpErrors from 'http-errors';


class UserAuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await authSchema.validateAsync(req.body);
            return res.status(200).send("ورود شما با موفقیت انجام شد");
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(httpErrors.BadRequest(err.message));
            } else {
                next(httpErrors.BadRequest("Unknown error occurred"));
            }
        }
    }
}

export default UserAuthController;