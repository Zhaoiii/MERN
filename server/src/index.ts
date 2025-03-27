import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
