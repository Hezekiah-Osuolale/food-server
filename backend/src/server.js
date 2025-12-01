import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';

import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import uploadRouter from './routers/upload.router.js';
import paystackRouter from './routers/paystack.router.js'; // Paystack route
import { dbconnect } from './config/database.config.js';

dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ✅ Allow requests from any URL
app.use(cors()); // allows all origins
app.use(express.json());

// API Routes
app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/paystack', paystackRouter); // Paystack payment verification

// ❌ Remove frontend serving (no public/index.html needed on Render)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
