import React from 'react'

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-header">
        <h2>Contact</h2>
        <p className="section-subtitle">
          For research collaborations, internships, or project work.
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

        <form
          className="contact-form"
          action="https://formspree.io/f/your-form-id"
          method="POST"
        >
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required />
          </div>
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
          <p className="form-note">
            The form uses Formspree. Replace the <code>action</code> URL with
            your own endpoint.
          </p>
        </form>
      </div>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Your Name</span>
      </footer>
    </section>
  )
}

export default Contact

