import { useMutation, useQuery } from "react-query";
import { getQustionnaire, postAnswer } from "./questionnaire";
import { useNavigate } from "react-router-dom";
import { login } from "../auth/auth";
import { jwtDecode } from "jwt-decode";

export function useQustionnaire() {
  const data = useQuery(["getQustionnaire"], getQustionnaire, {
    onError: (error) => {
      alert(error);
    },
  });

  return { data };
}

export function usePostAnswer() {
  const navigate = useNavigate();
  const { mutate, isSuccess, data } = useMutation(
    ["postAnswer"],
    (questions) => postAnswer(questions),
    {
      onSuccess: (data) => {
        navigate("/");
        window.location.reload();
      },
    },
  );

  return { mutate, isSuccess, data };
}
