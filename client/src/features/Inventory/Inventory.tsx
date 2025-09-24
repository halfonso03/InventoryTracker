import { useInventory } from '../../api/hooks/useInventory';
import ItemRow from '../Items/ItemRow';
import Table from '../../ui/Table';

export default function Inventory() {
  const { items, loadingItems } = useInventory();

  if (loadingItems) return 'Loading...';

  return (
    <Table columns=".1fr .1fr .3fr .3fr .3fr .1fr .1fr .3fr">
      <Table.Header>
        <Table.Cell>HBC #</Table.Cell>
        <Table.Cell>Type</Table.Cell>
        <Table.Cell>Serial Number</Table.Cell>
        <Table.Cell>Description</Table.Cell>
        <Table.Cell>Computer Name</Table.Cell>
        <Table.Cell>Initiative</Table.Cell>
        <Table.Cell>Cubicle/Room</Table.Cell>
        <Table.Cell>Assigned User</Table.Cell>
      </Table.Header>
      <Table.Body
        data={items as Item[]}
        render={(item: Item) => <ItemRow key={item.id} item={item}></ItemRow>}
      ></Table.Body>
    </Table>
  );
}
