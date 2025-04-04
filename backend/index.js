// index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRouter.js";
import userMangementRouter from "./route/userManage.js";
import router from "./route/facultyRouter.js";
import analyticsRouter from "./route/analyticsRouter.js";
import progressRouter from "./route/progressRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ important for req.cookies.token

app.use('/api/auth', authRouter);
app.use('/api/admin', userMangementRouter); // Ensure this is defined after authRouter
app.use('/api/courses', router)
app.use("/api/analytics", analyticsRouter);
app.use('/api/progress', progressRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
