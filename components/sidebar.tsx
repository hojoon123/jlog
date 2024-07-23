'use client';

interface SidebarProps {
  headers: { id: string; text: string }[];
}

export default function Sidebar({ headers }: SidebarProps) {
  return (
    <aside className="sticky top-2 w-64 p-4 rounded-lg border-r border-r-foreground/10 bg-white shadow-lg h-[calc(100vh-2.5rem)] overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-bold mb-4">목차</h2>
      <ul>
        {headers.map((header) => (
          <li key={header.id} className="mb-2">
            <a href={`#${header.id}`} className="block text-gray-800 hover:text-blue-600 px-2 py-1 rounded transition-colors duration-200 ease-in-out hover:bg-gray-100">
              {header.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
