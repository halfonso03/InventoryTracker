import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//import toast from 'react-hot-toast';

import { itemFormSchema, type ItemFormData } from '../../schemas/itemSchema';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import Input from '../../ui/Input';
import { useEffect, useState, type ChangeEvent } from 'react';
import { ItemTypes } from '../../api/data';
import { usePeople } from '../../api/hooks/usePeople';
import { useInitiative } from '../../api/hooks/useInitiative';
import { formatDate } from 'date-fns';
import { Box } from '../../ui/Box';
import Button from '../../ui/Button';
import Modal from '../../components/Modal';
// import { useItem } from '../../api/hooks/useItem';

type Props = {
  item?: Item;
  submit: (item: ItemFormData) => void;
  toggleDisposal?: () => void;
};

export default function ItemForm({ item, submit, toggleDisposal }: Props) {
  const { people } = usePeople();
  const { initiatives } = useInitiative();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (item) {
    // console.log('item', item);
  }

  const peopleOptions = people
    ? people?.map((p: Person) => ({
        value: p.id.toString(),
        text:
          p.lastName +
          ', ' +
          p.firstName +
          ' - ' +
          p.email +
          (p.extension ? ' - ' + p.extension : ''),
      }))
    : [];

  const updatedPeopleOptions = [
    { value: '0', text: 'Unassigned' },
    { value: '-1', text: 'Add User' },
    ...peopleOptions,
  ];

  const initiativeOptions = [
    { value: '0', text: 'Unassigned' },
    ...(initiatives
      ? initiatives.map((i: Initiative) => ({
          value: i.id.toString(),
          text: i.name,
        }))
      : []),
  ];

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,

    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(itemFormSchema),
    defaultValues: {
      id: item?.id,
      serialNumber: item?.serialNumber,
      description: item?.description,
      computerName: item?.computerName,
      hbcNumber: item?.hbcNumber,
      assignedToId: item?.assignedToId ?? 0,
      ipAddress: item?.ipAddress,
      initiativeId: item?.initiativeId ?? 0,
      cubicle_Room: item?.cubicle_Room,
      itemTypeId: item?.itemTypeId,
    },
  });

  const onSubmit: SubmitHandler<ItemFormData> = async (data) => {
    if (data.assignedToId === 0) data.assignedToId = null;
    if (data.initiativeId === 0) data.initiativeId = null;

    trigger('itemTypeId');

    submit(data!);
  };

  function onError<ItemFormData>(errors: ItemFormData | undefined) {
    console.log('validation errors', errors, getValues());
  }

  useEffect(() => {
    if (peopleOptions?.length > 0 && item?.assignedToId) {
      setValue('assignedToId', item.assignedToId);
    }
    if (initiativeOptions?.length > 0 && item?.initiativeId) {
      setValue('initiativeId', item.initiativeId);
    }
  }, [initiativeOptions?.length, item, peopleOptions?.length, setValue]);

  if (!item) return;

  return (
    <div>
      <Form
        className="flex-col w-full"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="flex w-full">
          <div className="w-2/5">
            <FormRow label="Id" id="Item Id">
              <Input
                readOnly
                value={item.id}
                {...register('id')}
                disabled
              ></Input>
            </FormRow>
            <FormRow
              label="Type"
              id="itemTypeId"
              error={errors?.itemTypeId?.message}
            >
              <Select
                {...register('itemTypeId')}
                id="itemTypeId"
                type="dark"
                options={ItemTypes}
                additionalClassnames={
                  errors?.itemTypeId?.message ? ' error' : ''
                }
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  const seletctedValue = e.target.value;
                  setValue('itemTypeId', seletctedValue);
                  trigger('itemTypeId');
                  if (touchedFields.computerName) {
                    trigger('computerName');
                  }
                }}
              ></Select>
            </FormRow>
            <FormRow
              label="HBC Number"
              id="hbcNumber"
              error={errors?.hbcNumber?.message}
            >
              <Input
                type="text"
                id="hbcNumber"
                defaultValue={item.hbcNumber}
                className={
                  ' form-element ' +
                  (errors?.hbcNumber?.message ? ' error ' : '')
                }
                {...register('hbcNumber')}
              ></Input>
            </FormRow>
            <FormRow
              label="Serial No"
              id="serialNumber"
              error={errors?.serialNumber?.message}
            >
              <Input
                type="text"
                id="serialNumber"
                defaultValue={item.serialNumber}
                {...register('serialNumber')}
              ></Input>
            </FormRow>
            <FormRow
              label="Description"
              id="description"
              error={errors?.description?.message}
            >
              <Input
                type="text"
                id="description"
                defaultValue={item.description}
                {...register('description')}
                className={
                  ' form-element ' +
                  (errors?.description?.message ? ' error ' : '')
                }
              ></Input>
            </FormRow>
            <FormRow
              label="Computer Name"
              id="computerName"
              error={errors?.computerName?.message}
            >
              <Input
                type="text"
                id="location"
                defaultValue={item.computerName}
                {...register('computerName')}
                className={
                  ' form-element ' +
                  (errors?.computerName?.message ? ' error ' : '')
                }
              ></Input>
            </FormRow>
            <FormRow label="IP Address" id="ipAddress">
              <Input
                type="text"
                id="ipAddress"
                defaultValue={item.ipAddress}
                {...register('ipAddress')}
              ></Input>
            </FormRow>
          </div>
          <div className="w-2/5">
            <FormRow label="Initiative" id="initiativeId">
              <Select
                {...register('initiativeId')}
                id="initiativeId"
                type="dark"
                options={initiativeOptions}
              ></Select>
            </FormRow>
            <FormRow
              label="Cubicle / Room"
              id="cubicle_Room"
              error={errors?.cubicle_Room?.message}
            >
              <Input
                type="text"
                id="cubicle_Room"
                defaultValue={item.cubicle_Room}
                {...register('cubicle_Room')}
              ></Input>
            </FormRow>
            <FormRow label="Assigned To" id="assignedToId">
              <Select
                {...register('assignedToId')}
                id="assignedToId"
                type="dark"
                options={updatedPeopleOptions}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  const seletctedValue = +e.target.value;
                  if (seletctedValue === -1) {
                    setIsModalOpen(true);
                  }
                }}
              ></Select>
            </FormRow>
            {item.id != 0 && (
              <FormRow label="Date Created" id="dateCreated">
                <Input
                  type="text"
                  disabled={true}
                  id="dateCreated"
                  value={
                    item.createdOn ? formatDate(item.createdOn, 'M/d/yy') : ''
                  }
                ></Input>
              </FormRow>
            )}
            <FormRow label="Date Assigned" id="dateAssigned">
              <Input
                type="text"
                disabled={true}
                id="dateAssigned"
                value={
                  item.dateAssigned
                    ? formatDate(item.dateAssigned, 'M/d/yy')
                    : ''
                }
              ></Input>
            </FormRow>
            <FormRow label="Date Disposed" id="disposalDate">
              <Input
                type="text"
                disabled={true}
                id="disposalDate"
                value={
                  item.disposalDate
                    ? formatDate(item.disposalDate, 'M/d/yy')
                    : ''
                }
              ></Input>
            </FormRow>
            {item.id != 0 && (
              <FormRow label="&nbsp;" id="">
                <Box className="flex w-full justify-end my-4">
                  <Button
                    variation="danger"
                    type="button"
                    className="w-[15rem]"
                    // disabled={toggleDisposal.isPending}
                    onClick={toggleDisposal}
                  >
                    {item.itemStatusId == 4
                      ? 'Remove from Disposal'
                      : 'Move to Disposal'}
                  </Button>
                </Box>
              </FormRow>
            )}
          </div>
        </div>

        <div className=" flex justify-between my-8 w-4/5">
          <Box className="flex gap-3">
            <Button variation="primary" children="Save" type="submit"></Button>
          </Box>
        </div>
      </Form>
      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New User"
        >
          <Form className="flex-col w-full text-gray-50">
            <FormRow id="firstName" label="First Name">
              <Input id="firstName"></Input>
            </FormRow>
            <FormRow id="lastName" label="Last Name">
              <Input id="lastName"></Input>
            </FormRow>
            <FormRow id="email" label="Email">
              <Input id="email"></Input>
            </FormRow>
            <FormRow id="extension" label="Extension">
              <Input id="extension"></Input>
            </FormRow>
            <FormRow label=" " id="none">
              <Box className="flex gap-2 justify-end my-2">
                <Button variation="primary" content="Save">
                  Save
                </Button>
                <Button
                  variation="secondary"
                  content="Cancel"
                  type="button"
                  onClick={() => {
                    setValue('assignedToId', 0);
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </FormRow>
          </Form>
        </Modal>
      )}
    </div>
  );
}
