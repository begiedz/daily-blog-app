import { Link } from "react-router-dom";
import AppRoutes from "../AppRoutes";

export type LayoutProps = {
  children: React.ReactNode;
};

const MenuButton = () => {
  return (
    <label htmlFor="drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-6 w-6 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </label>
  );
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* Navbar */}
        <header className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <MenuButton />
          </div>
          <div className="mx-2 flex-1 px-2">Daily Blog</div>
          <div className="hidden flex-none lg:block">

          </div>
        </header>
        {/* Page content here */}
        <main>
          {props.children}
        </main>
      </div>
      <nav className="drawer-side">
        <label htmlFor="drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {AppRoutes.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.name}</Link>
            </li>))}
        </ul>
      </nav>
    </div>
  );
}