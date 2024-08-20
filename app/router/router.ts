import express from 'express';
import { HomeRoutes } from './api/index.js';
import { UserAuthRoutes } from './user/auth.js';
import redisClient from '../utils/init_redis/index.js';
import { DeveleperRoutes } from './developer.routes.js';
import { AdminRoutes } from './admin/admin.routes.js';


(async () => {
    await redisClient.set("key", "value")
    const value = await redisClient.get("key")
    console.log(value);
})();



const router = express.Router();

router.use("/user", UserAuthRoutes);
router.use("/admin", AdminRoutes)
router.use("/developer", DeveleperRoutes);
router.use("/", HomeRoutes);

export {
    router as AllRoutes,
}