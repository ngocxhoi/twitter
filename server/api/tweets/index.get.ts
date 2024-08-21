import { getTweets } from "~~/server/db/tweets";
// import { tweetTransformer } from "~~/server/transformers/tweet"

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as any;

  let prismaQuery: any = {
    where: {
      ...query,
      replyTo: null,
    },
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true,
        },
      },
      replyTo: {
        include: {
          author: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };

  const tweets = await getTweets(prismaQuery);

  return {
    tweets: tweets,
  };
});
