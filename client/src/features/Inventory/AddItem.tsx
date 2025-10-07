import { useNavigate } from 'react-router-dom';
import { Box } from '../../ui/Box';
import ButtonText from '../../ui/ButtonText';
import ItemForm from './ItemForm';

export default function AddItem() {
  const navigate = useNavigate();
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
    ipAddress: '',
  };

  return (
    <>
      <Box className="text-end mb-5">
        <ButtonText onClick={() => navigate('/inventory')}>
          &larr; Back
        </ButtonText>
      </Box>
      <ItemForm item={defaultValues}></ItemForm>
    </>
  );
}
