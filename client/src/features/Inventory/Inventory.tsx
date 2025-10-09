import { useInventory } from '../../api/hooks/useInventory';
import Button from '../../ui/Button';
import Header from '../../ui/Header';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '../../app/contexts/usePagination';
import Search from '../../components/Search';
import InventoryItems from './InventoryItems';

export default function Inventory() {
  const navigate = useNavigate();

  const {
    setPageNumber,
    setItemStatusFilter,
    setSearchTerm,
    itemStatusFilter,
  } = usePagination();

  const { itemResults, loadingItems } = useInventory(itemStatusFilter);

  const paginationData = itemResults?.pagination;

  if (loadingItems) return;

  function filterInventory(itemStatusId: string = '') {
    setPageNumber(1);
    setItemStatusFilter(itemStatusId);
  }

  function onSetPageNumber(pageNumber: number) {
    setPageNumber(pageNumber);
  }

  function handleSearch(searchTerm: string) {
    setPageNumber(1);
    setSearchTerm(searchTerm);
  }

  return (
    <>
      <Header>
        <div className="text-end">
          <Button
            variation="primary"
            onClick={() => navigate('/inventory/new')}
          >
            Add Inventory Item
          </Button>
        </div>
        <div className="flex justify-between my-6">
          <div className="w-1/3"></div>
          <div className="w-1/3 flex gap-3">
            <Button
              variation="secondary"
              className="self-start"
              selected={itemStatusFilter === ''}
              onClick={() => filterInventory()}
            >
              All
            </Button>
            <Button
              variation="secondary"
              className="self-start"
              selected={itemStatusFilter === '2'}
              onClick={() => filterInventory('2')}
            >
              Assigned
            </Button>
            <Button
              className="self-start"
              variation="secondary"
              selected={itemStatusFilter === '1'}
              onClick={() => filterInventory('1')}
            >
              Unassigned
            </Button>
            <Button
              variation="secondary"
              className="self-start"
              selected={itemStatusFilter === '3'}
              onClick={() => filterInventory('3')}
            >
              TDB
            </Button>
            <Button
              variation="secondary"
              className="self-start"
              selected={itemStatusFilter === '4'}
              onClick={() => filterInventory('4')}
            >
              Disposal
            </Button>
          </div>

          <div className="w-1/4 text-end">
            <Search onSearch={handleSearch} />
          </div>
        </div>
      </Header>
      <InventoryItems
        items={itemResults?.items}
        onSetPageNumber={onSetPageNumber}
        paginationData={paginationData}
      ></InventoryItems>
    </>
  );
}
