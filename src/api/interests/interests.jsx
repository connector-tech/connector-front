import axios from "axios";

export async function getInterests() {
  const { data } = await axios.get("https://core-46ur.onrender.com/interests");
  return { data };
}
