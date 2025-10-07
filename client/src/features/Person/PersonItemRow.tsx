import { useState } from 'react';
import Table from '../../ui/Table';
import { BsFillXSquareFill } from 'react-icons/bs';
import { HiCheckCircle, HiTrash } from 'react-icons/hi2';
import { formatDate } from 'date-fns';

type Props = {
  item: Item;
};

export default function PersonItemRow({ item }: Props) {
  const [confirmingUnassign, setConfirmUnassign] = useState(false);

  function confirmUnassign() {
    setConfirmUnassign(true);
  }

  function unassignItem() {}

  return (
    <Table.Row>
      <div>{item.hbcNumber}</div>
      <div>{item.itemType}</div>
      <div>{item.serialNumber}</div>
      <div>{item.description}</div>
      <div>{item.computerName}</div>
      <div>{item.initiative}</div>
      <div>{item.dateAssigned && formatDate(item.dateAssigned, 'M/d/yy')}</div>
      <div>{item.cubicle_Room}</div>
      <div className="cursor-pointer text-center ">
        {confirmingUnassign ? (
          <div className="flex justify-center w-full gap-2 align-baseline">
            <div
              className="flex justify-center align-middle text-xl text-green-500"
              onClick={unassignItem}
            >
              <HiCheckCircle></HiCheckCircle>
            </div>
            <div className="mx-1"></div>
            <div onClick={() => setConfirmUnassign(false)}>
              <BsFillXSquareFill className="text-red-500 text-lg  "></BsFillXSquareFill>
            </div>
          </div>
        ) : (
          <div
            onClick={() => confirmUnassign()}
            className="text-yellow-500 text-xl w-full flex justify-center"
          >
            <HiTrash></HiTrash>
          </div>
        )}
      </div>
    </Table.Row>
  );
}
