// components/Tabs.tsx
import Link from 'next/link';

type TabsProps = {
  activeTab: string;
};

const Tabs = ({ activeTab }: TabsProps) => {
  return (
    <div className="flex justify-center space-x-4 border-b-2 border-gray-200 py-2">
      <Link href="/trend" passHref>
        <div className={`cursor-pointer py-2 px-4 ${activeTab === 'trend' ? 'border-b-2 border-black font-semibold text-gray-900' : 'text-gray-500'}`}>
          트렌드
        </div>
      </Link>
      <Link href="/latest" passHref>
        <div className={`cursor-pointer py-2 px-4 ${activeTab === 'latest' ? 'border-b-2 border-black font-semibold text-gray-900' : 'text-gray-500'}`}>
          최신
        </div>
      </Link>
    </div>
  );
};

export default Tabs;
