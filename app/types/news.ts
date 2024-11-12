export interface NewsArticle {
  title: string;
  author: string | null;
  published_date: string;
  link: string;
  clean_url: string;
  excerpt: string;
  summary: string;
  country: string;
  language: string;
  media: string;
  topic: string;
}

export interface NewsResponse {
  status: string;
  total_hits: number;
  page: number;
  total_pages: number;
  page_size: number;
  articles: NewsArticle[];
} 