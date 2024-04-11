import axios from "axios";

export async function getUsers(size) {
  const { data } = await axios.get("http://18.153.84.68/users", {
    headers: {
      token: sessionStorage.getItem("token"),
    },
  });
  return { data };
}
