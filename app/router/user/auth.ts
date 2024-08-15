import { Router } from "express";
import UserAuthController from "../../http/controllers/user/auth/auth.controller";

const router = Router();

router.post("/login", new UserAuthController().login)

export { router as UserAuthRoutes };
