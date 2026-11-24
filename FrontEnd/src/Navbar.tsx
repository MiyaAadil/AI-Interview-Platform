import { Link } from "react-router-dom";
import type { User } from "./types";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => (
  <nav className="mx-auto flex h-[72px] w-[min(1180px,calc(100%-40px))] items-center justify-between border-b border-[#e9e8e0] sm:h-[88px] sm:w-[min(1180px,calc(100%-64px))]" aria-label="Main navigation">
    <Link to="/" className="inline-flex items-center gap-2.5 font-[Manrope] text-xl font-extrabold tracking-[-1px] text-[#20251f] no-underline" aria-label="Prepwise home">
      <img className="size-8 object-contain" src="/interview-prep-logo.svg" alt="" aria-hidden="true" />
      <span>prepwise</span>
    </Link>
    {user ? (
      <div className="flex items-center gap-4 sm:gap-[30px]">
        <span className="text-[11px] font-semibold text-[#74776f] sm:text-xs">{user.username}</span>
        <button className="border-0 bg-red-200 py-1 px-2.5 text-sm font-bold text-[#343a31] sm:text-[13px] rounded-lg cursor-pointer" onClick={onLogout}>Log out</button>
      </div>
    ) : (
      <div className="flex items-center gap-4 sm:gap-[30px]">
        <Link className="text-xs font-semibold text-[#20251f] no-underline hover:opacity-65 sm:text-[13px]" to="/login">Log in</Link>
        <Link className="inline-flex min-h-[38px] items-center justify-center gap-3.5 rounded-lg bg-[#222821] px-3 text-[11px] font-bold !text-white no-underline transition hover:bg-[#364131] sm:min-h-[42px] sm:px-4 sm:text-xs" to="/signup">Get started <span aria-hidden="true">↗</span></Link>
      </div>
    )}
  </nav>
);

export default Navbar;
