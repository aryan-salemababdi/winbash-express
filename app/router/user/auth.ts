import { Router } from "express";
import UserAuthController from "../../http/controllers/user/auth/auth.controller";


const router = Router();



router.post("/get-otp", new UserAuthController().getOtp);



router.post("/check-otp", new UserAuthController().checkOtp);


router.post("/refresh-token", new UserAuthController().refreshTokens)

export { router as UserAuthRoutes };
