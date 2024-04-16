import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUser, login } from "./auth";
import { Alert, AlertIcon, AlertTitle, useToast } from "@chakra-ui/react";

export function useCreateUser() {
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isSuccess, data } = useMutation(
    ["createUser"],
    ({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      age,
      bio,
      interests,
      birthDate,
      gender,
    }) =>
      createUser(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        birthDate,
        bio,
        interests,
        gender,
      ),
    {
      onSuccess: (data) => {
        sessionStorage.setItem("token", data.data?.access_token);
        navigate("/");
        window.location.reload();
      },
      onError: (error) => {
        toast({
          title: `${error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    },
  );

  return { isSuccess, mutate, data };
}

export function useLogin() {
  const navigate = useNavigate();
  const { mutate, isSuccess, data } = useMutation(
    ["loginUser"],
    ({ email, password }) => login(email, password),
    {
      onSuccess: (data) => {
        sessionStorage.setItem("token", data.data?.access_token);
        navigate("/");
        window.location.reload();
      },
    },
  );

  return { mutate, isSuccess, data };
}
