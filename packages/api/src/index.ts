import { Hono } from "hono";
import dishes from "./routes/dishes";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ status: "ok", message: "Filipino Food API" });
});

app.route("/dishes", dishes);

export default app;
