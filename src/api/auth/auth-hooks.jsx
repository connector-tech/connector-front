import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUser, login } from "./auth";

export function useCreateUser() {
  const navigate = useNavigate();
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
    }) =>
      createUser(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        age,
        bio,
        interests,
      ),
    {
      onSuccess: (data) => {
        navigate("/");
        localStorage.setItem("token", data.data?.access_token);
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
        navigate("/");
        localStorage.setItem("token", data.data?.access_token);
      },
    },
  );

  return { mutate, isSuccess, data };
}
