import { Link, useMatch, useResolvedPath } from "react-router-dom"
import AppRoutes from "../AppRoutes"
import Logo from "../components/Logo"
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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

export default function Layout(props: LayoutProps) {
  return (
    <div className="drawer lg:drawer-open">

      <input id="drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Header />
        <main className="flex flex-col items-center lg:justify-center lg:h-full p-8 lg:p-4">
          {props.children}
        </main>
      </div>

      <nav className="drawer-side">
        <label htmlFor="drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-6">
          <Logo />
          <ul className="flex flex-col gap-1 flex-1">
            {AppRoutes.map((item, index) => (
              <li key={index}>
                <RouteLink to={item.path} value={item.value} />
              </li>))}
          </ul>
          <Footer />
        </div>
      </nav>

    </div>
  )
}