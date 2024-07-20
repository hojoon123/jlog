// [id]/series/page.tsx
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import TabButtons from '@/components/tabButtons';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

async function getSeries(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('series')
    .eq('user_id', userId)
    .not('series', 'is', null)
    .order('series', { ascending: true });

  if (error) throw new Error(error.message);

  // 중복 시리즈 제거
  const uniqueSeries = Array.from(new Set(data.map((post) => post.series)));

  return uniqueSeries;
}

export default async function Page({ params }: PageProps) {
  const { id: userId } = params;
  const series = await getSeries(userId);

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <Navbar userId={userId} />
      <TabButtons userId={userId} />
      <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mb-4">
        <h1 className="text-4xl font-bold mb-4">Series</h1>
        <ul>
          {series.map((seriesName) => (
            <li key={seriesName} className="mb-2">
              <Link href={`/${userId}/series/${encodeURIComponent(seriesName)}`} className="text-blue-600 hover:underline">
                {seriesName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
