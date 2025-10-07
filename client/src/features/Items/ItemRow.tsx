import { useNavigate } from 'react-router-dom';
import Table from '../../ui/Table';
import { formatDate } from 'date-fns';

type Props = {
  item: Item;
};

export default function ItemRow({ item }: Props) {
  const navigate = useNavigate();

  function gotoPerson(assignedToId: number | undefined) {
    if (!assignedToId) return;
    navigate(`/person/${assignedToId}`);
  }

  function gotoItem(id: number) {
    navigate(`/inventory/${id}`);
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
      <div
        className="cursor-pointer text-center"
        onClick={() => gotoItem(item.id)}
      >
        {item.cubicle_Room}
      </div>
      <div
        className="cursor-pointer text-center"
        onClick={() => gotoItem(item.id)}
      >
        <div>
          {item.dateAssigned && formatDate(item.dateAssigned, 'M/d/yy')}
        </div>
      </div>
      <div
        className="border-gray-900 cursor-pointer"
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
      <div>{item.ipAddress}</div>
      <div
        className={`text-center ${
          item.itemStatusId == 3 ? 'text-yellow-600' : ''
        }`}
      >
        {item.itemStatusId == 3
          ? item.itemStatus
          : item.itemStatus.substring(0, 1)}
      </div>
    </Table.Row>
  );
}
