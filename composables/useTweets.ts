import useAuthToken from "./useAuth";

export default () => {
  const usePostTweetModal = () => useState("post_tweet_modal", () => false);
  const useReplyTweet = () => useState("reply_tweet", () => null);

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = false;
  };

  const setReplyTo = (tweet: any) => {
    const replyTweet = useReplyTweet();
    replyTweet.value = tweet;
  };

  const openPostTweetModal = (tweet = null) => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = true;

    setReplyTo(tweet);
  };

  const postTweet = async (formData: any, token: string | unknown) => {
    let { data } = await useFetch("/api/tweets", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.value;
  };

  const getTweets = (token: string, params = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetch("/api/tweets", {
          method: "GET",
          query: params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        resolve(data.value);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getTweetById = (tweetId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetch(`/api/tweets/${tweetId}`);

        resolve(data.value);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    postTweet,
    getTweets,
    getTweetById,
    closePostTweetModal,
    usePostTweetModal,
    openPostTweetModal,
    useReplyTweet,
  };
};
