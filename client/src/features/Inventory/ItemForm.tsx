type Props = {
  item: Item;
};

export default function ItemForm({ item }: Props) {
  return <div>{item.description}</div>;
}
