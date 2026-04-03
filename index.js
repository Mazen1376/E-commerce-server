import 'dotenv/config'
import express from 'express'
import { dbConnection } from './src/db/dbConnection.js';
import { userRoutes } from './src/Modules/userRoutes.js';
import { productRoutes } from './src/Modules/productRoutes.js';
import { cartRoutes } from './src/Modules/cartRoutes.js';
import { orderRoutes } from './src/Modules/orderRoutes.js';
import cors from 'cors';

const app = express()

// Serverless DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await dbConnection();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed! Ensure Vercel DB_URI is set properly." });
  }
});

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(productRoutes)
app.use(cartRoutes)
app.use(orderRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;