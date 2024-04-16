import axios from "axios";

export async function getInterests() {
  const { data } = await axios.get("http://192.168.1.89:8000/interests");
  return { data };
}
