import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transaction Service API",
      version: "1.0.0",
      description: "API documentation for the Transaction microservice",
    },
    servers: [
      {
        url: "http://localhost:5004/api",
        description: "Transaction Service (local)",
      },
    ],
  },
  apis: [path.join(__dirname, "./transaction.routes.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };

