import express from "express";
import cors from "cors";
import "./loadEnvironment.js";

//Routes
import courses from "./routes/courses.js";
import departments from "./routes/departments.js"


const PORT = process.env.PORT || 5050
const app = express();

app.use(cors());
app.use(express.json());

app.use("/courses",courses);
app.use("/departments",departments)

app.listen(PORT,()=>{
    console.log(`Server is running or port ${PORT}`)
});