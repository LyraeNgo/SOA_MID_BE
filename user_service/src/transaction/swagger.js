import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Transaction Service API",
      version: "1.0.0",
      description:
        "API documentation for the Authentication microservice (Login, Token validation, etc.)",
    },
    servers: [
      {
        url: "http://localhost:5004/api/transaction",
        description: "Transaction Service (local)",
      },
    ],
  },
  apis: ["./transaction.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;






