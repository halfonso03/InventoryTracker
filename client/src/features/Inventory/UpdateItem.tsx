import { useNavigate, useParams } from 'react-router-dom';
import { useItem } from '../../api/hooks/useItem';
import ItemForm from './ItemForm';
import { Box } from '../../ui/Box';
import ButtonText from '../../ui/ButtonText';

export default function UpdateItem() {
  const params = useParams();
  const id = params!.id!;
  const { item, loadingItem } = useItem(+id);
  const navigate = useNavigate();

  if (!item) return 'Not Found';

  if (loadingItem) return 'Loading...';

  return (
    <>
      <Box className="text-end mb-12">
        <ButtonText onClick={() => navigate('/inventory')}>
          &larr; Back
        </ButtonText>
      </Box>
      <ItemForm item={item}></ItemForm>
    </>
  );
}
