import { Link, useMatch, useResolvedPath } from "react-router-dom"
import AppRoutes from "../AppRoutes"
import Logo from "../components/Logo"
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useState } from "react";

export type TLayoutProps = {
  children: React.ReactNode;
}

interface IRouteLink {
  to: string
  value: string
  className?: string
  onClick?: () => void
}


const RouteLink = ({ to, value, className, onClick }: IRouteLink) => {
  const resolvedPath = useResolvedPath(to);
  const isCurrentUrl = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <Link to={to} className={[className, isCurrentUrl && "bg-base-300"].filter(Boolean).join(" ")} onClick={() => onClick && onClick()}>{value}</Link>
  )
}

export default function Layout(props: TLayoutProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <aside className="drawer lg:drawer-open">

      <input
        id="drawer"
        type="checkbox"
        className="drawer-toggle"
        onChange={(event) => setIsChecked(event.currentTarget.checked)}
        checked={isChecked}
      />

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
              item.includeInMenu !== false &&
              <li key={index}>
                <RouteLink to={item.path} value={item.value} onClick={() => setIsChecked(false)} />
              </li>))}
          </ul>
          <div>Not logged in</div>
          <RouteLink to={'/login'} value="Login" className="btn btn-primary" />
          <Footer />
        </div>
      </nav>

    </aside>
  )
}