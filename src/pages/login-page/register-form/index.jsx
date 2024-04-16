import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useCreateUser } from "../../../api/auth/auth-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { useInterests } from "../../../api/interests/interests-hooks";

export function RegisterForm() {
  const navigate = useNavigate();

  const { mutate, isSuccess } = useCreateUser();
  const { data } = useInterests();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [interests, setInterests] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState();
  const [date, setDate] = useState();
  const [bio, setBio] = useState();
  const [gender, setGender] = useState("MALE");
  const onSubmit = () => {
    mutate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      birthDate: format(date, "yyyy-MM-dd"),
      bio,
      interests,
      gender,
    });
    if (isSuccess) {
      navigate("/");
    }
  };

  const onCheck = (interest) => {
    setInterests([...interests, interest]);
    console.log(interests);
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
      <FormLabel mt="10px">Gender</FormLabel>
      <RadioGroup defaultValue="MALE" onChange={(e) => setGender(e)}>
        <Stack spacing={5} direction="row">
          <Radio colorScheme="blue" value="MALE">
            Male
          </Radio>
          <Radio colorScheme="pink" value="FEMALE">
            Female
          </Radio>
        </Stack>
      </RadioGroup>
      <FormLabel mt="10px">Birth Date</FormLabel>
      <DayPicker
        mode="single"
        captionLayout="dropdown-buttons"
        fromYear={1975}
        toYear={2024}
        onSelect={setDate}
        selected={date}
      />
      <FormLabel mt="10px">Description</FormLabel>
      <Textarea
        type="number"
        onChange={(e) => setBio(e.target.value)}
        placeholder="Describe yourself"
      />
      <FormLabel mt="10px">Interests</FormLabel>
      <Stack direction="row" overflowX="scroll">
        {data?.data?.data?.interests.map((item) => {
          return (
            <Checkbox
              value={item.id}
              onChange={() => onCheck(item.id)}
              key={item.id}
            >
              {item.name}
            </Checkbox>
          );
        })}
      </Stack>
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
