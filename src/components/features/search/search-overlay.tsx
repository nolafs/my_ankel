'use client';
import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchInput } from '@/components/features/search/search-input';
import { useSearch } from '@/components/features/search/search-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SearchOverlay() {
  const { openSearchDialog, setSearchDialog } = useSearch();

  // Function to close search safely
  const handleClose = useCallback(() => {
    setTimeout(() => setSearchDialog(false), 0); // ✅ Delays state update until after render
  }, [setSearchDialog]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchDialog(open => !open);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openSearchDialog, handleClose]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm transition-opacity',
        openSearchDialog ? 'visible opacity-100' : 'invisible opacity-0',
      )}
      onClick={handleClose} // ✅ Uses a safe function for closing
    >
      {openSearchDialog && (
        <div
          className={cn(
            'fixed inset-0 flex items-center justify-center transition-transform',
            openSearchDialog ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0',
          )}
          onClick={e => e.stopPropagation()} // ✅ Prevent closing when clicking inside
        >
          <Button onClick={handleClose} className="absolute right-4 top-4 z-50" variant={'default'} size={'icon'}>
            <X className="size-8" />
          </Button>
          <ScrollArea className={'absolute h-full w-full'}>
            {/* Search Input */}
            <SearchInput isSearchPage={false} />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
