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

export function ChatPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState({});
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

  const onModalOpen = (item) => {
    setCurrentChat(item);
    setIsOpen(true);
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
      <ChatDrawer
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        chatId={currentChat.id}
        receiverId={currentChat?.receiver?.id}
        receiverAvatar={currentChat?.receiver?.avatar}
        receiverName={currentChat?.receiver?.full_name}
      />
      <Box>
        <Box borderTop="1px #E8E8E8 solid" pt="5" alignContent="left">
          {chats &&
            chats.data?.data?.items?.map((item, index) => {
              return (
                <Box
                  display="flex"
                  gap="20px"
                  key={index}
                  mb="5"
                  pl="5"
                  pb="5"
                  borderBottom="1px solid"
                  onClick={() => onModalOpen(item)}
                >
                  <Avatar
                    name="Dan Abrahmov"
                    src={`https://connector-app-bucket.s3.eu-central-1.amazonaws.com${item?.receiver?.avatar}`}
                  />
                  <VStack align="left">
                    <Text fontSize="17px" fontWeight="500" align="left">
                      {item.receiver?.full_name}
                    </Text>
                    <Text fontSize="17px" align="left">
                      {item?.last_message === null
                        ? "Написать сообщение"
                        : item?.last_message}
                    </Text>
                  </VStack>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}
