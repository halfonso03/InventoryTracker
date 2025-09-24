import ItemForm from './ItemForm';

export default function AddItem() {
  const defaultValues: Item = {
    id: 0,
    description: '',
    createdOn: new Date(),
    hbcNumber: '',
    computerName: '',
    serialNumber: '',
    initiativeId: 0,
    assignedToId: 0,
    itemTypeId: 0,
    itemType: '',
  };

  return <ItemForm item={defaultValues}></ItemForm>;
}
