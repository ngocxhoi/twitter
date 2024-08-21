import { getRefreshTokenByToken } from "~/server/db/refreshToken";
import { getUserById } from "~/server/db/user";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refresh_token");

  // const refreshToken = cookies.refresh_token

  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  const token = decodeRefreshToken(refreshToken);

  try {
    const user = await getUserById(token!.userId);

    if (!user)
      throw {
        message: "User not found",
      };

    const { accessToken } = generateTokens(user);

    return { access_token: accessToken };
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
