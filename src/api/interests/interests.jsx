import axios from "axios";

export async function getInterests() {
  const { data } = await axios.get("https://api.connector-app.net/interests");
  return { data };
}
