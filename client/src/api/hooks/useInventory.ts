import { useQuery } from "@tanstack/react-query"
import agent from "../agent"
import { usePagination } from "../../app/contexts/usePagination";
import { formatItem } from "../../helpers/ItemHelpers";



export const useInventory = (itemStatusId?: string) => {

    // const queryClient = useQueryClient();
    // const navigate = useNavigate();
    const { pageNumber } = usePagination();
    // const location = useLocation();

    const { data: itemResults, isLoading: loadingItems } = useQuery({
        queryKey: ['inventory', itemStatusId, pageNumber],
        staleTime: 0,
        queryFn: async () => {
            const response = await agent.get<Item[]>(`/inventory/items/${itemStatusId}`,
                {
                    params: { pageNumber }
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

