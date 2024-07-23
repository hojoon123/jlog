import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import TabButtons from '@/components/tabButtons';
import getUserData from './getUserNameBio';
import MarkdownContent from './markdownContent';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = params;
  const userData = await getUserData(id);
  const { name, bio } = userData;

  return {
    title: `${name} - About`,
    description: bio,
    openGraph: {
      title: `${name} - About`,
      description: bio,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} - About`,
      description: bio,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const userData = await getUserData(id);
  const { name, bio } = userData;

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <Navbar userId={id} />
      <TabButtons userId={id} />
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mb-4">
          <h1 className="text-4xl font-bold mb-2 py-4 underline underline-offset-8">{name}</h1>
          <MarkdownContent bio={bio} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
