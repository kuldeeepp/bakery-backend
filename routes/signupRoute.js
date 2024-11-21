// routes/signup.js
import express from "express";
import { sendUser  } from "../controller/signupController.js";

const router = express.Router();
router.post("/send", sendUser);


export default router;