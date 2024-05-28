import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useCreateUser } from "../../../api/auth/auth-hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { useInterests } from "../../../api/interests/interests-hooks";
import {
  usePostAnswer,
  useQustionnaire,
} from "../../../api/ questionnaire/questionnaire-hooks";

export function RegisterForm() {
  const navigate = useNavigate();

  const { mutate, isSuccess } = useCreateUser();
  const { data } = useInterests();
  const [isOpen, setIsOpen] = useState(false);
  const [questionsAnswer, setQuestionAnswer] = useState([]);
  const [answers, setAnswers] = useState({});
  const { data: questions } = useQustionnaire();
  const { mutate: postAnswer } = usePostAnswer();
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

    setIsOpen(true);
  };

  const onSubmitAnswer = () => {
    postAnswer(questionsAnswer);
    navigate("/");
  };

  const onCheck = (interest) => {
    setInterests([...interests, interest]);
    console.log(interests);
  };

  const onAnswerChange = (e, index, item) => {
    if (!questionsAnswer.find((element) => element.id === item.id)) {
      questionsAnswer[index] = { question_id: item.id, answer: e.target.value };
    } else {
      questionsAnswer.push({ question_id: item.id, answer: e.target.value });
    }
  };

  return (
    <FormControl>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent p="10px">
          {questions.data?.data.map((item, index) => {
            return (
              <Box mt="2">
                <FormLabel>{item.question}</FormLabel>
                <Textarea onChange={(e) => onAnswerChange(e, index, item)} />
              </Box>
            );
          })}
          <Button mt="10" onClick={onSubmitAnswer}>
            Submit
          </Button>
        </ModalContent>
      </Modal>
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
