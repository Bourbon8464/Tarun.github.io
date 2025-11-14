import React, { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'math', label: 'Math / LaTeX' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => handleNavClick('hero')}>
          <span className="nav-logo-mark">&lt;/&gt;</span>
          <span className="nav-logo-text">Your Name</span>
        </div>
        <nav className="nav-links">
          {sections.map((s) => (
            <button
              key={s.id}
              className="nav-link"
              onClick={() => handleNavClick(s.id)}
            >
              {s.label}
            </button>
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
          {sections.map((s) => (
            <button
              key={s.id}
              className="nav-mobile-link"
              onClick={() => handleNavClick(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar


