import app from "./app.js";

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🚀 Email Service running on port ${PORT}`);
  console.log(`📘 Swagger docs: http://localhost:${PORT}/api-docs`);
});
