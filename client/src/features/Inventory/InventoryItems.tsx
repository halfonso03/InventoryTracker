import { Box } from '../../ui/Box';
import { Pagination } from '../../ui/Pagination';
import Table from '../../ui/Table';
import ItemRow from '../Items/ItemRow';

type Props = {
  items: Item[] | undefined;
  paginationData: PaginationData | undefined;
  onSetPageNumber: (pageNumber: number) => void;
};

export default function InventoryItems({
  items,
  paginationData,
  onSetPageNumber,
}: Props) {
  if (!items) return;

  return (
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
        data={items}
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
  );
}
