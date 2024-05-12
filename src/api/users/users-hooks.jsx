import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getMatchedUsers,
  getUsers,
  getMyUserInfo,
  uploadPhotos,
  updateUser,
} from "./users";

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
  const queryClient = useQueryClient();
  const { mutate, isSuccess, data } = useMutation(
    ["updateUser"],
    ({ firstName, lastName, birthDate, bio, interests }) =>
      updateUser(firstName, lastName, birthDate, bio, interests),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getMyProfileInfo");
      },
    },
  );

  return { isSuccess, mutate };
}
