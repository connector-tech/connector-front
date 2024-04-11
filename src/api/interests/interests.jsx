import axios from "axios";

export async function getInterests() {
  const { data } = await axios.get("http://18.153.84.68/interests");
  return { data };
}
