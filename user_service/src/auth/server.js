import app from "./app.js";

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
  console.log(`✅ Auth service running on http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
