import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../agent"
import type { ItemFormData } from "../../form_schemas/itemSchema";
import { useNavigate } from "react-router-dom";



export const useInventory = (itemStatusId?: string) => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    console.log('itemStatusId', itemStatusId)

    const { data: items, isLoading: loadingItems } = useQuery({
        queryKey: ['inventory', itemStatusId],
        staleTime: 0,
        queryFn: async () => {
            const response = await agent.get<Item[]>(`/inventory/${itemStatusId}`);

            const parsedItems: Item[] = response.data.map(r => ({
                ...r,
                createdOn: new Date(r.createdOn),
                dateAssigned: r.dateAssigned ? new Date(r.dateAssigned) : null,
            }));

            return parsedItems;
        },
        enabled: itemStatusId != undefined
    })

    const { mutate: createItem, isPending: isCreating, isSuccess: created } = useMutation({
        mutationFn: async (item: ItemFormData) => {
            const response = await agent.post(`inventory`, item)
            console.log('response', response.data)
            return response.data;
        },
        onSuccess: (item: Item) => {
            console.log('create item', item)
            navigate(`/inventory/${item.id}`);
        }
    })

    const { mutate: updateItem, isPending: isUpdating, isSuccess: updated } = useMutation({
        mutationFn: async (item: ItemFormData) => {
            const response = await agent.put(`inventory/${item.id}`, item)
            console.log('response', response.data)
            return response.data;
        },
        onSuccess: (item: Item) => {
            console.log('item', item)
            queryClient.invalidateQueries(
                { queryKey: ['items', item.id] });
        }
    })

    return { items, loadingItems, createItem, isCreating, created, updateItem, isUpdating, updated };
}

