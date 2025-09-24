import { useNavigate } from 'react-router-dom';
import Table from '../../ui/Table';

type Props = {
  item: Item;
};

export default function ItemRow({ item }: Props) {
  const navigate = useNavigate();

  function gotoPerson(assignedToId: number) {
    navigate(`/person/${assignedToId}`);
  }

  function gotoItem(id: number) {
    navigate(`${id}`);
  }

  return (
    <Table.Row>
      <div className="cursor-pointer" onClick={() => gotoItem(item.id)}>
        {item.hbcNumber}
      </div>
      <div className="cursor-pointer" onClick={() => gotoItem(item.id)}>
        {item.itemType}
      </div>
      <div className="cursor-pointer" onClick={() => gotoItem(item.id)}>
        {item.serialNumber}
      </div>
      <div className="cursor-pointer" onClick={() => gotoItem(item.id)}>
        {item.description}
      </div>
      <div className="cursor-pointer" onClick={() => gotoItem(item.id)}>
        {item.computerName}
      </div>
      <div className="cursor-pointer" onClick={() => gotoItem(item.id)}>
        {item.initiative}
      </div>
      <div className="cursor-pointer" onClick={() => gotoItem(item.id)}>
        {item.cubicle_Room}
      </div>
      <div
        className="border-l-2 pl-4 border-gray-700 cursor-pointer"
        onClick={() => gotoPerson(item.assignedToId)}
      >
        {item.assignedTo && (
          <div>
            <div>{item.assignedTo}</div>
            <div>{item.assignedToEmail}</div>
            <div>{item.assignedToExtension}</div>
          </div>
        )}
      </div>
    </Table.Row>
  );
}
