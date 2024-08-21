import { prisma } from ".";
// import { TweetData } from "../types/interface"

export const createMediaFile = (mediaFile: any) => {
  return prisma.mediaFile.create({
    data: mediaFile,
  });
};
