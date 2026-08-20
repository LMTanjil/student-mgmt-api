import express from 'express';
import dotenv from 'dotenv';
import authRoute from "./routes/auth.route.js";
import {dbConnect} from "./configs/db.js";
import studentRoute from "./routes/student.route.js";
dotenv.config();


const app = express();
app.use(express.json());

dbConnect()

// router here
app.use("api/auth", authRoute);
app.use("/api/v1/students", studentRoute);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${ port }`);
})