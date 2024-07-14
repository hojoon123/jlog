import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id: userId } = params;
  redirect(`/${userId}/posts`);
  return userId;
}