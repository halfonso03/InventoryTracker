import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  itemFormSchema,
  type ItemFormData,
} from '../../form_schemas/itemSchema';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import Input from '../../ui/Input';
import { useEffect, type ChangeEvent } from 'react';
import { ItemTypes } from '../../api/data';
import { usePeople } from '../../api/hooks/usePeople';
import { useInitiative } from '../../api/hooks/useInitiative';
import { formatDate } from 'date-fns';
import { Box } from '../../ui/Box';
import Button from '../../ui/Button';
import { useInventory } from '../../api/hooks/useInventory';

type Props = {
  item: Item;
};

export default function ItemForm({ item }: Props) {
  const { people } = usePeople();
  const { initiatives } = useInitiative();
  const { createItem, updateItem } = useInventory();

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
  console.log('item', item);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(itemFormSchema),
    defaultValues: {
      id: item.id,
      serialNumber: item.serialNumber,
      description: item.description,
      computerName: item.computerName,
      hbcNumber: item.hbcNumber,
      assignedToId: item.assignedToId ?? 0,
      ipAddress: item.ipAddress,
      initiativeId: item.initiativeId ?? 0,
      cubicle_Room: item.cubicle_Room,
      itemTypeId: item.itemTypeId,
    },
  });

  const onSubmit: SubmitHandler<ItemFormData> = async (data) => {
    if (data.assignedToId === 0) data.assignedToId = null;
    if (data.initiativeId === 0) data.initiativeId = null;
    if (item.id === 0) {
      console.log('data', data);
      createItem(data);
    } else {
      updateItem(data);
    }
  };

  function resetForm() {
    reset();
  }

  function onError<ItemFormData>(errors: ItemFormData | undefined) {
    console.log('errors', errors, getValues());
  }

  useEffect(() => {}, [item.assignedToId, item.itemTypeId, setValue]);

  return (
    //onSubmit={handleSubmit(onSubmit)}
    <Form
      className="flex-col w-full"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {/* {isCreating && <div>Creating...</div>}
      {isUpdating && <div>Updating...</div>} */}
      <div className="flex w-full">
        <div className="w-2/5">
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
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const seletctedValue = e.target.value;
                if (seletctedValue == '1' || seletctedValue == '2') {
                  //  this may not be doing anything
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
                item.dateAssigned ? formatDate(item.dateAssigned, 'M/d/yy') : ''
              }
            ></Input>
          </FormRow>
          <FormRow label="Date Disposed" id="disposalDate">
            <Input
              type="text"
              disabled={true}
              id="disposalDate"
              value={
                item.disposalDate ? formatDate(item.disposalDate, 'M/d/yy') : ''
              }
            ></Input>
          </FormRow>
          <FormRow label="&nbsp;" id="">
            {item.id !== 0 && (
              <Box className="flex w-full justify-end my-4">
                <Button variation="danger" disabled={item.disposalDate != null}>
                  Move to Disposal
                </Button>
              </Box>
            )}
          </FormRow>
        </div>
      </div>

      <div className=" flex justify-between my-8 w-4/5">
        <Box className="flex gap-3">
          <Button
            variation="primary"
            children="Save"
            type="submit"
            onClick={() => trigger('itemTypeId')}
          ></Button>
          <Button variation="secondary" onClick={resetForm}>
            Cancel
          </Button>
        </Box>
      </div>
    </Form>
  );
}
