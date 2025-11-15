import React from 'react'

function Hero() {
  return (
    <section id="hero" className="section hero">
      <div className="hero-content">
        <div>
          <p className="hero-overline">Engineering portfolio</p>
          <h1 className="hero-title">Tarun Ramireddy</h1>
          <p className="hero-subtitle">
            Aerospace specialising in Controls, focusing on Navigation and Guidance.
          </p>
          <div className="hero-actions">
            <a
              href="https://www.overleaf.com/download/project/66d74a9b81b77e9863e55d4d/build/1b174628-d43a-485f-b532-b2aecc489233-19a6c1c9167-a4a044b653886ff3/output/cached/output.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              
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
            <li>Java, Python, MATLAB, Julia</li>
            <li>Orbit mechanics and mission design</li>
            <li>Hands-on lab and test-stand work</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
