import { useState } from "react";
import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const onSignIn = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true);
  };

  return (
    <SimpleGrid columns={innerWidth < 800 ? 1 : 2} height="100vh">
      <Box
        bg="white"
        borderRadius="20px"
        mr={{ base: "0", lg: "40px" }}
        pt={innerWidth < 800 ? "70%" : "30%"}
        h={innerWidth < 800 && "100vh"}
      >
        <Text
          fontSize={{ base: "50px", sm: "130px" }}
          color="pink.300"
          fontWeight="500"
          p="20px"
        >
          CONNECTOR
        </Text>
        <Center>
          <Text color="pink.300" fontSize={{ base: "30px", sm: "30px" }} w="sm">
            Connect with people!
          </Text>
        </Center>
      </Box>
      <VStack bg="pink.300" h={innerWidth < 800 && "100vh"}>
        <Center mt={isLogin ? "35%" : "20%"}>
          <Box
            maxW="fit-content"
            bg="white"
            p="20px"
            borderRadius="20px"
            mt={{ base: "10%", lg: "10px" }}
          >
            {isLogin ? (
              <>
                <LoginForm />
                <Text w="100%" mt="20px" fontWeight="500">
                  Don't have account?
                  <Button
                    ml="10px"
                    color="blue.300"
                    bg="transparent"
                    onClick={onSignIn}
                  >
                    Sign up
                  </Button>
                </Text>
              </>
            ) : (
              <>
                <RegisterForm />
                <Text w="100%" mt="20px" fontWeight="500">
                  Already have account?
                  <Button
                    ml="10px"
                    color="blue.300"
                    bg="transparent"
                    onClick={onSignIn}
                  >
                    Sign in
                  </Button>
                </Text>
              </>
            )}
          </Box>
        </Center>
      </VStack>
    </SimpleGrid>
  );
}
