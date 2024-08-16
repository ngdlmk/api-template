import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });
import express, { Request, Response } from 'express';
import cors from 'cors';
//import admin from "firebase-admin";
//import mongoose from 'mongoose';
import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user-routes';
//import { uploadFileToAzure } from 'services/azure-storage-service';

const tokenKeyGenerator = (req: Request) => {
  // Extract the token from the request header
  const token = req.headers['authorization']?.split(' ')[1];
  return token || 'unknown-token'; // Use a default key if the token is missing
};

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minute
  max: 250,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: tokenKeyGenerator,
  handler: (req: Request, res: Response) => {
    res
      .status(429)
      .json({ message: 'Too many requests, please try again later.' });
  },
});

//const serviceAccount = require("../firebase.json");
// Create an instance of the express application
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(limiter);

setTimeout(() => {
  connectDB();
}, 3000);
// Define a port number
const PORT = process.env.PORT || 3001;
//routes go here
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.post('/test/user', (req: Request) => {
  console.log(req.body);
});

export async function connectDB() {
  try {
    console.log('TEST');
    //const MONGO_URI = process.env.MONGO_URI;
    //firebase settings
    /* admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.STORAGE_BUCKET,
    }); */
    //if (MONGO_URI) await mongoose.connect(MONGO_URI);
    return;
  } catch (error) {
    console.log(error);
  }
}
// Start the server and listen for incoming requests
app.listen(PORT, async () => {
  console.log(`Server is running on port 3001`);
});
