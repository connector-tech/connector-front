import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Flex,
  Card,
  CardBody,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useMatchedUsers, useMyProfileInfo } from "../../api/users/users-hooks";
import { ChatDrawer } from "./chat-drawer";
import { useCreateUser } from "../../api/auth/auth-hooks";
import { useChats, useCreateChat } from "../../api/chat/chat-hooks";
import { jwtDecode } from "jwt-decode";

const ws = new WebSocket(
  `wss://api.connector-app.net/ws/${sessionStorage.getItem("user_id")}`,
);
export function ChatPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: matchedUsers } = useMatchedUsers();
  const { data: chats } = useChats();
  const { data } = useMyProfileInfo();
  const { mutate: createChat, isSuccess, data: response } = useCreateChat();
  const onOpenFirstChat = (id) => {
    createChat({
      receiver_id: id,
    });
    if (isSuccess) {
      setIsOpen(true);
    }
  };

  return (
    <Box>
      <Box textAlign="left">
        <Text fontSize="25px" fontWeight="500" p="20px">
          Your likes ❤️
        </Text>
      </Box>
      <Box display="flex" gap="20px" overflow="hidden" m="10px">
        {matchedUsers.data?.data?.items.map((user) => {
          return (
            <Card
              bgImage="https://img.freepik.com/free-photo/blurred-pop-abstract-background-pink_58702-1700.jpg"
              bgRepeat="no-repeat"
              bgSize="cover"
              w="100px"
              h="80px"
              key={user.id}
              onClick={() => onOpenFirstChat(user.id)}
            >
              <CardBody>
                <Text fontWeight="500" color="white">
                  {user.full_name}
                </Text>
              </CardBody>
            </Card>
          );
        })}
      </Box>
      <Box textAlign="left">
        <Text fontSize="25px" fontWeight="500" p="20px">
          Chat
        </Text>
      </Box>

      <Box>
        <HStack
          borderTop="1px #E8E8E8 solid"
          pt="5"
          pl="5"
          onClick={() => setIsOpen(true)}
        >
          {chats &&
            chats.data?.data?.items?.map((item, index) => {
              return (
                <Box display="flex" gap="20px" key={index}>
                  <Avatar
                    name="Dan Abrahmov"
                    src={`https://connector-app-bucket.s3.eu-central-1.amazonaws.com${item?.receiver?.avatar}`}
                  />

                  <ChatDrawer
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    ws={ws}
                    chatId={item?.id}
                    receiverId={item?.receiver?.id}
                    receiverAvatar={item?.receiver?.avatar}
                    receiverName={item?.receiver?.full_name}
                  />

                  <VStack align="left">
                    <Text fontSize="17px" fontWeight="500" align="left">
                      {item.receiver?.full_name}
                    </Text>
                    <Text fontSize="17px" align="left">
                      {item?.last_message === null && "Написать сообщение"}
                    </Text>
                  </VStack>
                </Box>
              );
            })}
        </HStack>
      </Box>
    </Box>
  );
}
