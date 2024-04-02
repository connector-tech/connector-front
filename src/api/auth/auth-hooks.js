import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUser, login } from "./auth";

export function useCreateUser() {
  const navigate = useNavigate();
  const { mutate, isSuccess } = useMutation(
    ["createUser"],
    ({ firstName, lastName, email, password, confirmPassword, age, bio, interests }) =>
      createUser(firstName, lastName, email, password, confirmPassword, age, bio, interests),
    {
      onSuccess: () => {
        navigate("/");
      }
    }
  );

  return { isSuccess, mutate };
}

export function useLogin() {
  const navigate = useNavigate();
  const { mutate, isSuccess, data } = useMutation(
    ["loginUser"],
    ({ email, password }) => login(email, password),
    {
      onSuccess: () => {
        navigate("/");
      }
    }
  );

  return { mutate, isSuccess, data };
}
