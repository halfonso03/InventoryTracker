import { useQuery } from "@tanstack/react-query"
import agent from "../agent"



export const useItem = (id: number) => {

    const { data: item, isLoading: loadingItem } = useQuery({
        queryKey: ['items', id],
        queryFn: async () => {
            const response = await agent.get<Item>('/inventory/' + id);

            const parsedItem: Item = {
                ...response.data,
                createdOn: new Date(response.data.createdOn),
                dateAssigned: response.data.dateAssigned ? new Date(response.data.dateAssigned) : null,
            };



            return parsedItem;
        }
    })

    return { item, loadingItem };
}
