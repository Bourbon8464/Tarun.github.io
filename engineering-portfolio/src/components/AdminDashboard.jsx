// src/components/AdminDashboard.jsx
import React, { useState } from 'react'
import { projects as initialProjects } from '../data/projects'
import { roles as initialRoles } from '../data/experience'
import { skillGroups as initialSkills } from '../data/skills'

const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')   // non-alphanumerics → dash
    .replace(/^-+|-+$/g, '')       // trim leading/trailing dashes

function AdminDashboard() {
  const [projects, setProjects] = useState(
    initialProjects.map((p) => ({
      ...p,
      rawTags: p.tags?.join(', ') || '',
      rawTechStack: p.techStack?.join(', ') || '',
    })),
  )
  const [roles, setRoles] = useState(initialRoles)
  const [skills, setSkills] = useState(initialSkills)

  // ----- Projects -----
  const handleProjectChange = (index, field, value) => {
  setProjects((prev) => {
    const next = [...prev]
    const current = next[index] || {}

    let updated = { ...current, [field]: value }

    // If the title changes, regenerate slug automatically
    if (field === 'title') {
      updated.slug = slugify(value)
    }

    next[index] = updated
    return next
  })
}


  const addProject = () => {
  setProjects((prev) => [
    ...prev,
    {
      slug: '',
      title: 'New project title',
      period: 'YYYY – YYYY',
      tags: [],
      rawTags: 'Tag1, Tag2',
      summary: 'Short summary.',
      detailIntro: 'Longer intro.',
      detailSections: [],
      techStack: [],
      rawTechStack: 'Python, React',
      links: [],
    },
  ])
}


  // ----- Roles (timeline) -----
  const handleRoleChange = (index, field, value) => {
    setRoles((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const addRole = () => {
    setRoles((prev) => [
      ...prev,
      {
        id: `role-${prev.length + 1}`,
        organisation: 'New organisation',
        role: 'New role',
        period: 'YYYY – YYYY',
        bullets: ['Responsibility 1'],
      },
    ])
  }

  // ----- Skills -----
  const handleSkillGroupChange = (index, field, value) => {
    setSkills((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const addSkillGroup = () => {
    setSkills((prev) => [
      ...prev,
      {
        id: `skill-group-${prev.length + 1}`,
        title: 'New skill group',
        items: ['Skill 1', 'Skill 2'],
      },
    ])
  }

  // ----- Helpers -----
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied JSON to clipboard')
    } catch {
      alert('Could not copy. Select and copy manually.')
    }
  }
    const saveToFiles = async () => {
    try {
      const payload = {
        projects: projects.map((p) => ({
          ...p,
          tags: (p.rawTags ?? '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          techStack: (p.rawTechStack ?? '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        })),
        roles,
        skillGroups: skills,
      }


      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      alert('Saved to src/data/*.js')
    } catch (err) {
      console.error(err)
      alert('Failed to save. Check dev server logs.')
    }
  }

  const projectsJson = JSON.stringify(projects, null, 2)
  const rolesJson = JSON.stringify(roles, null, 2)
  const skillsJson = JSON.stringify(skills, null, 2)

  return (
    <section className="section admin-section">
            <div className="section-header admin-header">
        <div>
          <h2>Admin dashboard</h2>
          <p className="section-subtitle">
            Edit content here, then press “Save to files” during local dev.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={saveToFiles}
        >
          Save to files
        </button>
      </div>


      <div className="admin-grid">
        {/* Projects panel */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Projects</h3>
            <button type="button" className="btn btn-secondary" onClick={addProject}>
              + Add project
            </button>
          </div>

          <div className="admin-list">
            {projects.map((p, i) => (
              <div key={i} className="admin-item">
                <div className="form-row">
                  <label>Slug</label>
                  <input
                    value={p.slug}
                    onChange={(e) => handleProjectChange(i, 'slug', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Title</label>
                  <input
                    value={p.title}
                    onChange={(e) => handleProjectChange(i, 'title', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Period</label>
                  <input
                    value={p.period}
                    onChange={(e) => handleProjectChange(i, 'period', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Summary</label>
                  <textarea
                    rows={2}
                    value={p.summary}
                    onChange={(e) => handleProjectChange(i, 'summary', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Tags (comma-separated)</label>
                  <input
                    value={p.rawTags ?? ''}
                    onChange={(e) => handleProjectChange(i, 'rawTags', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Tech stack (comma-separated)</label>
                  <input
                    value={p.rawTechStack ?? ''}
                    onChange={(e) => handleProjectChange(i, 'rawTechStack', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Detail intro</label>
                  <textarea
                    rows={3}
                    value={p.detailIntro || ''}
                    onChange={(e) => handleProjectChange(i, 'detailIntro', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-json">
            <div className="admin-json-header">
              <span>projects.js JSON</span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  copyToClipboard(`export const projects = ${projectsJson};\n`)
                }
              >
                Copy JSON
              </button>
            </div>
            <textarea readOnly rows={10} value={projectsJson} />
          </div>
        </div>

        {/* Experience / timeline panel */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Experience (timeline)</h3>
            <button type="button" className="btn btn-secondary" onClick={addRole}>
              + Add role
            </button>
          </div>

          <div className="admin-list">
            {roles.map((r, i) => (
              <div key={i} className="admin-item">
                <div className="form-row">
                  <label>ID</label>
                  <input
                    value={r.id}
                    onChange={(e) => handleRoleChange(i, 'id', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Organisation</label>
                  <input
                    value={r.organisation}
                    onChange={(e) =>
                      handleRoleChange(i, 'organisation', e.target.value)
                    }
                  />
                </div>
                <div className="form-row">
                  <label>Role</label>
                  <input
                    value={r.role}
                    onChange={(e) => handleRoleChange(i, 'role', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Period</label>
                  <input
                    value={r.period}
                    onChange={(e) => handleRoleChange(i, 'period', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Bullets (one per line)</label>
                  <textarea
                    rows={3}
                    value={(r.bullets || []).join('\n')}
                    onChange={(e) =>
                      handleRoleChange(
                        i,
                        'bullets',
                        e.target.value
                          .split('\n')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-json">
            <div className="admin-json-header">
              <span>experience.js JSON</span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  copyToClipboard(`export const roles = ${rolesJson};\n`)
                }
              >
                Copy JSON
              </button>
            </div>
            <textarea readOnly rows={10} value={rolesJson} />
          </div>
        </div>

        {/* Skills panel */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Skills</h3>
            <button type="button" className="btn btn-secondary" onClick={addSkillGroup}>
              + Add skill group
            </button>
          </div>

          <div className="admin-list">
            {skills.map((g, i) => (
                <div key={i} className="admin-item">
                <div className="form-row">
                  <label>ID</label>
                  <input
                    value={g.id}
                    onChange={(e) =>
                      handleSkillGroupChange(i, 'id', e.target.value)
                    }
                  />
                </div>
                <div className="form-row">
                  <label>Title</label>
                  <input
                    value={g.title}
                    onChange={(e) =>
                      handleSkillGroupChange(i, 'title', e.target.value)
                    }
                  />
                </div>
                <div className="form-row">
                  <label>Skills (comma-separated)</label>
                  <input
                    value={g.items?.join(', ') || ''}
                    onChange={(e) =>
                      handleSkillGroupChange(
                        i,
                        'items',
                        e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-json">
            <div className="admin-json-header">
              <span>skills.js JSON</span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  copyToClipboard(`export const skillGroups = ${skillsJson};\n`)
                }
              >
                Copy JSON
              </button>
            </div>
            <textarea readOnly rows={10} value={skillsJson} />
          </div>
        </div>
      </div>
    </section>
  )
}


export default AdminDashboard
