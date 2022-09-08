import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import plannerDataRoutes from "./routes/plannerDataRoutes.js";

import { notFound, errorHandler } from "./middlewares/error.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/plans", plannerDataRoutes);
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running ...");
  });
}
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTA0OWI5YmFkYTUzMzE3OWI5YWNmMyIsImlhdCI6MTY2MjAxMTgzNCwiZXhwIjoxNjY3MTk1ODM0fQ.3qkWsF3-LNjzXml1I3BmawAg7eQwfaGefiCx5omiLG4
