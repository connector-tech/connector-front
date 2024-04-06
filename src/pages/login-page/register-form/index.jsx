import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useCreateUser } from "../../../api/auth/auth-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const navigate = useNavigate();

  const { mutate, isSuccess } = useCreateUser();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
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
      interests: ["01f38b76-7d8a-450e-b833-cf0fcca88b2d"],
    });
    if (isSuccess) {
      navigate("/");
    }
  };
  return (
    <FormControl>
      <FormLabel>First Name</FormLabel>
      <Input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter First name"
      />
      <FormLabel mt="10px">Last Name</FormLabel>
      <Input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter Last name"
      />
      <FormLabel mt="10px">Email</FormLabel>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <FormLabel mt="10px">Age</FormLabel>
      <Input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter Age"
      />
      <FormLabel mt="10px">Password</FormLabel>
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <FormLabel mt="10px">Confirm Password</FormLabel>
      <Input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Enter password"
      />
      <Button onClick={onSubmit} mt="20px" w="100%">
        Sign up
      </Button>
    </FormControl>
  );
}
