// gateway/swaggerMerge.js
import axios from "axios";
import SwaggerParser from "swagger-parser";

export async function mergeSwaggerDocs() {
  const services = [
    { name: "User Service", url: "http://localhost:5005/api/users/docs-json" },
    { name: "Auth Service", url: "http://localhost:5001/api/auth/docs-json" },
    { name: "OTP Service", url: "http://localhost:5002/api/otp/docs-json" },
    {
      name: "Transaction Service",
      url: "http://localhost:5003/api/transactions/docs-json",
    },
  ];

  try {
    const responses = await Promise.allSettled(
      services.map((s) => axios.get(s.url))
    );

    const validDocs = responses
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value.data);

    const merged = validDocs.reduce(
      (acc, doc) => {
        acc.paths = { ...acc.paths, ...doc.paths };
        acc.tags = [...new Set([...(acc.tags || []), ...(doc.tags || [])])];
        acc.components = {
          ...acc.components,
          ...(doc.components || {}),
        };
        return acc;
      },
      {
        openapi: "3.0.0",
        info: {
          title: "Gateway Combined API Docs",
          version: "1.0.0",
          description: "Tổng hợp Swagger từ tất cả các service",
        },
        servers: [{ url: "http://localhost:5000/api" }],
      }
    );

    await SwaggerParser.validate(merged);
    return merged;
  } catch (err) {
    console.error("❌ Lỗi khi merge Swagger:", err.message);
    throw err;
  }
}
