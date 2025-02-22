import { getUserById } from "../db/user";
import { decodeAccessToken } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/auth/user", "/api/tweets"];

  const isHandledByThisMiddleware = endpoints.some(
    (endpoint) => getRequestURL(event).pathname == endpoint
  );

  if (!isHandledByThisMiddleware) return;

  const token = event.node.req.headers.authorization?.split(" ")[1];
  console.log(token);

  const decoded = decodeAccessToken(token!);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }

  try {
    const userId = decoded.userId;

    const user = await getUserById(userId);

    event.context.auth = { user };
  } catch (error) {
    return;
  }
});
