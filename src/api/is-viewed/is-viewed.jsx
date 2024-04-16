import axios from "axios";

export async function isViewed(userId, isLiked) {
  const { data } = await axios.post(
    "https://core-46ur.onrender.com/social/viewed",
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
