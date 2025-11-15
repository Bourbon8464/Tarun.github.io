// src/components/Experience.jsx
import React from 'react'
import { roles } from '../data/experience'

function Experience() {
  return (
    <div className="timeline">
      {roles.map((r) => (
        <article key={r.id} className="timeline-item">
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
  )
}

export default Experience
