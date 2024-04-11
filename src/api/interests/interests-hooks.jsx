import { useQuery } from "react-query";
import { getInterests } from "./interests";

export function useInterests() {
  const data = useQuery(["getInterests"], getInterests);

  return { data };
}
