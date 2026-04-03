import mongoose from "mongoose";
import 'dotenv/config';

export const dbConnection = mongoose.connect(process.env.DB_URI)
.then(()=>{console.log("DB Connected")})
.catch((error)=>{console.log(error)})