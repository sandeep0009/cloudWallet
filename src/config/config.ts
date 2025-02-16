import dotenv from "dotenv";

dotenv.config();

export const DB_URI=process.env.DB_URL || "mongodb://localhost:27017/coinbase";
export const PORT=process.env.PORT || 3000;
export const JWT_SECRET=process.env.JWT_SECRET || "random123";