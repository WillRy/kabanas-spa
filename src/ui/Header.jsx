import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "./UserAvatar.jsx";

function Header() {
  return (
    <header className="flex items-center justify-end h-15 bg-white border-b border-slate-100 px-12 gap-6">
        <UserAvatar />
        <HeaderMenu />
    </header>
  );
}

export default Header;
