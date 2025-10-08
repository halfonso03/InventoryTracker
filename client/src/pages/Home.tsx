import { useInventory } from '../api/hooks/useInventory';

export default function Home() {
  const { itemResults, loadingItems } = useInventory();

  if (loadingItems) return 'Loading...';

  console.log('items.length', itemResults?.items.length);
  return <div>Home</div>;
}
