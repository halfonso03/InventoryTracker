import { useQuery } from "@tanstack/react-query";
import agent from "../agent";

export const usePeople = () => {

    const { data: people, isLoading: loadingPeople } = useQuery({
        queryKey: ['people'],
        queryFn: async () => {
            const response = await agent.get<Person[]>(`/person`);
            const data = response.data;
            return data;
        }
    })

    return { people, loadingPeople }
}