import { Hono } from "hono";
import { cors } from "hono/cors";
import dishes from "./routes/dishes";
import docs from "./routes/docs";
import { rateLimit } from "./middleware/rateLimit";

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

app.get("/", (c) => {
  return c.json({
    status: "ok",
    name: "Filipino Food API",
    version: "1.1.0",
    author: "ryodgie",
    docs: "https://filipino-food-api.ryodgie.workers.dev/docs",
    repository: "https://github.com/eigdoyr/filipino-food-api",
    license: "MIT",
  });
});

app.route("/v1/dishes", dishes);
app.route("/docs", docs);

export default app;
