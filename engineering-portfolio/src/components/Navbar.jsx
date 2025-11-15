import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'projects', label: 'Projects', to: '/projects' },
  { id: 'experience', label: 'Experience', to: '/experience' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

if (import.meta.env.DEV) {
  navItems.push({ id: 'admin', label: 'Admin', to: '/admin' })
}


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogoClick = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={handleLogoClick}>
          <span className="nav-logo-mark">&lt;/&gt;</span>
          <span className="nav-logo-text">Tarun Ramireddy</span>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' nav-link-active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="nav-burger"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((x) => !x)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="nav-mobile-link"
              onClick={() => {
                navigate(item.to)
                setMenuOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar
