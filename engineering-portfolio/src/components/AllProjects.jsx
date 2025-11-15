import React from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

function AllProjects() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>All projects</h2>
        <p className="section-subtitle">
          Full list of projects. Click any card for a detailed view.
        </p>
      </div>

      <div className="cards-grid all-projects-grid">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="card-link-wrapper"
          >
            <article className="card project-card card-clickable">
              <div className="project-card-inner">
                <h3 className="project-card-title">{p.title}</h3>
                <div className="project-card-bottom">
                  <p className="project-card-summary">{p.summary}</p>

                  <div className="project-card-meta project-card-meta-always">
                    <div className="card-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="project-card-meta-footer">
                      <span className="card-period">{p.period}</span>
                      <span className="card-link">View details →</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default AllProjects

// STATIC PAGES

// // src/components/AllProjects.jsx
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { projects } from '../data/projects'

// function AllProjects() {
//   return (
//     <section className="section">
//       <div className="section-header">
//         <h2>All projects</h2>
//         <p className="section-subtitle">
//           Full list of projects. Click any card for a detailed view.
//         </p>
//       </div>

//       <div className="cards-grid all-projects-grid">
//         {projects.map((p) => (
//           <Link
//             key={p.slug}
//             to={`/projects/${p.slug}`}
//             className="card-link-wrapper"
//           >
//             <article className="card project-card-static">
//               <div className="project-card-static-inner">
//                 <h3 className="project-card-static-title">{p.title}</h3>
//                 <p className="project-card-static-summary">{p.summary}</p>

//                 <div className="project-card-static-meta">
//                   <div className="card-tags">
//                     {p.tags.map((t) => (
//                       <span key={t} className="tag">
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="project-card-static-footer">
//                     <span className="card-period">{p.period}</span>
//                     <span className="card-link">View details →</span>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           </Link>
//         ))}
//       </div>
//     </section>
//   )
// }

// export default AllProjects
