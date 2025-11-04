import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
