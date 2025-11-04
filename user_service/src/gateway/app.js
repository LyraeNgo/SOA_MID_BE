// gateway/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import swaggerUi from "swagger-ui-express";
import { mergeSwaggerDocs } from "./swaggerMerge.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === Proxy setup cho từng service ===
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:5005",
    changeOrigin: true,
  })
);
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
  })
);
app.use(
  "/api/otp",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
  })
);
app.use(
  "/api/transactions",
  createProxyMiddleware({
    target: "http://localhost:5004",
    changeOrigin: true,
  })
);

// === Swagger tổng hợp ===
app.get("/api-docs-json", async (req, res) => {
  try {
    const spec = await mergeSwaggerDocs();
    res.json(spec);
  } catch (err) {
    res.status(500).send("Không thể tải Swagger tổng hợp");
  }
});

app.use("/api-docs", async (req, res, next) => {
  try {
    const spec = await mergeSwaggerDocs();
    swaggerUi.setup(spec)(req, res, next);
  } catch (err) {
    res.status(500).send("Không thể tải Swagger tổng hợp");
  }
});

export default app;
