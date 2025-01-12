import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRouter from "./routes/admin.route.js";
import patientRouter from "./routes/patient.route.js";
import pantryRouter from "./routes/pantryStaff.route.js";
import riderRouter from "./routes/rider.route.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = isProduction
  ? ["https://hospital-food-management-tau.vercel.app"]
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/pantry", pantryRouter);
app.use("/api/v1/rider", riderRouter);

export default app;
