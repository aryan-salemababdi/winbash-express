import { Router } from "express";
import UserAuthController from "../../http/controllers/user/auth/auth.controller";


/**
 * @swagger
 * tags:
 *  name: AuthPage
 *  description : get-otp Page route
 */



/**
 * @swagger
 *   /user/get-otp:
 *     post:
 *       tags: [AuthPage]
 *       summary: get-otp user in userpanel with phone number
 *       description: one time password(otp) get-otp
 *       consumes:
 *         - application/x-www-form-urlencoded
 *       parameters:
 *         - name: mobile
 *           description: fa-IRI phone number
 *           in: formData
 *           required: true
 *           type: string
 *       responses:
 *         201:
 *           description: Success
 *         400:
 *           description: Bad Request
 *         401:
 *           description: Unauthorized
 *         500:
 *           description: Internal Server Error
 */






const router = Router();

router.post("/get-otp", new UserAuthController().getOtp);
/**
 * @swagger
 * /user/check-otp:
 *   post:
 *     tags:
 *       - UserAuth
 *     summary: Check OTP value in user controller
 *     description: Check OTP with code, mobile number, and expiration date
 *     parameters:
 *       - name: mobile
 *         in: formData
 *         description: Iranian phone number (fa-IRI)
 *         required: true
 *         type: string
 *       - name: code
 *         in: formData
 *         description: Enter the SMS code received
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OTP validated successfully
 *       400:
 *         description: Invalid OTP or mobile number
 *       401:
 *         description: Unauthorized
 * 
 *       500:
 *         description: Internal Server Error
 */
router.post("/check-otp", new UserAuthController().checkOtp);


export { router as UserAuthRoutes };
