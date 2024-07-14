import Link from 'next/link';
import { createClient } from '../utils/supabase/server';

export default async function MainTitle() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  console.log(user)
  let userName = 'JLOG';
  let userId = '';

  if (user) {
    const emailPrefix = user.email?.split('@')[0]; // @ 이전 부분을 추출합니다.
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', emailPrefix) // user.email의 @ 이전 부분과 비교합니다.
      .single();
    
    if (profile) {
      userName = profile.name || 'JLOG';
      userId = emailPrefix || '';
    }
  }

  return (
    <Link href={`/${userId}`}>
      <div className="py-2 px-4 flex rounded-md no-underline hover:bg-btn-background-hover border">
        <div className="flex items-center"> {/* div의 크기를 키우기 위해 추가 */}
          <svg
            aria-label="Vercel logomark"
            role="img"
            viewBox="0 0 74 64"
            className="h-8 w-8 mr-2"
          >
            <path
              d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
              fill="currentColor"
            ></path>
          </svg>
          {userName} blog
        </div>
      </div>
    </Link>
  );
}
