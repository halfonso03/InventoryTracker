type Props = {
  person: Person;
};

export default function PersonForm({ person }: Props) {
  return <div>{person.firstName}</div>;
}
