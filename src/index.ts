import express from 'express';
import cors from "cors";
import { connectDb } from './db/databaseConneciton';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

connectDb();


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});