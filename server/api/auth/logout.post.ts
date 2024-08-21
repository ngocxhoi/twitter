import { removeRefreshToken } from "~/server/db/refreshToken";
import { sendRefreshToken } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refresh_token");
    if (!refreshToken)
      throw {
        message: "You must provide a refresh token",
      };
    sendRefreshToken(event, "");
    await removeRefreshToken(refreshToken);

    return {
      Logout: "Done",
    };
  } catch (error: any) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: error.message || "Something went wrong",
      })
    );
  }
});
