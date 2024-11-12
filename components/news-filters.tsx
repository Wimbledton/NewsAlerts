'use client';

import { useState } from 'react';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  // Add more countries as needed
];

export function NewsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [dateRange, setDateRange] = useState({
    from: searchParams.get('from') || format(new Date(), 'yyyy-MM-dd'),
    to: searchParams.get('to') || format(new Date(), 'yyyy-MM-dd')
  });

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (country) params.set('country', country);
    if (dateRange.from) params.set('from', dateRange.from);
    if (dateRange.to) params.set('to', dateRange.to);
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 mb-8">
      <Select
        value={country}
        onValueChange={setCountry}
        items={COUNTRIES}
        placeholder="Select country"
      />
      
      <input
        type="date"
        value={dateRange.from}
        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
        className="border rounded p-2"
      />
      
      <input
        type="date"
        value={dateRange.to}
        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
        className="border rounded p-2"
      />
      
      <Button onClick={handleFilter}>Apply Filters</Button>
    </div>
  );
} 