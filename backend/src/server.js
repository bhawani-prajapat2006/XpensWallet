import express from "express";
import cors from 'cors'
import { initDB } from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config();

import transactionRouter from "./routes/transactionRoute.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(rateLimiter)
app.use(express.json())
app.use(cors())

app.use('/api/transactions', transactionRouter)

app.get("/", (req, res) => {
  res.send("it's working correctly!");
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening to port: ${PORT}`);
  });
});
