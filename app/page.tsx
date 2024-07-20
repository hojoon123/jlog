import Footer from "@/components/footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar userId=""/>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header /> {/* Header를 빼고 여기다가 모든 사용자의 게시글을 최신 순으로 보여주는 컴포넌트를 넣어주세요. */}
      </div>

      <Footer />
    </div>
  );
}
