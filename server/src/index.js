import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connection successful.");

    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);

    process.exit(1);
  }
};

// Catches runtime errors that escape all try...catch blocks.
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Catches Promises that are rejected but do not have .catch() to handle the error.
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

startServer();
