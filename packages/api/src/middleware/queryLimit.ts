import { Context, Next } from "hono";

const MAX_QUERY_LENGTH = 256;

export async function queryLimit(c: Context, next: Next) {
  const queryString = c.req.url.split("?")[1] ?? "";

  if (queryString.length > MAX_QUERY_LENGTH) {
    return c.json(
      {
        error: {
          message:
            "Query string exceeds maximum allowed length of 256 characters",
          code: "QUERY_TOO_LONG",
          status: 400,
        },
      },
      400,
    );
  }

  await next();
}
