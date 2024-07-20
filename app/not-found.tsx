export const metadata = {
  title: "Not Found",
}

export default function NotFound() {  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">죄송합니다. 페이지를 찾지 못하였습니다.</p>
        <a href="/" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            돌아가기
        </a>
      </div>
    </div>
  );
}