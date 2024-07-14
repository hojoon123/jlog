interface HeaderProps {
    title: string;
    userName: string;
    timeAgo: string;
    tags: string[];
  }
  
  export default function Header({ title, userName, timeAgo, tags }: HeaderProps) {
    return (
      <div>
        <h1 className="text-7xl font-bold mb-2">{title}</h1>
        <div className="mb-4 text-gray-600 py-8 flex-row gap-x-3">
          <div className='mb-8'>
            <span className="mr-2 text-lg text-black">{userName}</span>
            <span className="mr-2 px-2">{timeAgo}</span>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-green-200 px-4 py-2 rounded-full text-black">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }