const MenuButton = () => {
  return (
    <label
      htmlFor="drawer"
      aria-label="open sidebar"
      className="btn btn-square btn-ghost"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-6 w-6 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </label>
  )
}

export default function Header() {
  return (
    <header className="navbar bg-base-300 w-full lg:hidden">
      <div className="flex-none lg:hidden">
        <MenuButton />
      </div>
      <div className="hidden flex-none lg:block"></div>
    </header>
  )
}
