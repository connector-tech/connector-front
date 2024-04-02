import { useState } from "react";
import { Box, Button, Center, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useCreateUser, useLogin } from "../../api/auth/auth-hooks";

export function LoginPage() {
  const { mutate, isSuccess, data } = useCreateUser();
  const { mutate: login } = useLogin();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onSubmit = () => {
    mutate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      age: 18,
      bio: "test",
      interests: ["01f38b76-7d8a-450e-b833-cf0fcca88b2d"]
    });
  };

  const onLogin = () => {
    login({
      email,
      password
    });
  };
  return (
    <Center bg="#ADEFD1FF">
      <Box maxW="sm">
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type="text" onChange={(e) => setFirstName(e.target.value)} />
          <FormLabel>Last Name</FormLabel>
          <Input type="text" onChange={(e) => setLastName(e.target.value)} />
          <FormLabel>Email address</FormLabel>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          <FormLabel>Password</FormLabel>
          <Input type="password" onChange={(e) => setPassword(e.target.value)} />
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button onClick={onSubmit}>Submit</Button>
          <Button onClick={onLogin}>Login</Button>
        </FormControl>
      </Box>
    </Center>
  );
}
