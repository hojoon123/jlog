import { notFound, redirect } from 'next/navigation';
import getUserNameIntro from './posts/getUserNameIntro';


interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id: userId } = params;

  // 유저 존재 여부 확인
  const userData = await getUserNameIntro(userId);

  if (!userData) {
    // 유저가 존재하지 않을 경우 404 페이지로 이동
    notFound();
  } else {
    // 유저가 존재할 경우 리다이렉트
    redirect(`/${userId}/posts`);
  }

  return null;
}
