import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Email Service API",
      version: "1.0.0",
      description: "API documentation for the Email microservice - Gửi OTP qua email cho xác thực giao dịch",
    },
    servers: [
      {
        url: "http://localhost:5002/api",
        description: "Email Service (local)",
      },
    ],
  },
  apis: [path.join(__dirname, "./email.routes.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
