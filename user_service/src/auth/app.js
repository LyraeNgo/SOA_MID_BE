import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./auth.routes.js"

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);

export default app;
