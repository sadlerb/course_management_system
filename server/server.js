import express from "express";
import cors from "cors";
import "./loadEnvironment.js";

//Routes
import courses from "./routes/courses.js";


const PORT = process.env.PORT || 5050
const app = express();

app.use(cors());
app.use(express.json());

app.use("/course",courses)

app.listen(PORT,()=>{
    console.log(`Server is running or port ${PORT}`)
});