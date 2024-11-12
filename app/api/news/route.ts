import { NextResponse } from 'next/server';
import { z } from 'zod';

const newsQuerySchema = z.object({
  country: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = newsQuerySchema.parse(Object.fromEntries(searchParams));

    const response = await fetch('https://api.newscatcherapi.com/v2/search', {
      headers: {
        'x-api-key': process.env.NEWSCATCHER_API_KEY as string,
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
} 