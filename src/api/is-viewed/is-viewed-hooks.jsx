import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { isViewed } from "./is-viewed";

export function useViewed(userId, isLiked) {
  const { mutate, isSuccess, data } = useMutation(
    ["isViewed"],
    ({ userId, isLiked }) => isViewed(userId, isLiked),
  );

  return { mutate, isSuccess, data };
}
