import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OTP Service API",
      version: "1.0.0",
      description: "API documentation for the OTP microservice",
    },
    servers: [
      {
        url: "http://localhost:5003/api",
        description: "OTP Service (local)",
      },
    ],
  },
  apis: [path.join(__dirname, "./otp.routes.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
