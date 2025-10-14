// import { useInventory } from '../../api/hooks/useInventory';
import Button from '../../ui/Button';
// import Header from '../../ui/Header';
import { useNavigate } from 'react-router-dom';
// import { usePagination } from '../../app/contexts/usePagination';
// import Search from '../../components/Search';
import InventoryList from './InventoryList';
import InventoryFilters from './InventoryFilters';
import { usePagination } from '../../app/contexts/usePagination';
import { Box } from '../../ui/Box';

export default function Inventory() {
  const navigate = useNavigate();

  // const paginationData = itemResults?.pagination;

  // if (loadingItems) return;

  // function filterInventory(itemStatusId: string = '') {
  //   setPageNumber(1);
  //   setItemStatusFilter(itemStatusId);
  // }

  // function handleSearch(searchTerm: string) {
  //   setPageNumber(1);
  //   setSearchTerm(searchTerm);
  // }
  const { setItemStatusFilter, itemStatusFilter } = usePagination();

  return (
    <>
      <div className=" text-end">
        <Button
          variation="primary"
          onClick={() => navigate('/inventory/new')}
          className="self-end"
        >
          Add Inventory Item
        </Button>
      </div>

      <Box className="flex">
        <InventoryFilters
          itemStatusFilter={itemStatusFilter}
          setItemStatusFilter={setItemStatusFilter}
        ></InventoryFilters>
      </Box>
      <InventoryList></InventoryList>
    </>
  );
}
