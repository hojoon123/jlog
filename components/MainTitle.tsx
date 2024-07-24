import getUserName from '@/app/[id]/posts/[postId]/getUserName';
import Link from 'next/link';

interface MainTitleProps {
  userId: string;
}

export default async function MainTitle({ userId }: MainTitleProps) {
  let userName = 'JLOG';

  if (userId) {
    userName = await getUserName(userId);
  }
  else {
    userId = '';
  }

  return (
    <Link href={`/${userId}`}>
      <div className="py-2 px-4 flex rounded-md no-underline bg-btn-white hover:bg-btn-background-hover border">
        <div className="flex items-center">
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
