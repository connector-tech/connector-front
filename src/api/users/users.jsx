import axios from "axios";

export async function getUsers() {
  const { data } = await axios.get("https://core-46ur.onrender.com/users", {
    headers: {
      token: sessionStorage.getItem("token"),
    },
  });
  return { data };
}
