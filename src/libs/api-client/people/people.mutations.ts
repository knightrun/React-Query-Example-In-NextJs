import {useMutation, UseMutationResult, useQueryClient} from "react-query";
import {peopleKey} from "./peopleKey";
import {addPerson} from "./people.api";

export const mutationPeople = (): UseMutationResult => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient()
// eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    data => {
      return addPerson(data)
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(peopleKey.all)
      }
    }
  )
}