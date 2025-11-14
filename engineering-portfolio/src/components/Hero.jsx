import React from 'react'

function Hero() {
  return (
    <section id="hero" className="section hero">
      <div className="hero-content">
        <div>
          <p className="hero-overline">Engineering portfolio</p>
          <h1 className="hero-title">Your Name</h1>
          <p className="hero-subtitle">
            Aerospace / Mechanical / Electrical Engineer specialising in
            simulation, numerical methods, and hardware-in-the-loop prototyping.
          </p>
          <div className="hero-actions">
            <a
              href="/cv.pdf"
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Download CV
            </a>
            <a href="#projects" className="btn btn-secondary">
              View projects
            </a>
          </div>
        </div>
        <div className="hero-highlight">
          <p className="hero-highlight-title">At a glance</p>
          <ul className="hero-highlight-list">
            <li>Finite-volume CFD and numerical PDEs</li>
            <li>React, Python, MATLAB, Julia</li>
            <li>Flight dynamics and orbit analysis</li>
            <li>Hands-on lab and test-stand work</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero

