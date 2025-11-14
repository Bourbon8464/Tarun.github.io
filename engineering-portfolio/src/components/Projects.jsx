import React from 'react'

const projects = [
  {
    title: 'Low-thrust trajectory optimiser',
    period: '2024 – 2025',
    tags: ['Astrodynamics', 'Python', 'Nonlinear optimisation'],
    description:
      'Implemented a shape-based low-thrust trajectory solver for Earth–Moon transfers. Validated with high-fidelity propagation and compared to patched-conic baselines.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/yourname/low-thrust-optimizer',
      },
    ],
  },
  {
    title: 'Student liquid rocket engine data pipeline',
    period: '2023 – 2024',
    tags: ['Propulsion test', 'Python', 'Data acquisition'],
    description:
      'Built a Python pipeline to ingest hot-fire test data, compute discharge coefficients, and generate qualification plots for LOx valve characterisation.',
    links: [],
  },
  {
    title: 'Remote sensing mission design',
    period: '2024',
    tags: ['Mission design', 'STK', 'Systems engineering'],
    description:
      'Designed a LEO constellation for global revisit < 6 h, including link budget, power budget, and duty-cycle analysis for a push-broom radiometer.',
    links: [],
  },
]

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <h2>Projects</h2>
        <p className="section-subtitle">
          Selected technical work spanning analysis, simulation, and hardware.
        </p>
      </div>
      <div className="cards-grid">
        {projects.map((p) => (
          <article key={p.title} className="card">
            <header className="card-header">
              <h3>{p.title}</h3>
              <span className="card-period">{p.period}</span>
            </header>
            <p className="card-body">{p.description}</p>
            <div className="card-tags">
              {p.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            {p.links && p.links.length > 0 && (
              <div className="card-links">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects

