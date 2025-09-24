import { useParams } from 'react-router-dom';
import { useItem } from '../../api/hooks/useItem';
import ItemForm from './ItemForm';

export default function UpdateItem() {
  const params = useParams();
  const id = params!.id!;
  const { item, loadingItem } = useItem(+id);

  if (!item) return 'Not Found';

  if (loadingItem) return 'Loading...';

  return <ItemForm item={item}></ItemForm>;
}
