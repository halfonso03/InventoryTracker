import { useParams } from 'react-router-dom';
import { usePerson } from '../../api/hooks/usePerson';
import { Box } from '../../ui/Box';
import PersonItems from './PersonItems';
import PersonForm from './PersonForm';

export default function PersonDetails() {
  const params = useParams();
  const id = params.id!;

  const { person, loadingPerson } = usePerson(+id);

  if (loadingPerson) return 'Loading...';

  if (!id) return <div>Not Found</div>;

  return (
    <Box className="flex justify-center gap-4 w-full border-2 border-amber-500">
      <Box className="border-2 border-amber-800 w-[65%]">
        <PersonForm person={person}></PersonForm>
        <PersonItems items={person?.items}></PersonItems>

      </Box>

    </Box>
  );
}
