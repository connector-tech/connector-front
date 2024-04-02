import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useLogin } from "../../../api/auth/auth-hooks";
import { useState } from "react";
import { redirect } from "react-router-dom";

export function LoginForm() {
  const { mutate: login, isSuccess } = useLogin();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLogin = () => {
    login({
      email,
      password
    });
    if (isSuccess) {
      redirect("/");
    }
  };

  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input
        type="email"
        borderRadius="20px"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <FormLabel mt="10px">Password</FormLabel>
      <Input
        type="password"
        borderRadius="20px"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <Button onClick={onLogin} mt="20px" w="100%">
        Sign in
      </Button>
    </FormControl>
  );
}
