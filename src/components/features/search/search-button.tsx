import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { useSearch } from '@/components/features/search/search-context';

export function SearchButton() {
  const { setSearchDialog } = useSearch();

  return (
    <div className="flex items-center space-x-1" aria-label="Search Site">
      <Button onClick={() => setSearchDialog(prevOpen => !prevOpen)} variant="ghost" size="icon">
        <span className="sr-only">Search Site</span>
        <SearchIcon className="h-8 w-8" />
      </Button>
      <span className="rounded-full bg-gray-200/20 px-2 text-[9px] text-gray-600">⌘k</span>
    </div>
  );
}
