// gateway/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SOA MIDTERM - API Gateway",
      version: "1.0.0",
      description: "Tổng hợp tất cả microservices API",
    },
    servers: [
      {
        url: "http://localhost:5000", // Gateway base URL
      },
    ],
  },
  // không import file route, mà gom các swagger.json từ từng service
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);
