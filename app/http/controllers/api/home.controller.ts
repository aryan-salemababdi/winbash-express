import { NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import { getOtpSchema } from "../../validators/user/auth.schema";
import Controller from "../controller";


class HomeController extends Controller {
    async indexPage(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await getOtpSchema.validateAsync(req.body);
            return res.status(200).send("Index Page WinBash");
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(httpErrors.BadRequest(err.message));
            } else {
                next(httpErrors.BadRequest("Unknown error occurred"));
            }
        }
    }
}

export default new HomeController;
