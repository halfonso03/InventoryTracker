import { useInventory } from '../api/hooks/useInventory';

export default function Home() {
  const { items, loadingItems } = useInventory();

  if (loadingItems) return 'Loading...';

  console.log('items.length', items);
  return <div>Home</div>;
}
