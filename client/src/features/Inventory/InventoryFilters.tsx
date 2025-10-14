import { usePagination } from '../../app/contexts/usePagination';
import Search from '../../components/Search';
import Button from '../../ui/Button';
import Header from '../../ui/Header';

type Props = {
  itemStatusFilter: string;
  setItemStatusFilter: (status: string) => void;
};

export default function InventoryFilters({
  itemStatusFilter,
  setItemStatusFilter,
}: Props) {
  const { setSearchTerm } = usePagination();

  return (
    <>
      <div className="flex justify-between w-full my-4">
        <div className="w-1/4">&nbsp;</div>
        <div className="w-1/2 flex justify-center gap-3">
          <Button
            variation="secondary"
            className="self-start"
            selected={itemStatusFilter === ''}
            onClick={() => setItemStatusFilter('')}
          >
            All
          </Button>
          <Button
            variation="secondary"
            className="self-start"
            selected={itemStatusFilter === '2'}
            onClick={() => setItemStatusFilter('2')}
          >
            Assigned
          </Button>
          <Button
            className="self-start"
            variation="secondary"
            selected={itemStatusFilter === '1'}
            onClick={() => setItemStatusFilter('1')}
          >
            Unassigned
          </Button>
          <Button
            variation="secondary"
            className="self-start"
            selected={itemStatusFilter === '3'}
            onClick={() => setItemStatusFilter('3')}
          >
            TDB
          </Button>
          <Button
            variation="secondary"
            className="self-start"
            selected={itemStatusFilter === '4'}
            onClick={() => setItemStatusFilter('4')}
          >
            Disposal
          </Button>
        </div>
        <div className="w-1/4">
          <Search onSearch={setSearchTerm} />
        </div>
      </div>
    </>
  );
}
