import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { createChat, getChatMessages, getChats } from "./chat";
import { getInterests } from "../interests/interests";

export function useCreateChat() {
  const { mutate, isSuccess, data } = useMutation(
    ["createChat"],
    ({ receiver_id }) => createChat(receiver_id),
    {
      onSuccess: (data) => {
        return data;
      },
    },
  );

  return { mutate, isSuccess, data };
}

export function useChats() {
  const data = useQuery(["getChats"], getChats, {
    onError: (error) => {
      alert(error);
    },
  });

  return { data };
}

export function useChatsMessages(chatId) {
  const { data, refetch } = useQuery(
    ["getChatsMessages"],
    () => getChatMessages(chatId),
    {
      onError: (error) => {
        alert(error);
      },
    },
  );

  return { data, refetch };
}
