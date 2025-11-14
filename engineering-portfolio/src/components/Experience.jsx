import React from 'react'

const roles = [
  {
    organisation: 'Student Rocketry Team',
    role: 'Propulsion / Fluids Engineer',
    period: '2023 – Present',
    bullets: [
      'Led the design of propellant feed and vent systems for a LOx / fuel engine testbed.',
      'Analysed mass-flow and CdA trends from cold-flow and hot-fire tests using Python.',
      'Authored procedures for valve qualification and pressure-test campaigns.',
    ],
  },
  {
    organisation: 'Research Group – Space Systems',
    role: 'Graduate Research Assistant',
    period: '2024 – Present',
    bullets: [
      'Developed numerical tools for orbit propagation and attitude simulation.',
      'Integrated high-fidelity environment models (aero-drag, SRP, third-body).',
    ],
  },
]

function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-header">
        <h2>Experience</h2>
      </div>
      <div className="timeline">
        {roles.map((r) => (
          <article key={r.organisation} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <header className="timeline-header">
                <h3>{r.role}</h3>
                <span className="timeline-org">{r.organisation}</span>
                <span className="timeline-period">{r.period}</span>
              </header>
              <ul className="timeline-list">
                {r.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience
