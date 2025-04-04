// index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRouter.js";
import userMangementRouter from "./route/userManage.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ important for req.cookies.token

app.use('/api/auth', authRouter);
app.use('/api/admin', userMangementRouter); // Ensure this is defined after authRouter

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
