import { Hono } from "hono";
import { cors } from "hono/cors";
import dishes from "./routes/dishes";
import docs from "./routes/docs";
import { rateLimit } from "./middleware/rateLimit";
import { securityHeaders } from "./middleware/securityHeaders";
import { queryLimit } from "./middleware/queryLimit";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET"],
    allowHeaders: ["Content-Type"],
  }),
);

app.use("*", rateLimit);
app.use("*", securityHeaders);
app.use("*", queryLimit);

app.get("/", (c) => {
  return c.json({
    status: "ok",
    name: "Filipino Food API",
    version: "1.3.0",
    author: "ryodgie",
    docs: "https://filipino-food-api.ryodgie.workers.dev/docs",
    repository: "https://github.com/eigdoyr/filipino-food-api",
    license: "MIT",
  });
});

app.route("/v1/dishes", dishes);
app.route("/docs", docs);

export default app;
