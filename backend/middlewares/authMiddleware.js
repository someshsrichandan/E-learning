import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

console.log(process.env.JWT_SECRET); // Check if the JWT_SECRET is loaded correctly

export const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized " });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};