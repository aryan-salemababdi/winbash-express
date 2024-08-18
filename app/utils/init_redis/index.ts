import redisDB from "redis";

const redisClient = redisDB.createClient({
    url: "redis://localhost:6363"
});

redisClient.connect();

redisClient.on("connect", () => console.log("connect to Redis"));

redisClient.on("ready", () => console.log("connected to Redis and ready to use ..."));

redisClient.on("error", (err) => console.log("RedisError", err.message));

redisClient.on("end", () => console.log("disconnected from Redis ..."));

export default redisClient;