// import React from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { projects } from '../data/projects'

// function ProjectDetail() {
//   const { slug } = useParams()
//   const project = projects.find((p) => p.slug === slug)

//   if (!project) {
//     return (
//       <div className="app">
//         <Navbar />
//         <main className="section">
//           <p>Project not found.</p>
//           <Link to="/" className="card-link">
//             ← Back to home
//           </Link>
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div className="app">
//       <main className="section">
//         <div className="section-header">
//           <h2>{project.title}</h2>
//           <p className="section-subtitle">{project.summary}</p>
//         </div>

//         <article className="project-detail">
//           <p className="project-detail-intro">{project.detailIntro}</p>

//           {project.detailSections.map((section) => (
//             <section key={section.heading} className="project-detail-section">
//               <h3>{section.heading}</h3>
//               <ul>
//                 {section.bullets.map((b, i) => (
//                   <li key={i}>{b}</li>
//                 ))}
//               </ul>
//             </section>
//           ))}

//           {project.techStack && project.techStack.length > 0 && (
//             <section className="project-detail-section">
//               <h3>Technologies</h3>
//               <div className="card-tags">
//                 {project.techStack.map((t) => (
//                   <span key={t} className="tag">
//                     {t}
//                   </span>
//                 ))}
//               </div>
//             </section>
//           )}

//           {project.links && project.links.length > 0 && (
//             <section className="project-detail-section">
//               <h3>Links</h3>
//               <div className="card-links">
//                 {project.links.map((l) => (
//                   <a
//                     key={l.href}
//                     href={l.href}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="card-link"
//                   >
//                     {l.label}
//                   </a>
//                 ))}
//               </div>
//             </section>
//           )}

//           <div className="project-detail-back">
//             <Link to="/" className="card-link">
//               ← Back to all projects
//             </Link>
//           </div>
//         </article>
//       </main>
//     </div>
//   )
// }

// export default ProjectDetail


// src/components/ProjectDetail.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className="section">
        <p>Project not found.</p>
        <Link to="/projects" className="card-link">
          ← Back to all projects
        </Link>
      </main>
    )
  }

  const {
    title,
    summary,
    period,
    tags,
    techStack,
    detailIntro,
    detailSections,
    links,
  } = project

  return (
    <main className="section project-detail-page">
      {/* HEADER / HERO */}

      <header className="project-hero">
        <div className="project-hero-top">
          <Link to="/projects" className="project-back-link">
            ← All projects
          </Link>

          {tags && tags.length > 0 && (
            <div className="project-hero-tags">
              {tags.slice(0, 3).map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <h1 className="project-hero-title">{title}</h1>

        {summary && <p className="project-hero-summary">{summary}</p>}

        <div className="project-hero-meta">
          {period && (
            <div className="project-hero-meta-item">
              <span className="project-hero-meta-label">Period</span>
              <span className="project-hero-meta-value">{period}</span>
            </div>
          )}
          {techStack && techStack.length > 0 && (
            <div className="project-hero-meta-item">
              <span className="project-hero-meta-label">Tech stack</span>
              <span className="project-hero-meta-value">
                {techStack.join(' · ')}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* TWO-COLUMN BODY */}

      <div className="project-layout">
        {/* Main content column */}
        <article className="project-main">
          {detailIntro && (
            <section className="project-section">
              <p className="project-intro">{detailIntro}</p>
            </section>
          )}

          {detailSections &&
            detailSections.map((sec) => (
              <section key={sec.heading} className="project-section">
                <h2 className="project-section-title">{sec.heading}</h2>

                {sec.bullets && (
                  <ul className="project-section-list">
                    {sec.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                {sec.body && (
                  <p className="project-section-body">{sec.body}</p>
                )}
              </section>
            ))}
        </article>

        {/* Sidebar column */}
        <aside className="project-sidebar">
          <div className="project-sidebar-card">
            <h3>At a glance</h3>
            <ul className="project-sidebar-list">
              {period && (
                <li>
                  <span>Timeline</span>
                  <span>{period}</span>
                </li>
              )}
              {techStack && techStack.length > 0 && (
                <li>
                  <span>Stack</span>
                  <span>{techStack.join(', ')}</span>
                </li>
              )}
              {tags && tags.length > 0 && (
                <li>
                  <span>Keywords</span>
                  <span>{tags.join(', ')}</span>
                </li>
              )}
            </ul>
          </div>

          {links && links.length > 0 && (
            <div className="project-sidebar-card">
              <h3>Links</h3>
              <div className="project-sidebar-links">
                {links.map((l) => (
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
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}

export default ProjectDetail
