import express, { json } from 'express';
import morgan from "morgan";
// import auth from "./middlewares/auth";
import dotenv from 'dotenv';
dotenv.config()
import cors from "cors";
import { connectDB } from './config/db.js';
import Course from './routes/course.js'
import Faculty from './routes/faculty.js';
import auth from './routes/auth.js';
import timeTable from './routes/timeTable.js'
import Booking from './routes/booking.js';
import student from './routes/UniStudent.js';
import StudentEnrollment from './routes/studentEnrollment.js';


// Creating an instance of express application
 const app=express();

//middlewares - Middlewares help us to send responses back in JSON format
app.use(express.json()); 
app.use(morgan("tiny"));
app.use(cors());
app.use("/api",Course);
app.use("/api",Faculty);
app.use("/api",auth);
app.use("/api",timeTable);
app.use("/api",Booking);
app.use("/api",student);
app.use("/api",StudentEnrollment);


//server configurations
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() =>{
    try{
        await connectDB(); 
        console.log(`Server is listening on port : ${PORT}`)
            // Enrollment.insertMany(enrollment);

    }catch(err){
        console.log(err);
    }
})

// Exporting the express application instance
export  default app;


