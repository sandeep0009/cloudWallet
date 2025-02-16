import express from 'express';
import cors from "cors";
import { connectDb } from './db/databaseConneciton';
import userRouter from "./api/user/routerController";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(userRouter);

connectDb();


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});