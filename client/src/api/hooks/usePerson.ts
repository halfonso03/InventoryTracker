import { useQuery } from "@tanstack/react-query";
import agent from "../agent";

export const usePerson = (id: number) => {

    // const queryClient = useQueryClient();

    const { data: person, isLoading: loadingPerson } = useQuery({
        queryKey: ['person', id],
        queryFn: async () => {
            const response = await agent.get<Person>(`/person/${id}/items`);
            const data = response.data;

            const person: Person = {
                ...data,

            }

            console.log('person', person)

            // const parsedItem: Item = {
            //     ...response.data,
            //     createdOn: new Date(response.data.createdOn),
            //     dateAssigned: response.data.dateAssigned ? new Date(response.data.dateAssigned) : null,
            // };

            return person;

            // return parsedItem;
        }
    })

    return { person, loadingPerson }
}