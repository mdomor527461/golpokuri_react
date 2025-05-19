import Logo from "./Logo";
import NavItem from "./NavItem";
import Search from "./Search";

export default function Navbar(){
    return (
        <div className="flex justify-between items-center bg-white/70 shadow-md p-4">
            <Logo />
            <Search />
            <NavItem />
        </div>
    )
}