import { Box } from '../../ui/Box';
import Table from '../../ui/Table';
import PersonItemRow from './PersonItemRow';

type Props = {
  items: Item[];
};

export default function PersonItems({ items }: Props) {
  if (!items) return '';

  return (
    <Box className="text-sm">
      <Table columns=".1fr .1fr .3fr .3fr .3fr .2fr .15fr .2fr .2fr">
        <Table.Header>
          <Table.Cell>HBC #</Table.Cell>
          <Table.Cell>Type</Table.Cell>
          <Table.Cell>Serial Number</Table.Cell>
          <Table.Cell>Description</Table.Cell>
          <Table.Cell>Computer Name</Table.Cell>
          <Table.Cell>Initiative</Table.Cell>
          <Table.Cell>Date Assigned</Table.Cell>
          <Table.Cell>Cubicle / Room</Table.Cell>
          <Table.Cell>
            <div className="w-full text-center">Actions</div>
          </Table.Cell>
        </Table.Header>
        <Table.Body
          data={items as Item[]}
          render={(item: Item) => (
            <PersonItemRow key={item.id} item={item}></PersonItemRow>
          )}
        ></Table.Body>
      </Table>
    </Box>
  );
}
