// src/components/Skills.jsx
import React from 'react'
import { skillGroups } from '../data/skills'

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-header">
        <h2>Skills</h2>
      </div>
      <div className="skills-grid">
        {skillGroups.map((g) => (
          <article key={g.id} className="skills-card">
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Skills
