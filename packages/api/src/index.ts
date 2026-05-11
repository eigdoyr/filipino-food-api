import { Hono } from "hono";
import dishes from "./routes/dishes";
import docs from "./routes/docs";
import { rateLimit } from "./middleware/rateLimit";

const app = new Hono();

app.use("*", rateLimit);

app.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "Filipino Food API",
    version: "0.2.0",
    author: "ryodgie",
    repository: "https://github.com/eigdoyr/filipino-food-api",
    license: "MIT",
  });
});

app.route("/dishes", dishes);
app.route("/docs", docs);

export default app;
