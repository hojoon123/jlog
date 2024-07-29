import { createClient } from "@/utils/supabase/server";
import { format } from 'date-fns';

// Supabase에서 데이터를 가져오는 함수
async function getPages() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('user_id, id, created_at')
    .not('created_at', 'is', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }

  return data;
}

// Sitemap을 생성하는 함수
function generateSitemap(pages: any[]) {
  if (pages.length === 0) {
    console.warn("No pages found for sitemap generation.");
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(page => {
          return `<url>
            <loc>https://www.dailyjlog.com/${page.user_id}/posts/${page.id}</loc>
            <lastmod>${format(new Date(page.created_at), 'yyyy-MM-dd')}</lastmod>
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