// gateway/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import swaggerUi from "swagger-ui-express";
import { mergeSwaggerDocs } from "./swagger_merge.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`📥 Gateway received: ${req.method} ${req.url}`);
  next();
});

// === Proxy setup for each service ===
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:5005",
    changeOrigin: true,
    pathRewrite: { "^/api/users": "/api/users" },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔄 Proxying to users: ${proxyReq.method} ${proxyReq.path}`);
    },
    onError: (err, req, res) => {
      console.error("❌ Users proxy error:", err.message);
    },
  })
);

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "/api/auth" },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔄 Proxying to auth: ${proxyReq.method} ${proxyReq.path}`);
    },
    onError: (err, req, res) => {
      console.error("❌ Auth proxy error:", err.message);
    },
  })
);

app.use(
  "/api/otp",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    pathRewrite: { "^/api/otp": "/api/otp" },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`🔄 Proxying to otp: ${proxyReq.method} ${proxyReq.path}`);
    },
    onError: (err, req, res) => {
      console.error("❌ OTP proxy error:", err.message);
    },
  })
);

app.use(
  "/api/transaction",
  createProxyMiddleware({
    target: "http://localhost:5004",
    changeOrigin: true,
    pathRewrite: { "^/api/transaction": "/api/transaction" },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `🔄 Proxying to transactions: ${proxyReq.method} ${proxyReq.path}`
      );
    },
    onError: (err, req, res) => {
      console.error("❌ Transactions proxy error:", err.message);
    },
  })
);

// === Swagger merge and docs ===
app.get("/api-docs-json", async (req, res) => {
  try {
    const spec = await mergeSwaggerDocs();
    res.json(spec);
  } catch (err) {
    console.error("❌ Lỗi merge Swagger:", err.message);
    res.status(500).send("Không thể tải Swagger tổng hợp");
  }
});

app.use("/api-docs", async (req, res, next) => {
  try {
    const spec = await mergeSwaggerDocs();
    return swaggerUi.serve(req, res, () => {
      swaggerUi.setup(spec)(req, res, next);
    });
  } catch (err) {
    console.error("❌ Swagger UI setup error:", err.message);
    res.status(500).send("Không thể tải Swagger tổng hợp");
  }
});

export default app;
