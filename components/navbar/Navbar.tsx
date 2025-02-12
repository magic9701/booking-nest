import LinksDropdown from "./LinksDropdown"
import Logo from "./Logo"
import NavSearch from "./NavSearch"

function Navbar() {

  return (
    <nav>
      <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-6">
        <Logo />
        <NavSearch />
        <LinksDropdown />
      </div>
    </nav>
  )
}

export default Navbar