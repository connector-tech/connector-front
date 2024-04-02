import { useState } from "react";
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const onSignIn = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true);
  };

  return (
    <Center bg="pink.300" h="100vh" display={{ base: "block", lg: "flex" }}>
      <Box bg="white" borderRadius="20px" mr={{ base: "0", lg: "40px" }}>
        <Text fontSize={{ base: "50px", sm: "200px" }} color="pink.300" fontWeight="500" p="20px">
          CONNECTOR
        </Text>
      </Box>
      <VStack>
        <Box maxW="sm" bg="white" p="20px" borderRadius="20px" mt={{ base: "10%", lg: "10px" }}>
          {isLogin ? (
            <>
              <LoginForm />
              <Text w="100%" mt="20px" fontWeight="500">
                Don't have account?
                <Button ml="10px" color="blue.300" bg="transparent" onClick={onSignIn}>
                  Sign up
                </Button>
              </Text>
            </>
          ) : (
            <>
              <RegisterForm />
              <Text w="100%" mt="20px" fontWeight="500">
                Already have account?
                <Button ml="10px" color="blue.300" bg="transparent" onClick={onSignIn}>
                  Sign in
                </Button>
              </Text>
            </>
          )}
        </Box>
      </VStack>
    </Center>
  );
}
