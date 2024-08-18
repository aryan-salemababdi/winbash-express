import express, { NextFunction, Request, Response } from 'express';
import bcrypt from "bcrypt";
import FixedDigitRandomNumberGenerator from '../utils/winbash-utils/RandomNumberGenerator';

const router = express.Router();


/**
 * @swagger
 *  tags:
 *      name : Developer-Routes
 *      description : developer utils
 */


/**
 * @swagger
 * /developer/hash-password/{password}:
 *   get:
 *     summary: Hashes the provided password
 *     tags: [Developer]
 *     parameters:
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: Password to hash
 *     responses:
 *       200:
 *         description: The hashed password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hashedPassword:
 *                   type: string
 *                   description: The hashed password
 *       400:
 *         description: Bad request
 */


router.get("/hash-password/:password", (req: Request, res: Response, next: NextFunction) => {

    const password: string = req.params.password;

    const salt = bcrypt.genSaltSync(10);

    return res.send((bcrypt.hashSync(password, salt)));
})



/**
 * @swagger
 * /developer/generate-number/{digits}:
 *   get:
 *     summary: Generate a random number with specified number of digits
 *     tags: [Developer]
 *     parameters:
 *       - in: path
 *         name: digits
 *         schema:
 *           type: integer
 *           example: 4
 *         required: true
 *         description: The number of digits for the random number
 *     responses:
 *       200:
 *         description: Success, returns the generated random number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 randomNumber:
 *                   type: integer
 *                   example: 1234
 *       400:
 *         description: Bad request, invalid number of digits
 */



router.get("/generate-number/:digits", (req: Request, res: Response, next: NextFunction) => {
    const digits = parseInt(req.params.digits);

    if (isNaN(digits) || digits <= 0) {
        return res.status(400).send({ error: "Invalid number of digits" });
    }

    const generator = new FixedDigitRandomNumberGenerator(digits);
    const randomNumber = generator.generateRandomNumber();

    return res.send({ randomNumber });
});



export {
    router as DeveleperRoutes
}