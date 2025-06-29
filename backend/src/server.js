import express from "express";
import cors from 'cors'
import { initDB } from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config();

import transactionRouter from "./routes/transactionRoute.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import job from "./config/cron.js";

const PORT = process.env.PORT || 8000;

const app = express();

if(process.env.NODE_ENV === "production") job.start()

app.use(rateLimiter)
app.use(express.json())
app.use(cors())

app.use('/api/transactions', transactionRouter)

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  })
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening to port: ${PORT}`);
  });
});
