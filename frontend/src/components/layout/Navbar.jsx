import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center bg-black text-amber-50 h-16 w-full">
      <div>
        <span className="pl-20 pr-72">* LOGO</span>
      </div>
      <div>
        <Link
          className="ml-140 mr-10 bg-linear-to-r from-white to-white bg-size-[0%_2px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_2px] "
          to="/"
        >
          Home
        </Link>
        <Link
          className="mr-10 bg-linear-to-r from-white to-white bg-size-[0%_2px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_2px]"
          to="/products"
        >
          Products
        </Link>
        <Link
          className="mr-10 bg-linear-to-r from-white to-white bg-size-[0%_2px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_2px]"
          to="/cart"
        >
          Cart
        </Link>
        <Link
          className="mr-10 bg-linear-to-r from-white to-white bg-size-[0%_2px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_2px]"
          to="/signup"
        >
          Sign up
        </Link>
        <Link
          className="bg-linear-to-r from-white to-white bg-size-[0%_2px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_2px]"
          to="/login"
        >
          Log in
        </Link>
      </div>
    </nav>
  );
}
