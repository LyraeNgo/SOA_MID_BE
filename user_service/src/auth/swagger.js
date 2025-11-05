import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Auth Service API",
      version: "1.0.0",
      description:
        "API documentation for the Authentication microservice (Login, Token validation, etc.)",
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
  },
  apis: ["./auth.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
