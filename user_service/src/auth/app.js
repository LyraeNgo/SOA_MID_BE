import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./auth.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import cors from "cors";


const app = express();
app.use(bodyParser.json());

app.use(express.json());

// cors



// Allow all origins (for dev)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Mount routes
app.use("/api/auth", authRoutes);

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
