'use client';

import { useRouter } from 'next/navigation'; // Next.js 14의 새로운 라우팅 시스템 사용
import { useEffect, useState } from 'react';

const PeriodSelector = ({ currentPeriod }: { currentPeriod: string }) => {
  const router = useRouter();
  const [period, setPeriod] = useState(currentPeriod);

  useEffect(() => {
    setPeriod(currentPeriod); // 페이지가 로드될 때 currentPeriod 값을 설정
  }, [currentPeriod]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = e.target.value;
    router.push(`/trend/${newPeriod}`); // 새로운 URL로 리다이렉트
  };

  return (
    <div className="flex justify-end mb-4">
      <select value={period} onChange={handleChange} className="border p-2 rounded">
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
    </div>
  );
};

export default PeriodSelector;
