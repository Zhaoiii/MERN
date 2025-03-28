import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connectDB } from "./config/db";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// test router
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Routes
app.use("/api", routes);

// Connect to MongoDB
connectDB().then(() => {
  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
