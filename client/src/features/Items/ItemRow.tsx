import { useNavigate } from 'react-router-dom';
import Table from '../../ui/Table';
import { formatDate } from 'date-fns';
import type { SyntheticEvent } from 'react';

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
    <Table.Row onClick={() => gotoItem(item.id)}>
      <div className="cursor-pointer">{item.id}</div>
      <div className="cursor-pointer">{item.hbcNumber}</div>
      <div className="cursor-pointer">{item.itemType}</div>
      <div className="cursor-pointer">{item.serialNumber}</div>
      <div className="cursor-pointer">{item.description}</div>
      <div className="cursor-pointer">{item.computerName}</div>
      <div className="cursor-pointer">{item.initiative}</div>
      <div className="cursor-pointer text-center">{item.cubicle_Room}</div>
      <div className="cursor-pointer text-center">
        <div>
          {item.dateAssigned && formatDate(item.dateAssigned, 'M/d/yy')}
        </div>
      </div>
      <div
        className="border-gray-900 cursor-pointer"
        onClick={(e: SyntheticEvent<HTMLDivElement>) => {
          e.stopPropagation();
          gotoPerson(item.assignedToId);
        }}
      >
        {item.assignedTo && (
          <div>
            <div>{item.assignedTo}</div>
          </div>
        )}
      </div>
      <div className="cursor-pointer text-center">{item.ipAddress}</div>
      <div
        className={`cursor-pointer text-center ${
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
