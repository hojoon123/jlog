interface HeaderProps {
    name: string;
    bio: string;
  }
  
  export default function Header({ name, bio }: HeaderProps) {
    return (
      <header className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <p className="text-lg text-gray-600">{bio}</p>
      </header>
    );
  }
  