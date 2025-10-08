import { useInventory } from '../../api/hooks/useInventory';
import ItemRow from '../Items/ItemRow';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import Header from '../../ui/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '../../ui/Box';
import { usePagination } from '../../app/contexts/usePagination';
import { Pagination } from '../../ui/Pagination';

export default function Inventory() {
  const [filter, setFilter] = useState<string>('');
  const { itemResults, loadingItems } = useInventory(filter);
  const navigate = useNavigate();

  const { setPageNumber } = usePagination();
  const paginationData = itemResults?.pagination;

  if (loadingItems) return 'Loading...';

  function filterInventory(itemStatusId: string = '') {
    setPageNumber(1);
    setFilter(itemStatusId);
  }

  function onSetPageNumber(pageNumber: number) {
    setPageNumber(pageNumber);
  }

  // Unassigned = 1,
  //   Assigned = 2,
  //   TBD = 3,
  //   Disposed = 4

  return (
    <>
      <Header>
        <div className="flex justify-between mb-6">
          <div className="w-1/3 text-sm self-end text-neutral-400">
            Displaying {itemResults?.items?.length} items
          </div>
          <div className="w-1/3 flex justify-center gap-3">
            <Button
              variation="secondary"
              className="self-start"
              selected={filter === ''}
              onClick={() => filterInventory()}
            >
              All
            </Button>
            <Button
              variation="secondary"
              className="self-start"
              selected={filter === '2'}
              onClick={() => filterInventory('2')}
            >
              Assigned
            </Button>
            <Button
              className="self-start"
              variation="secondary"
              selected={filter === '1'}
              onClick={() => filterInventory('1')}
            >
              Unassigned
            </Button>
            <Button
              variation="secondary"
              className="self-start"
              selected={filter === '3'}
              onClick={() => filterInventory('3')}
            >
              TDB
            </Button>
            <Button
              variation="secondary"
              className="self-start"
              selected={filter === '4'}
              onClick={() => filterInventory('4')}
            >
              Disposal
            </Button>
          </div>
          <div className="w-1/3 text-end">
            <Button
              variation="primary"
              onClick={() => navigate('/inventory/new')}
            >
              Add Inventory Item
            </Button>
          </div>
        </div>
      </Header>
      <Table columns=".05fr .1fr .13fr .3fr .3fr .3fr .1fr .16fr .15fr .25fr .14fr .08fr">
        <Table.Header>
          <Table.Cell className="font-semibold">Id</Table.Cell>
          <Table.Cell className="font-semibold">HBC #</Table.Cell>
          <Table.Cell className="font-semibold">Type</Table.Cell>
          <Table.Cell className="font-semibold">Serial Number</Table.Cell>
          <Table.Cell className="font-semibold">Description</Table.Cell>
          <Table.Cell className="font-semibold">Computer Name</Table.Cell>
          <Table.Cell className="font-semibold">Initiative</Table.Cell>
          <Table.Cell className="font-semibold" align="center">
            Cubicle/Room
          </Table.Cell>
          <Table.Cell className="font-semibold">Date Assigned</Table.Cell>
          <Table.Cell className="font-semibold">Assigned User</Table.Cell>
          <Table.Cell className="font-semibold">IP Address</Table.Cell>
          <Table.Cell className="font-semibold" align="center">
            Status
          </Table.Cell>
        </Table.Header>
        <Table.Body
          data={itemResults?.items as Item[]}
          render={(item: Item) => <ItemRow key={item.id} item={item}></ItemRow>}
        ></Table.Body>
        <Table.Footer>
          <Box>
            <Pagination
              data={paginationData}
              setPageNumber={onSetPageNumber}
            ></Pagination>
          </Box>
        </Table.Footer>
      </Table>
    </>
  );
}
