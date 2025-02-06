import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { useSearch } from '@/components/features/search/search-context';

export function SearchButton() {
  const { setSearchDialog } = useSearch();

  return (
    <div className="flex items-center space-x-1" aria-label="Search Site">
      <Button onClick={() => setSearchDialog(prevOpen => !prevOpen)} variant="ghost" size="icon">
        <span className="sr-only">Search Site</span>
        <SearchIcon className="!h-6 !w-6" />
      </Button>
      <span className="hidden rounded-full bg-gray-200/20 px-2 text-sm text-gray-600 lg:block">⌘k</span>
    </div>
  );
}
