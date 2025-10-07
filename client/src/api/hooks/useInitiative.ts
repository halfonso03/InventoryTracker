import { useQuery } from "@tanstack/react-query";
import agent from "../agent";

export const useInitiative = () => {

    const { data: initiatives, isLoading: loadingInitiatives } = useQuery({
        queryKey: ['initiatives'],
        queryFn: async () => {
            const response = await agent.get<Initiative[]>(`/initiative`);
            const data = response.data;
            return data;
        }
    })

    return { initiatives, loadingInitiatives }
}