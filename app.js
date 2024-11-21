import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import signupRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/signup", signupRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/auth", authRoutes);
dbConnection();

app.use(errorMiddleware);

export default app;
