import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Box } from '../../ui/Box';
import ButtonText from '../../ui/ButtonText';
import { useItem } from '../../api/hooks/useItem';
import toast from 'react-hot-toast';

export default function UpdateItem() {
  const params = useParams();
  const id = params!.id!;
  const navigate = useNavigate();

  const { item, updateItem, toggleDisposal } = useItem(+id);

  async function onToggleDisposal() {
    await toggleDisposal.mutateAsync(item!.id, {
      onSuccess: (item) => {
        if (item.disposalDate) {
          toast.success('Item moved to disposal');
        } else {
          toast.success('Item moved out of disposal');
        }
      },
    });
  }

  return (
    <>
      <Box className="text-end mb-5">
        <ButtonText onClick={() => navigate('/inventory')}>
          &larr; Back
        </ButtonText>
      </Box>
      <ItemForm
        item={item}
        submit={updateItem}
        toggleDisposal={onToggleDisposal}
      ></ItemForm>
    </>
  );
}
