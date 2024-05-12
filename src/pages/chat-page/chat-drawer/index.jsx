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
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useMyProfileInfo } from "../../../api/users/users-hooks";
import { useChatsMessages } from "../../../api/chat/chat-hooks";
export function ChatDrawer({
  setIsOpen,
  isOpen,
  chatId,
  receiverId,
  receiverAvatar,
  receiverName,
  ws,
}) {
  const { data: messages, refetch } = useChatsMessages(chatId);
  const [currentMessage, setCurrentMessage] = useState();
  const [currentMessages, setCurrentMessages] = useState([]);

  useEffect(() => {
    setCurrentMessages([...currentMessages, messages?.data?.items]);
  }, []);

  useEffect(() => {
    console.log(currentMessages);
  }, [currentMessages]);

  ws.onopen = () => {
    console.log(messages);
  };

  console.log(ws.readyState);

  ws.onerror = (event) => {
    console.log(event.data);
  };

  const onSendMessage = () => {
    const data = {
      chat_id: chatId,
      receiver_id: receiverId,
      text: currentMessage,
    };
    currentMessages.push(data);
    ws.send(JSON.stringify(data));
    console.log("sended");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("wow");
    refetch();
    currentMessages.push(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Button onClick={() => setIsOpen(false)} bg="transparent">
            <Icon as={ArrowLeftIcon} />
            <Text fontWeight="500" ml="5">
              Back
            </Text>
          </Button>
          <Box pb="100px">
            {currentMessages.map((message, index) => {
              return (
                <Box key={index}>
                  <HStack mt="5">
                    <Avatar
                      name="Dan Abrahmov"
                      src={`https://connector-app-bucket.s3.eu-central-1.amazonaws.com${receiverAvatar}`}
                    />
                    <Text fontSize="17px" fontWeight="500">
                      {message?.is_me}
                    </Text>
                  </HStack>
                  <Box mt="3">
                    <Text>{message?.text}</Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </ModalBody>
        <DrawerFooter bottom="0" position="fixed" bgColor="white">
          <Input
            placeholder="Написать сообщение..."
            onChange={(e) => setCurrentMessage(e.target.value)}
            value={currentMessage}
          />
          <Button ml="3" onClick={onSendMessage}>
            Отправить
          </Button>
        </DrawerFooter>
      </ModalContent>
    </Modal>
  );
}
