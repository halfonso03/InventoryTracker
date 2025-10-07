import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Form from '../../ui/Form';

export default function TestForm() {
  type Item = {
    itemTypeId: number | null;
  };

  const itemFormValue: Item = {
    itemTypeId: null,
  };

  interface FormValues {
    itemTypeId?: number;
  }

  const defaultvalues = {
    itemTypeId: itemFormValue.itemTypeId,
  };

  const validationSchema = Yup.object().shape({
    itemTypeId: Yup.number().required().not(['0', 0, '', null, undefined]),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
    defaultValues: defaultvalues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form className="flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      <input {...register('itemTypeId')}></input>
      {errors.itemTypeId && (
        <div>{errors!.itemTypeId!.message?.toString()}</div>
      )}
    </Form>
  );
}
