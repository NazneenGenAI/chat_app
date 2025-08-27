import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)


if (process.env.NODE_ENV !== 'production') {
    const port = PORT || 5001;
    app.listen(port, () => {
        console.log("Server is running on PORT:" + port);
        connectDB();
    });
} else {
    // For Vercel serverless
    connectDB();
}

export default app;


//RawHH9JfADoEZrt1