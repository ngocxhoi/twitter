import { createTweet } from "~/server/db/tweets";
import { promises as fs } from "fs";
import { join } from "path";
import { TweetData } from "~/server/types/interface";
import { createMediaFile } from "~/server/db/mediaFile";

export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.user?.id;
  const formData = await readMultipartFormData(event);

  const fileText = formData
    ?.find((field) => field.name === "text")
    ?.data.toString();
  const fileImage = formData?.find((field) => field.name === "image");
  const replyTo = formData
    ?.find((field) => field.name === "replyTo")
    ?.data.toString();

  let fileName = "";
  let filePath = "";

  try {
    if (fileImage && fileImage.filename && fileImage.data) {
      fileName = Date.now() + "_" + fileImage.filename; // Tên file gốc
      filePath = join("public/store", fileName); // Đường dẫn nơi lưu file
    } else {
      fileName = "";
      filePath = "";
    }

    const tweetData: Partial<TweetData> = {
      text: fileText ?? "",
      authorId: userId,
    };

    if (replyTo && replyTo !== "null" && replyTo !== "undefined") {
      tweetData.replyToId = replyTo;
    }

    const tweet = await createTweet(tweetData);

    if (!tweet) throw new Error("Can't create tweet");

    if (!fileImage?.data)
      return {
        tweet: tweet,
      };

    const mediaFile = await createMediaFile({
      url: "/store/" + fileName,
      tweetId: tweet.id,
      userId: userId,
    });

    if (!mediaFile)
      throw new Error("Has error while saving media file to system");

    // Lưu file vào hệ thống
    await fs.writeFile(filePath, fileImage.data);

    return {
      tweet: tweet,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
});
