
import { useQuery } from "react-query";
import { getUsers } from "./users";

export function useUsers() {
  const  data  = useQuery(
    ["getUsers"], getUsers
  );

  return { data };
}
