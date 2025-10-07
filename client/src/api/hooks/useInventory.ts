import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../agent"
import type { ItemFormData } from "../../form_schemas/itemSchema";



export const useInventory = () => {
    const queryClient = useQueryClient();


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

    const { mutate: createItem, isPending: isCreating, isSuccess: created } = useMutation({
        mutationFn: async (item: ItemFormData) => {

            const response = await agent.post(`inventory/${item.id}`)

            console.log('response', response.data)

            return response.data;
        },
        onSuccess: (item: Item) => {
            console.log('item', item)

            queryClient.invalidateQueries(
                { queryKey: ['items', item.id] });
        }
    })

    const updateItem = useMutation({
        mutationFn: async () => {

        },
        onSuccess: () => {

        }
    })

    return { items, loadingItems, createItem, isCreating, created, updateItem };
}

