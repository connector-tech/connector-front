import { Box, Card, Text } from "@chakra-ui/react";

export function ChatPage() {
  return (
    <Box>
      <Box textAlign="left">
        <Text fontSize="25px" fontWeight="500" p="20px">
          Узнать кто вас лайкнул 👀
        </Text>
      </Box>
      <Box display="flex" gap="20px" overflow="hidden" m="10px">
        <Card
          bgImage="https://img.freepik.com/free-photo/blurred-pop-abstract-background-pink_58702-1700.jpg"
          bgRepeat="no-repeat"
          bgSize="cover"
          w="100px"
          h="100px"
        />
        <Card
          bgImage="https://img.freepik.com/free-photo/blurred-pop-abstract-background-pink_58702-1700.jpg"
          bgRepeat="no-repeat"
          bgSize="cover"
          w="100px"
          h="100px"
        />
        <Card
          bgImage="https://img.freepik.com/free-photo/blurred-pop-abstract-background-pink_58702-1700.jpg"
          bgRepeat="no-repeat"
          bgSize="cover"
          w="100px"
          h="100px"
        />
        <Card
          bgImage="https://img.freepik.com/free-photo/blurred-pop-abstract-background-pink_58702-1700.jpg"
          bgRepeat="no-repeat"
          bgSize="cover"
          w="100px"
          h="100px"
        />
      </Box>
      <Box></Box>
    </Box>
  );
}
