import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  useMyProfileInfo,
  useUpdateUser,
} from "../../../../api/users/users-hooks";
import { useInterests } from "../../../../api/interests/interests-hooks";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

export default function EditForm() {
  const { data } = useMyProfileInfo();
  const { data: interests } = useInterests();
  const [interestsList, setInterestsList] = useState([]);
  const { mutate } = useUpdateUser();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [date, setDate] = useState(" ");
  const [error, setError] = useState(false);

  const onCheck = (interest) => {
    setInterestsList([...interestsList, interest]);
  };

  const onSubmit = () => {
    if (date !== " ") {
      mutate({
        firstName,
        lastName,
        birthDate: format(date, "yyyy-MM-dd"),
        bio,
        interests: interestsList,
      });
    } else {
      setError(true);
    }
  };

  return (
    <FormControl mt="5">
      {data && interests ? (
        <>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First name"
            defaultValue={data.data?.full_name.split(" ")[0]}
          />
          <FormLabel mt="10px">Last Name</FormLabel>
          <Input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter First name"
            defaultValue={data.data?.full_name.split(" ")[1]}
          />
          <FormLabel mt="10px">Description</FormLabel>
          <Textarea
            type="number"
            onChange={(e) => setBio(e.target.value)}
            placeholder="Describe yourself"
            defaultValue={data.data?.bio}
          />
          <FormLabel mt="5">Birth Date</FormLabel>
          <DayPicker
            mode="single"
            captionLayout="dropdown-buttons"
            fromYear={1975}
            toYear={2024}
            onSelect={setDate}
            selected={date}
          />
          <FormLabel mt="10px">Interests</FormLabel>
          <Stack direction="row" overflowX="scroll">
            {interests?.data?.data?.interests.map((item) => {
              return (
                <Checkbox
                  value={item.id}
                  onChange={() => onCheck(item.id)}
                  key={item.id}
                  defaultChecked={data && data.data?.interests.at(item.name)}
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </Stack>
          <Button
            bg="green.300"
            color="white"
            w="full"
            mt="10 "
            mb="10"
            onClick={onSubmit}
            disabled={date === " "}
          >
            Save Changes
          </Button>
        </>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Enter all required fields!</AlertTitle>
        </Alert>
      )}
    </FormControl>
  );
}
