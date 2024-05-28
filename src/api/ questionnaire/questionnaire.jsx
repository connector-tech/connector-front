import axios from "axios";

export async function getQustionnaire() {
  const { data } = await axios.get(
    "https://api.connector-app.net/questionnaire/questions/",
  );
  return { data };
}

export async function postAnswer(questions) {
  const { data } = await axios.post(
    "https://api.connector-app.net/questionnaire/",
    questions,
    {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    },
  );
  return { data };
}
