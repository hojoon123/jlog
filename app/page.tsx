import { redirect } from 'next/navigation';

export default function Page() {
  redirect(`/trend/week`);
  return null;
}