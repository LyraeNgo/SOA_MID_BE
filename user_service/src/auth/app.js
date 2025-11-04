import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { swaggerSpec } from "./swagger.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
connectDB();