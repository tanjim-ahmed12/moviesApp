import { useQuery } from "react-query";
import { getActor } from "../api/tmdb-api";

export const useActor = (id: string) =>
  useQuery(["actor", id], () => getActor(id));
