import { createRefreshToken } from "~/server/db/refreshToken";
import { createUser } from "~/server/db/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password, passwordConfirm, name } = body;

  if (!username || !email || !password || !passwordConfirm || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  if (password !== passwordConfirm) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Passwords do not match" })
    );
  }

  const imageId = Math.floor(Math.random() * 99) + 1;

  const userData = {
    username,
    email,
    password,
    name,
    profileImage: `https://picsum.photos/id/${imageId}/200/200`,
  };

  const user = await createUser(userData);

  const { accessToken, refreshToken } = generateTokens(user);

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: user,
  };
});
