import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useMatchedUsers } from "../../api/users/users-hooks";
export function ChatPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: matchedUsers } = useMatchedUsers();

  useEffect(() => {
    const webSocket = new WebSocket(
      "wss://core-46ur.onrender.com/chats/ws/322cf31d-eb53-4be1-bfb8-bb2d9294725c/",
    );
    webSocket.onopen = () => {
      console.log("Connected to WebSocket server");
    };
  }, []);

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
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
          <DrawerContent>
            <DrawerBody>
              <Button onClick={() => setIsOpen(false)} bg="transparent">
                <Icon as={ArrowLeftIcon} />{" "}
                <Text fontWeight="500" ml="5">
                  Back
                </Text>
              </Button>
              <Box mt="5">
                <HStack mt="5">
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Text fontSize="17px" fontWeight="500">
                    Dan Abramov
                  </Text>
                </HStack>
                <Box mt="3">
                  <Text>
                    {" "}
                    ddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                  </Text>
                </Box>
              </Box>
              <Box mt="5">
                <HStack mt="5">
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Text fontSize="17px" fontWeight="500">
                    Dan Abramov
                  </Text>
                </HStack>
                <Box mt="3">
                  <Text>Привет красотка)</Text>
                </Box>
              </Box>
            </DrawerBody>
            <DrawerFooter>
              <Input placeholder="Написать сообщение..." />
              <Button ml="3">Отправить</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <HStack
          borderTop="1px #E8E8E8 solid"
          pt="5"
          pl="5"
          onClick={() => setIsOpen(true)}
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <VStack>
            <Text fontSize="17px" fontWeight="500">
              Dan Abramov
            </Text>
            <Text fontSize="17px" ml="20px">
              Привет красотка)
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
