import { createClient } from "@/utils/supabase/server";
import { format } from 'date-fns';

interface Page {
    url: string;
    date_modified: string;
  }

// Supabase에서 데이터를 가져오는 함수
async function getPages() {
  const supabase = createClient();
  const { data: pages, error } = await supabase
    .from('posts')
    .select('url, date_modified')
    .eq('noindex', false)
    .not('date_published', 'is', null)
    .order('date_modified', { ascending: false });

  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }

  return pages || [];
}

// Sitemap을 생성하는 함수
function generateSitemap(pages: Page[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(page => {
          return `<url>
            <loc>${page.url}</loc>
            <lastmod>${format(new Date(page.date_modified), 'yyyy-MM-dd')}</lastmod>
          </url>`;
        })
        .join('')}
    </urlset>`;
}

// Route Handler
export async function GET() {
  const pages = await getPages();
  const sitemap = generateSitemap(pages);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml'
    }
  });
}