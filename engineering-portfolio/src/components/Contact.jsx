import React from 'react'

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-header">
        <h2>Contact</h2>
        <p className="section-subtitle">
          For research collaborations, internships, or project work, email me directly.
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-details">
          <p>Email</p>
          <a href="mailto:your.email@example.com" className="contact-link">
            your.email@example.com
          </a>

          <p>GitHub</p>
          <a
            href="https://github.com/yourname"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            github.com/yourname
          </a>

          <p>LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/yourname"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            linkedin.com/in/yourname
          </a>
        </div>
      </div>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Your Name</span>
      </footer>
    </section>
  )
}

export default Contact

