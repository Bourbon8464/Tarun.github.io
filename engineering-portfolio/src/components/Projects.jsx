// src/components/Projects.jsx
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const VISIBLE_COUNT = 2
const ROTATION_DURATION_MS = 10000 // 9 s per tab

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [cardHeight, setCardHeight] = useState(null)
  const cardRefs = useRef([])

  // Auto-rotate with progress bar
  useEffect(() => {
    const stepMs = 100
    const increment = (stepMs / ROTATION_DURATION_MS) * 100

    const id = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + VISIBLE_COUNT) % projects.length)
          return 0
        }
        return next
      })
    }, stepMs)

    return () => clearInterval(id)
  }, [])

  // Compute which projects are currently visible
  const visibleProjects = []
  for (let i = 0; i < Math.min(VISIBLE_COUNT, projects.length); i += 1) {
    const idx = (activeIndex + i) % projects.length
    visibleProjects.push(projects[idx])
  }

  // Measure tallest card among visible ones and force all to that height
  useLayoutEffect(() => {
    let max = 0
    cardRefs.current.forEach((el) => {
      if (el) {
        // measure at natural height
        el.style.height = 'auto'
        const h = el.offsetHeight
        if (h > max) max = h
      }
    })
    if (max > 0) {
      cardRefs.current.forEach((el) => {
        if (el) {
          el.style.height = `${max}px`
        }
      })
      setCardHeight(max)
    }
  }, [visibleProjects])

  // Clear refs array length to match visible cards
  cardRefs.current = cardRefs.current.slice(0, visibleProjects.length)

  return (
    <section id="projects" className="section">
      <div className="section-header">
        <h2>Projects</h2>
        <p className="section-subtitle">
          Selected technical work spanning analysis, simulation, and hardware.
        </p>
      </div>

      <div className="carousel-header">
        <div className="carousel-progress-track">
          <div
            className="carousel-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="carousel-meta">
          <span>
            Showing {VISIBLE_COUNT} of {projects.length}
          </span>
        </div>
        <Link
          to="/projects"
          className="btn btn-secondary carousel-all-btn"
        >
          All projects
        </Link>
      </div>

      <div className="cards-grid projects-grid">
        {visibleProjects.map((p, i) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="card-link-wrapper"
          >
            <article
              className="card project-card card-clickable"
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              style={cardHeight ? { height: `${cardHeight}px` } : undefined}
            >
              <div className="project-card-inner">
                {/* Title always at the top */}
                <h3 className="project-card-title">{p.title}</h3>

                {/* Bottom block: description + meta */}
                <div className="project-card-bottom">
                  <p className="project-card-summary">{p.summary}</p>

                  <div className="project-card-meta">
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

export default Projects
