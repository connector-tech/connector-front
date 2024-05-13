import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useMyProfileInfo } from "../../../api/users/users-hooks";
import { useChatsMessages } from "../../../api/chat/chat-hooks";

const ws = new WebSocket(
  `wss://api.connector-app.net/ws/${sessionStorage.getItem("user_id")}`,
);
export function ChatDrawer({
  setIsOpen,
  isOpen,
  chatId,
  receiverId,
  receiverAvatar,
  receiverName,
}) {
  const { data: messages, refetch } = useChatsMessages(chatId, isOpen);
  const [currentMessage, setCurrentMessage] = useState();
  const [currentMessages, setCurrentMessages] = useState([]);

  useEffect(() => {
    setCurrentMessages(messages?.data?.items.reverse());
    console.log(currentMessages);

    return () => {
      setCurrentMessages([]);
      ws.close();
    };
  }, []);

  const onChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  ws.onopen = () => {
    console.log("connected!");
  };

  ws.onerror = (event) => {
    console.log(event.data);
  };

  ws.onmessage = (event) => {
    refetch();
    setCurrentMessages(messages?.data?.items.reverse());
  };

  const onSendMessage = () => {
    const data = {
      chat_id: chatId,
      receiver_id: receiverId,
      text: currentMessage,
    };
    ws.send(JSON.stringify(data));
    console.log("sended");
    refetch();
    currentMessages?.push(data);
    setCurrentMessage("");
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          top="0"
          position="fixed"
          bgColor="white"
          zIndex="999"
          w="100%"
        >
          <Button onClick={() => setIsOpen(false)} bg="transparent">
            <Icon as={ArrowLeftIcon} />
            <Text fontWeight="500" ml="5">
              Back
            </Text>
          </Button>
        </ModalHeader>
        <ModalBody>
          <Box pb="100px" pt="100px">
            {messages?.data?.items.map((_, index) => {
              return (
                <Box key={index}>
                  <HStack mt="5">
                    <Avatar
                      src={
                        messages?.data?.items[
                          messages?.data?.items.length - 1 - index
                        ].is_me
                          ? "https://bit.ly/broken-link"
                          : `https://connector-app-bucket.s3.eu-central-1.amazonaws.com${receiverAvatar}`
                      }
                    />
                    <Text fontSize="17px" fontWeight="500">
                      {messages?.data?.items[
                        messages?.data?.items.length - 1 - index
                      ]?.is_me
                        ? "Ruslan"
                        : receiverName}
                    </Text>
                  </HStack>
                  <Box mt="3">
                    <Text>
                      {
                        messages?.data?.items[
                          messages?.data?.items.length - 1 - index
                        ]?.text
                      }
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </ModalBody>
        <ModalFooter bottom="0" position="fixed" bgColor="white">
          <Input
            placeholder="Написать сообщение..."
            onChange={onChange}
            value={currentMessage}
          />
          <Button ml="3" onClick={onSendMessage}>
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
