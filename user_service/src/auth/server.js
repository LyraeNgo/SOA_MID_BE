import app from "./app.js";
import { config } from "./config/env.js";

app.listen(config.port, () => {
  console.log(`✅ Auth service running on port ${config.port}`);
});
