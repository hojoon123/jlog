// components/SeriesSidebar.tsx
'use client';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SeriesSidebar({ userId }: { userId: string }) {
  const pathname = usePathname();
  const [series, setSeries] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSeries() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('posts')
        .select('series')
        .eq('user_id', userId)
        .not('series', 'is', null)
        .order('series', { ascending: true });

      if (error) {
        console.error('Error fetching series:', error.message);
        return;
      }

      // 중복 시리즈 제거
      const uniqueSeries = Array.from(new Set(data.map((post) => post.series)));
      setSeries(uniqueSeries);
    }

    fetchSeries();
  }, [userId]);

  return (
    <aside className="sticky top-2 w-64 p-4 rounded-lg border-r border-r-foreground/10 bg-white shadow-lg h-[calc(100vh-2.5rem)] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">시리즈</h2>
      <ul>
        {series.map((seriesName) => (
          <li key={seriesName} className="mb-2">
            <Link href={`/${userId}/series/${encodeURIComponent(seriesName)}`} className="text-blue-600 hover:underline">
              {seriesName}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
