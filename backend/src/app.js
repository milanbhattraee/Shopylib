import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import addressRouter from './routes/userAddress.routes.js';
import vendorRouter from './routes/vendor.routes.js'
import { errorHandler } from './middlewares/error.middleware.js';




const app = express();

// Middleware for CORS
app.use(cors({
    origin: process.env.CORS || 'http://localhost:3000', 
    credentials: true,
}));

// Middleware for parsing cookies and JSON bodies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


// Serve static files
app.use(express.static('public'));



// Register routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/user-address', addressRouter);
app.use('api/v1/vendors',vendorRouter)

app.use(errorHandler);






export { app };
