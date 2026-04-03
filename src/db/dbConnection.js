import mongoose from "mongoose";
import 'dotenv/config';

let cachedConnection = null;

export const dbConnection = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }
  
  if (!process.env.DB_URI) {
    throw new Error("Missing DB_URI environment variable!");
  }

  try {
    const db = await mongoose.connect(process.env.DB_URI);
    cachedConnection = db;
    console.log("DB Connected successfully in Serverless environment.");
    return db;
  } catch (error) {
    console.error("DB Connection failed:", error);
    throw error;
  }
};