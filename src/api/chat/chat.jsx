import axios from "axios";

export async function getChats() {
  const { data } = await axios.get("https://api.connector-app.net/chats/", {
    headers: {
      token: sessionStorage.getItem("token"),
    },
  });
  return { data };
}

export async function getChatMessages(chatId) {
  console.log(chatId);
  const { data } = await axios.get(
    `https://api.connector-app.net/chats/${chatId}/messages/`,
    {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    },
  );
  return { data };
}

export async function createChat(receiver_id) {
  const { data } = await axios.post(
    "https://api.connector-app.net/chats/",
    {
      receiver_id,
    },
    {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    },
  );
  return { data };
}
