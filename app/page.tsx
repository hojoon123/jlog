import { redirect } from 'next/navigation';

export const metadata = {
  title: "Daily JLog - 최신 트렌드와 뉴스 업데이트",
  description: "Daily JLog에서 최신 뉴스와 트렌드를 확인하세요. 가장 빠르고 정확한 정보 제공.",
  openGraph: {
    title: "Daily JLog - 최신 트렌드와 뉴스 업데이트",
    description: "Daily JLog에서 최신 뉴스와 트렌드를 확인하세요. 가장 빠르고 정확한 정보 제공.",
  },
};

export default function Page() {
  redirect(`/trend/week`);
  return null;
}