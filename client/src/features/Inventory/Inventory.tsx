import { useInventory } from '../../api/hooks/useInventory';
import ItemRow from '../Items/ItemRow';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import Header from '../../ui/Header';
import { useNavigate } from 'react-router-dom';

export default function Inventory() {
  const { items, loadingItems } = useInventory();
  const navigate = useNavigate();

  if (loadingItems) return 'Loading...';
  return (
    <>
      <Header>
        <div className="flex justify-between">
          <div></div>
          <div>
            <Button
              variation="primary"
              onClick={() => navigate('/inventory/new')}
            >
              Add Inventory Item
            </Button>
          </div>
        </div>
      </Header>

      <Table columns=".1fr .13fr .3fr .3fr .3fr .1fr .16fr .15fr .25fr .14fr .08fr">
        <Table.Header>
          <Table.Cell>HBC #</Table.Cell>
          <Table.Cell>Type</Table.Cell>
          <Table.Cell>Serial Number</Table.Cell>
          <Table.Cell>Description</Table.Cell>
          <Table.Cell>Computer Name</Table.Cell>
          <Table.Cell>Initiative</Table.Cell>
          <Table.Cell align="center">Cubicle/Room</Table.Cell>
          <Table.Cell>Date Assigned</Table.Cell>
          <Table.Cell>Assigned User</Table.Cell>
          <Table.Cell>IP Address</Table.Cell>
          <Table.Cell align="center">Status</Table.Cell>
        </Table.Header>
        <Table.Body
          data={items as Item[]}
          render={(item: Item) => <ItemRow key={item.id} item={item}></ItemRow>}
        ></Table.Body>
      </Table>
    </>
  );
}
