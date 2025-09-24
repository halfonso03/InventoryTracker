import { useQuery } from "@tanstack/react-query"
import agent from "../agent"



export const useInventory = () => {

    const { data: items, isLoading: loadingItems } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const response = await agent.get<Item[]>('/inventory');

            const parsedItems: Item[] = response.data.map(r => ({
                ...r,
                createdOn: new Date(r.createdOn),
                dateAssigned: r.dateAssigned ? new Date(r.dateAssigned) : null,
            }));

            return parsedItems;
        }
    })

    return { items, loadingItems };
}

