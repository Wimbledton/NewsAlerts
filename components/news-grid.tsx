'use client';

import { useQuery } from '@tanstack/react-query';
import { NewsArticle } from '@/app/types/news';
import { Card } from './ui/card';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

async function fetchNews(params: URLSearchParams) {
  const response = await fetch(`/api/news?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

export default function NewsGrid() {
  const searchParams = useSearchParams();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['news', searchParams.toString()],
    queryFn: () => fetchNews(searchParams),
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading news</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.articles.map((article: NewsArticle) => (
        <Card key={article.link} className="overflow-hidden">
          {article.media && (
            <div className="relative h-48">
              <Image
                src={article.media}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-2">{article.excerpt}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{article.clean_url}</span>
              <span>{new Date(article.published_date).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 