import axios from "axios";

export async function isViewed(userId, isLiked) {
  const { data } = await axios.post(
    "http://18.153.84.68/social/viewed",
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
