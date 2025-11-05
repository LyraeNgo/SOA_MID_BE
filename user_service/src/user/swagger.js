import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "API cho service người dùng",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Auth Service (local)",
      },
      {
        url: "http://localhost:5005",
        description: "User Service (local)",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(__dirname, "./user.routes.js")],
};

export const swaggerSpec = swaggerJSDoc(options);
