import AppRoutes from '../routes/AppRoutes'
import { filteredRoutes } from '../routes/utils'
import { authStore } from '../store/authStore'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

import Logo from '../components/Logo'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Profile from '../components/Profile'

import { useState } from 'react'
import clsx from 'clsx'
import { useStore } from '@tanstack/react-store'

type TLayoutProps = {
  children: React.ReactNode
}

interface IRouteLink {
  to: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const NavLink = ({ to, children, className, onClick }: IRouteLink) => {
  const resolvedPath = useResolvedPath(to)
  const isCurrentUrl = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <Link
      to={to}
      onClick={() => onClick && onClick()}
      className={clsx(className, { 'bg-base-300': isCurrentUrl })}
    >
      {children}
    </Link>
  )
}

export default function Layout(props: TLayoutProps) {
  const [isChecked, setIsChecked] = useState(false)
  const user = useStore(authStore, state => state.user)
  return (
    <aside className="drawer lg:drawer-open">
      <input
        id="drawer"
        type="checkbox"
        className="drawer-toggle"
        onChange={event => setIsChecked(event.currentTarget.checked)}
        checked={isChecked}
      />

      <div className="drawer-content">
        <Header />
        <main className="flex flex-col items-center lg:justify-center lg:h-full p-8 lg:p-4">
          {props.children}
        </main>
      </div>

      <nav className="drawer-side">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-6">
          <Logo />
          <ul className="flex flex-col gap-1 flex-1">
            {filteredRoutes({
              routes: AppRoutes,
              user,
              options: { onlyVisible: true },
            }).map((route, index) => (
              <li key={index}>
                <NavLink
                  to={route.path}
                  onClick={() => setIsChecked(false)}
                >
                  {route.value}
                </NavLink>
              </li>
            ))}
          </ul>
          <Profile setIsChecked={() => setIsChecked(false)} />
          <Footer />
        </div>
      </nav>
    </aside>
  )
}
