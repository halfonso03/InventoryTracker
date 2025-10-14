import { useQuery } from "@tanstack/react-query"
import agent from "../agent"
import { usePagination } from "../../app/contexts/usePagination";
import { formatItem } from "../../helpers/ItemHelpers";



export const useInventory = (itemStatusId?: string) => {

    // const queryClient = useQueryClient();
    const { pageNumber, searchTerm } = usePagination();

    // const queryKeySearchTerm = '';


    const { data: itemResults, isLoading: loadingItems } = useQuery<{ items: Item[], pagination: PaginationData | undefined }>({
        queryKey: ['inventory', itemStatusId, pageNumber, searchTerm],
        staleTime: 0,
        queryFn: async () => {
            const response = await agent.get<Item[]>(`/inventory/items/${itemStatusId}`,
                {
                    params: { pageNumber, searchTerm }
                }
            );
            const items: Item[] = response.data.map(formatItem);
            const paginationHeader = response.headers['pagination'];
            const pagination: PaginationData = paginationHeader ? JSON.parse(paginationHeader) : null;

            return { items, pagination };
        },
        enabled: itemStatusId != undefined
    })



    return { itemResults, loadingItems };
}

