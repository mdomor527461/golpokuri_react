import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import Search from "./Search";
import NavItem from "./NavItem";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#fff7e6] shadow-md px-4 py-3 md:px-10 relative z-50">
      <div className="hidden md:grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Logo />
        </div>

        {/* Middle: Search */}
        <div className="flex justify-center">
          <Search />
        </div>

        {/* Right: Nav Items */}
        <div className="flex justify-between items-center">
          <NavItem />
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex justify-between items-center md:hidden">
        <Logo />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <XMarkIcon className="w-7 h-7 text-[#222]" />
          ) : (
            <Bars3Icon className="w-7 h-7 text-[#222]" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-20 left-0 w-full bg-[#fff7e6] transition-all duration-500 ease-in-out shadow-md md:hidden ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 flex gap-4 justify-center">
          <div>
            <Search />
            <div className="mt-5">
              <NavItem />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
