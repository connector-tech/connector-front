import axios from "axios";

export async function isViewed(userId, isLiked) {
  const { data } = await axios.post(
    "https://api.connector-app.net/social/viewed",
    {
      user_id: userId,
      is_liked: isLiked,
    },
    {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    },
  );
  return { data };
}
