import connectDB from "./config/db.js";
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

const app = express()
connectDB()


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use('/api/auth' , authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/user' , userRoutes)

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "OK" });
});


const port= process.env.PORT || 8001

app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`)
})