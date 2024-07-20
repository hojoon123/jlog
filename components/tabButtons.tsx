'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: '글', href: 'posts' },
  { name: '시리즈', href: 'series' },
  { name: '소개', href: 'about' },
];

export default function TabButtons({ userId }: { userId: string }) {
  const pathname = usePathname();

  return (
    <div className="flex space-x-4 text-2xl">
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.href);
        return (
          <Link
            key={tab.name}
            href={`/${userId}/${tab.href}`}
            className={`px-4 py-2 rounded ${
              isActive ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500'
            } hover:bg-green-200`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}