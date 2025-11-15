import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="app">
        <Navbar />
        <main className="section">
          <p>Project not found.</p>
          <Link to="/" className="card-link">
            ← Back to home
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <main className="section">
        <div className="section-header">
          <h2>{project.title}</h2>
          <p className="section-subtitle">{project.summary}</p>
        </div>

        <article className="project-detail">
          <p className="project-detail-intro">{project.detailIntro}</p>

          {project.detailSections.map((section) => (
            <section key={section.heading} className="project-detail-section">
              <h3>{section.heading}</h3>
              <ul>
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          ))}

          {project.techStack && project.techStack.length > 0 && (
            <section className="project-detail-section">
              <h3>Technologies</h3>
              <div className="card-tags">
                {project.techStack.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          {project.links && project.links.length > 0 && (
            <section className="project-detail-section">
              <h3>Links</h3>
              <div className="card-links">
                {project.links.map((l) => (
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
            </section>
          )}

          <div className="project-detail-back">
            <Link to="/" className="card-link">
              ← Back to all projects
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}

export default ProjectDetail
