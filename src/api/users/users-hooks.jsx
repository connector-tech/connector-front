import { useMutation, useQuery } from "react-query";
import {
  getMatchedUsers,
  getUsers,
  getMyUserInfo,
  uploadPhotos,
  updateUser,
} from "./users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createUser } from "../auth/auth";

export function useUsers(size) {
  const data = useQuery(["getUsers"], getUsers);

  return { data };
}

export function useMatchedUsers(size) {
  const data = useQuery(["getMatchedUsers"], getMatchedUsers);

  return { data };
}

export function useMyProfileInfo() {
  const data = useQuery(["getMyProfileInfo"], getMyUserInfo);

  return { data };
}
export function useUploadPhoto() {
  const { mutate, isSuccess, data } = useMutation(
    ["uploadPhotos"],
    ({ photos }) => uploadPhotos(photos),
  );

  return { mutate, isSuccess, data };
}

export function useUpdateUser() {
  const { mutate, isSuccess, data } = useMutation(
    ["updateUser"],
    ({ firstName, lastName, birthDate, bio, interests }) =>
      updateUser(firstName, lastName, birthDate, bio, interests),
  );

  return { isSuccess, mutate };
}
