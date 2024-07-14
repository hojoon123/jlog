import AuthButton from './AuthButton';
import MainTitle from './MainTitle';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white shadow-md">
      <div className="w-full max-w-7xl flex justify-between items-center p-3 text-s">
        <MainTitle />
        <AuthButton />
      </div>
    </nav>
  );
}