import { Link, useMatch, useResolvedPath } from "react-router-dom"
import AppRoutes from "../AppRoutes"
import Logo from "../components/Logo"

export type LayoutProps = {
  children: React.ReactNode;
}

interface IRouteLink {
  to: string
  value: string
  className?: string
}

const RouteLink = ({ to, value, className }: IRouteLink) => {
  const resolvedPath = useResolvedPath(to);
  const isCurrentUrl = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <Link to={to} className={` ${className} ${isCurrentUrl && `bg-base-300`}`}>{value}</Link>
  )
}

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
  )
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* Navbar */}
        <header className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <MenuButton />
          </div>
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
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-6">
          <Logo />
          <ul className="flex flex-col gap-1">
            {AppRoutes.map((item, index) => (
              <li key={index}>
                <RouteLink to={item.path} value={item.value} />
              </li>))}
          </ul>
        </div>
      </nav>
    </div>
  )
}