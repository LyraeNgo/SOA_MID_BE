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
      url: "http://localhost:5004/api/transactions/docs-json",
    },
  ];

  const responses = await Promise.allSettled(
    services.map(async (s) => {
      try {
        const res = await axios.get(s.url);
        console.log(`✅ Loaded ${s.name}`);
        return res.data;
      } catch (err) {
        console.warn(`⚠️  ${s.name} unreachable: ${err.message}`);
        return null;
      }
    })
  );

  const validDocs = responses
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter(Boolean);

  const merged = validDocs.reduce(
    (acc, doc) => {
      acc.paths = { ...acc.paths, ...doc.paths };
      acc.tags = [...new Set([...(acc.tags || []), ...(doc.tags || [])])];
      acc.components = { ...acc.components, ...(doc.components || {}) };
      return acc;
    },
    {
      openapi: "3.0.0",
      info: {
        title: "Gateway Combined API Docs",
        version: "1.0.0",
        description: "Combined Swagger documentation for all microservices",
      },
      servers: [{ url: "http://localhost:5000/api" }],
      paths: {},
      tags: [],
      components: {},
    }
  );

  await SwaggerParser.validate(merged);
  return merged;
}
