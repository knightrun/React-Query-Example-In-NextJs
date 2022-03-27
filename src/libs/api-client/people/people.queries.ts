import {QueryClient, useQuery, UseQueryResult} from "react-query";
import {peopleKey} from "./peopleKey";
import {getPeople} from "./people.api";

export const fetchPeople = async (): Promise<QueryClient> => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(peopleKey.all, () => getPeople())
  return queryClient
}

export const useFetchPeople = (options: any): UseQueryResult => useQuery(peopleKey.all, () => getPeople(), options)