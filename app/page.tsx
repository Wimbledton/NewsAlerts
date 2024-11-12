import { Suspense } from 'react';
import NewsGrid from '@/components/news-grid';
import NewsFilters from '@/components/news-filters';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Global News Scraper</h1>
      
      <NewsFilters />
      
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <NewsGrid />
      </Suspense>
    </main>
  );
} 