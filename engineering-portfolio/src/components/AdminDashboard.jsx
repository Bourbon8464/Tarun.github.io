// src/components/AdminDashboard.jsx
import React, { useState } from 'react'
import { projects as initialProjects } from '../data/projects'
import { roles as initialRoles } from '../data/experience'
import { skillGroups as initialSkills } from '../data/skills'
import {
  schools as initialSchools,
  courseGroups as initialCourseGroups,
} from '../data/school'

const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// ===== Experience sorting helpers =====

const parseStartDate = (role) => {
  const raw = (role.period || '').trim()
  if (!raw) return null
  const firstSegment = raw.split(/–|-/)[0].trim()
  const yearMatch = firstSegment.match(/\d{4}/)
  if (!yearMatch) return null
  const year = parseInt(yearMatch[0], 10)
  if (Number.isNaN(year)) return null
  return new Date(year, 0, 1)
}

const sortExperienceByStart = (list) => {
  return [...list].sort((a, b) => {
    const da = parseStartDate(a)
    const db = parseStartDate(b)
    if (!da && !db) return 0
    if (!da) return 1
    if (!db) return -1
    return db - da
  })
}

function AdminDashboard() {
  const [projects, setProjects] = useState(
    initialProjects.map((p) => ({
      ...p,
      rawTags: p.tags?.join(', ') || '',
      rawTechStack: p.techStack?.join(', ') || '',
    })),
  )

  const [roles, setRoles] = useState(() => sortExperienceByStart(initialRoles))
  const [skills, setSkills] = useState(initialSkills)

  const [schools, setSchools] = useState(initialSchools)
  const [courseGroups, setCourseGroups] = useState(initialCourseGroups)

  // 'overview' | 'project' | 'role' | 'skill' | 'school' | 'schoolGroup'
  const [activeView, setActiveView] = useState({ type: 'overview', index: null })

  // ===== Projects =====
  const handleProjectChange = (index, field, value) => {
    setProjects((prev) => {
      const next = [...prev]
      const current = next[index] || {}
      const updated = {
        ...current,
        [field]: value,
        ...(field === 'title' ? { slug: slugify(value) } : {}),
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

  // ===== Generic delete =====
  const handleDeleteItem = (type, indexToDelete) => {
    if (type === 'projects') {
      setProjects((prev) => prev.filter((_, i) => i !== indexToDelete))
    } else if (type === 'experience') {
      setRoles((prev) => {
        const next = prev.filter((_, i) => i !== indexToDelete)
        return sortExperienceByStart(next)
      })
    } else if (type === 'skills') {
      setSkills((prev) => prev.filter((_, i) => i !== indexToDelete))
    } else if (type === 'schools') {
      setSchools((prev) => prev.filter((_, i) => i !== indexToDelete))
      // also detach any courseGroups pointing at this school
      const removed = schools[indexToDelete]
      if (removed) {
        setCourseGroups((prev) =>
          prev.map((g) =>
            g.schoolId === removed.id ? { ...g, schoolId: '' } : g,
          ),
        )
      }
    }
  }

  // ===== Roles =====
  const handleRoleChange = (index, field, value) => {
    setRoles((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return sortExperienceByStart(next)
    })
  }

  const addRole = () => {
    setRoles((prev) => {
      const next = [
        ...prev,
        {
          id: `role-${prev.length + 1}`,
          organisation: 'New organisation',
          role: 'New role',
          period: '2024 – 2025',
          bullets: ['Responsibility 1'],
        },
      ]
      return sortExperienceByStart(next)
    })
  }

  // ===== Skills =====
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

  // ===== Schools =====
  const handleSchoolChange = (index, field, value) => {
    setSchools((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const addSchool = () => {
    setSchools((prev) => [
      ...prev,
      {
        id: `school-${prev.length + 1}`,
        label: 'New program',
        university: 'New university',
        degree: 'Degree name',
        level: 'Level',
        period: 'YYYY – YYYY',
        summary: '',
      },
    ])
  }

  // ===== Course groups & courses =====
  const handleCourseGroupChange = (groupIndex, field, value) => {
    setCourseGroups((prev) => {
      const next = [...prev]
      next[groupIndex] = { ...next[groupIndex], [field]: value }
      return next
    })
  }

  const addCourseGroup = () => {
    setCourseGroups((prev) => [
      ...prev,
      {
        id: `course-group-${prev.length + 1}`,
        schoolId: '', // select in editor
        title: 'New course group',
        blurb: '',
        courses: [],
      },
    ])
  }

  const deleteCourseGroup = (groupIndex) => {
    setCourseGroups((prev) => prev.filter((_, i) => i !== groupIndex))
  }

  const handleCourseChange = (groupIndex, courseIndex, field, value) => {
    setCourseGroups((prev) => {
      const next = [...prev]
      const group = next[groupIndex]
      const courses = [...(group.courses || [])]
      courses[courseIndex] = { ...courses[courseIndex], [field]: value }
      next[groupIndex] = { ...group, courses }
      return next
    })
  }

  const addCourse = (groupIndex) => {
    setCourseGroups((prev) => {
      const next = [...prev]
      const group = next[groupIndex]
      const courses = [...(group.courses || [])]
      courses.push({
        id: `course-${groupIndex}-${courses.length + 1}`,
        code: 'COURSE 000',
        name: 'New course name',
        type: '',
        status: 'In progress',
      })
      next[groupIndex] = { ...group, courses }
      return next
    })
  }

  const deleteCourse = (groupIndex, courseIndex) => {
    setCourseGroups((prev) => {
      const next = [...prev]
      const group = next[groupIndex]
      const courses = (group.courses || []).filter((_, i) => i !== courseIndex)
      next[groupIndex] = { ...group, courses }
      return next
    })
  }

  // ===== Helpers =====
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
        schools,
        courseGroups,
      }

      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      alert('Saved to src/data/*.js')
    } catch (err) {
      console.error(err)
      alert('Failed to save. Check dev server logs.')
    }
  }

  const projectsJson = JSON.stringify(projects, null, 2)
  const rolesJson = JSON.stringify(roles, null, 2)
  const skillsJson = JSON.stringify(skills, null, 2)
  const schoolsJson = JSON.stringify(schools, null, 2)
  const courseGroupsJson = JSON.stringify(courseGroups, null, 2)

  const goBack = () => setActiveView({ type: 'overview', index: null })

  // ========= DETAIL VIEWS =========

  // ---- Project detail ----
  if (activeView.type === 'project' && activeView.index != null) {
    const i = activeView.index
    const p = projects[i]
    if (!p) return null

    return (
      <section className="section admin-section">
        <div className="section-header admin-header">
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goBack}
              style={{ marginBottom: '0.5rem' }}
            >
              ← Back to admin overview
            </button>
            <h2>Edit project</h2>
            <p className="section-subtitle">
              Editing project #{i + 1}: {p.title || '(untitled)'}
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

        <div className="admin-full-editor">
          <div className="admin-item">
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
                onChange={(e) =>
                  handleProjectChange(i, 'title', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Period</label>
              <input
                value={p.period}
                onChange={(e) =>
                  handleProjectChange(i, 'period', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Summary</label>
              <textarea
                rows={3}
                value={p.summary}
                onChange={(e) =>
                  handleProjectChange(i, 'summary', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Tags (comma-separated)</label>
              <input
                value={p.rawTags ?? ''}
                onChange={(e) =>
                  handleProjectChange(i, 'rawTags', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Tech stack (comma-separated)</label>
              <input
                value={p.rawTechStack ?? ''}
                onChange={(e) =>
                  handleProjectChange(i, 'rawTechStack', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Detail intro</label>
              <textarea
                rows={4}
                value={p.detailIntro || ''}
                onChange={(e) =>
                  handleProjectChange(i, 'detailIntro', e.target.value)
                }
              />
            </div>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDeleteItem('projects', i)
                goBack()
              }}
              style={{ marginTop: '0.75rem' }}
            >
              Delete project
            </button>
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
            <textarea readOnly rows={14} value={projectsJson} />
          </div>
        </div>
      </section>
    )
  }

  // ---- Role detail ----
  if (activeView.type === 'role' && activeView.index != null) {
    const i = activeView.index
    const r = roles[i]
    if (!r) return null

    return (
      <section className="section admin-section">
        <div className="section-header admin-header">
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goBack}
              style={{ marginBottom: '0.5rem' }}
            >
              ← Back to admin overview
            </button>
            <h2>Edit experience</h2>
            <p className="section-subtitle">
              Editing role #{i + 1}: {r.role || '(untitled)'}
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

        <div className="admin-full-editor">
          <div className="admin-item">
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
                rows={5}
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

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDeleteItem('experience', i)
                goBack()
              }}
              style={{ marginTop: '0.75rem' }}
            >
              Delete role
            </button>
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
            <textarea readOnly rows={14} value={rolesJson} />
          </div>
        </div>
      </section>
    )
  }

  // ---- Skill group detail ----
  if (activeView.type === 'skill' && activeView.index != null) {
    const i = activeView.index
    const g = skills[i]
    if (!g) return null

    return (
      <section className="section admin-section">
        <div className="section-header admin-header">
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goBack}
              style={{ marginBottom: '0.5rem' }}
            >
              ← Back to admin overview
            </button>
            <h2>Edit skill group</h2>
            <p className="section-subtitle">
              Editing group #{i + 1}: {g.title || '(untitled)'}
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

        <div className="admin-full-editor">
          <div className="admin-item">
            <div className="form-row">
              <label>ID</label>
              <input
                value={g.id}
                onChange={(e) => handleSkillGroupChange(i, 'id', e.target.value)}
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

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDeleteItem('skills', i)
                goBack()
              }}
              style={{ marginTop: '0.75rem' }}
            >
              Delete skill group
            </button>
          </div>

          <div className="admin-json">
            <div className="admin-json-header">
              <span>skills.js JSON</span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  copyToClipboard(
                    `export const skillGroups = ${skillsJson};\n`,
                  )
                }
              >
                Copy JSON
              </button>
            </div>
            <textarea readOnly rows={14} value={skillsJson} />
          </div>
        </div>
      </section>
    )
  }

  // ---- School detail ----
  if (activeView.type === 'school' && activeView.index != null) {
    const i = activeView.index
    const s = schools[i]
    if (!s) return null

    return (
      <section className="section admin-section">
        <div className="section-header admin-header">
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goBack}
              style={{ marginBottom: '0.5rem' }}
            >
              ← Back to admin overview
            </button>
            <h2>Edit school</h2>
            <p className="section-subtitle">
              Editing school #{i + 1}: {s.label || s.university}
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

        <div className="admin-full-editor">
          <div className="admin-item">
            <div className="form-row">
              <label>ID</label>
              <input
                value={s.id}
                onChange={(e) => handleSchoolChange(i, 'id', e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Label (Undergraduate / Masters etc.)</label>
              <input
                value={s.label || ''}
                onChange={(e) => handleSchoolChange(i, 'label', e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>University</label>
              <input
                value={s.university || ''}
                onChange={(e) =>
                  handleSchoolChange(i, 'university', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Degree</label>
              <input
                value={s.degree || ''}
                onChange={(e) =>
                  handleSchoolChange(i, 'degree', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Level</label>
              <input
                value={s.level || ''}
                onChange={(e) =>
                  handleSchoolChange(i, 'level', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Period</label>
              <input
                value={s.period || ''}
                onChange={(e) =>
                  handleSchoolChange(i, 'period', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Summary</label>
              <textarea
                rows={5}
                value={s.summary || ''}
                onChange={(e) =>
                  handleSchoolChange(i, 'summary', e.target.value)
                }
              />
            </div>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDeleteItem('schools', i)
                goBack()
              }}
              style={{ marginTop: '0.75rem' }}
            >
              Delete school
            </button>
          </div>

          <div className="admin-json">
            <div className="admin-json-header">
              <span>school.js JSON</span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  copyToClipboard(
                    `export const schools = ${schoolsJson};\n\nexport const courseGroups = ${courseGroupsJson};\n`,
                  )
                }
              >
                Copy JSON
              </button>
            </div>
            <textarea
              readOnly
              rows={14}
              value={`${schoolsJson}\n\n${courseGroupsJson}`}
            />
          </div>
        </div>
      </section>
    )
  }

  // ---- Course group detail ----
  if (activeView.type === 'schoolGroup' && activeView.index != null) {
    const gi = activeView.index
    const group = courseGroups[gi]
    if (!group) return null

    return (
      <section className="section admin-section">
        <div className="section-header admin-header">
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goBack}
              style={{ marginBottom: '0.5rem' }}
            >
              ← Back to admin overview
            </button>
            <h2>Edit course group</h2>
            <p className="section-subtitle">
              Editing group #{gi + 1}: {group.title || '(untitled)'}
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

        <div className="admin-full-editor">
          <div className="admin-item">
            <div className="form-row">
              <label>Group ID</label>
              <input
                value={group.id || ''}
                onChange={(e) =>
                  handleCourseGroupChange(gi, 'id', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>School</label>
              <select
                value={group.schoolId || ''}
                onChange={(e) =>
                  handleCourseGroupChange(gi, 'schoolId', e.target.value)
                }
              >
                <option value="">Unassigned</option>
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label || s.university}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>Group title</label>
              <input
                value={group.title || ''}
                onChange={(e) =>
                  handleCourseGroupChange(gi, 'title', e.target.value)
                }
              />
            </div>
            <div className="form-row">
              <label>Group blurb</label>
              <textarea
                rows={3}
                value={group.blurb || ''}
                onChange={(e) =>
                  handleCourseGroupChange(gi, 'blurb', e.target.value)
                }
              />
            </div>

            <div className="admin-sublist">
              <div className="admin-sublist-header">
                <h4>Courses</h4>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addCourse(gi)}
                >
                  + Add course
                </button>
              </div>

              {(group.courses || []).map((course, ci) => (
                <div key={ci} className="admin-subitem">
                  <div className="form-row">
                    <label>Course ID</label>
                    <input
                      value={course.id || ''}
                      onChange={(e) =>
                        handleCourseChange(gi, ci, 'id', e.target.value)
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>Code</label>
                    <input
                      value={course.code || ''}
                      onChange={(e) =>
                        handleCourseChange(gi, ci, 'code', e.target.value)
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>Name</label>
                    <input
                      value={course.name || ''}
                      onChange={(e) =>
                        handleCourseChange(gi, ci, 'name', e.target.value)
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>Type</label>
                    <input
                      value={course.type || ''}
                      onChange={(e) =>
                        handleCourseChange(gi, ci, 'type', e.target.value)
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>Status</label>
                    <input
                      value={course.status || ''}
                      onChange={(e) =>
                        handleCourseChange(gi, ci, 'status', e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteCourse(gi, ci)}
                    style={{ marginTop: '0.5rem' }}
                  >
                    Delete course
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteCourseGroup(gi)
                goBack()
              }}
              style={{ marginTop: '0.75rem' }}
            >
              Delete course group
            </button>
          </div>

          <div className="admin-json">
            <div className="admin-json-header">
              <span>school.js JSON</span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  copyToClipboard(
                    `export const schools = ${schoolsJson};\n\nexport const courseGroups = ${courseGroupsJson};\n`,
                  )
                }
              >
                Copy JSON
              </button>
            </div>
            <textarea
              readOnly
              rows={14}
              value={`${schoolsJson}\n\n${courseGroupsJson}`}
            />
          </div>
        </div>
      </section>
    )
  }

  // ========= OVERVIEW =========

  return (
    <section className="section admin-section">
      <div className="section-header admin-header">
        <div>
          <h2>Admin dashboard</h2>
          <p className="section-subtitle">
            Click an item to open a full-page editor. Press “Save to files” during local dev.
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

      <div className="admin-grid admin-grid-overview">
        {/* Projects */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Projects</h3>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addProject}
            >
              + Add project
            </button>
          </div>

          <div className="admin-list-simple">
            {projects.map((p, i) => (
              <button
                key={i}
                type="button"
                className="admin-row-button"
                onClick={() => setActiveView({ type: 'project', index: i })}
              >
                <div className="admin-row-main">
                  <span className="admin-row-title">
                    {p.title || '(untitled)'}
                  </span>
                  <span className="admin-row-sub">
                    {p.period || 'No period'} · {p.slug || 'no-slug'}
                  </span>
                </div>
                <span className="admin-row-cta">Edit</span>
              </button>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Experience (timeline)</h3>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addRole}
            >
              + Add role
            </button>
          </div>

          <div className="admin-list-simple">
            {roles.map((r, i) => (
              <button
                key={i}
                type="button"
                className="admin-row-button"
                onClick={() => setActiveView({ type: 'role', index: i })}
              >
                <div className="admin-row-main">
                  <span className="admin-row-title">
                    {r.role || '(untitled)'}
                  </span>
                  <span className="admin-row-sub">
                    {r.organisation || 'No org'} · {r.period || 'No period'}
                  </span>
                </div>
                <span className="admin-row-cta">Edit</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Skills</h3>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addSkillGroup}
            >
              + Add skill group
            </button>
          </div>

          <div className="admin-list-simple">
            {skills.map((g, i) => (
              <button
                key={i}
                type="button"
                className="admin-row-button"
                onClick={() => setActiveView({ type: 'skill', index: i })}
              >
                <div className="admin-row-main">
                  <span className="admin-row-title">
                    {g.title || '(untitled)'}
                  </span>
                  <span className="admin-row-sub">
                    {(g.items || []).join(', ') || 'No skills'}
                  </span>
                </div>
                <span className="admin-row-cta">Edit</span>
              </button>
            ))}
          </div>
        </div>

        {/* School */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>School</h3>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addSchool}
              >
                + Add school
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addCourseGroup}
              >
                + Add course group
              </button>
            </div>
          </div>

          <div className="admin-list-simple">
            {/* schools */}
            {schools.map((s, i) => (
              <button
                key={s.id || i}
                type="button"
                className="admin-row-button"
                onClick={() => setActiveView({ type: 'school', index: i })}
              >
                <div className="admin-row-main">
                  <span className="admin-row-title">
                    {s.label || s.level || 'Program'}
                  </span>
                  <span className="admin-row-sub">
                    {s.university || 'University'} · {s.degree || 'Degree'}
                  </span>
                </div>
                <span className="admin-row-cta">Edit</span>
              </button>
            ))}

            {/* small divider */}
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid rgba(51,65,85,0.8)',
                margin: '0.6rem 0',
              }}
            />

            {/* course groups */}
            {courseGroups.map((g, gi) => {
              const school =
                schools.find((s) => s.id === g.schoolId) || null
              return (
                <button
                  key={g.id || gi}
                  type="button"
                  className="admin-row-button"
                  onClick={() =>
                    setActiveView({ type: 'schoolGroup', index: gi })
                  }
                >
                  <div className="admin-row-main">
                    <span className="admin-row-title">
                      {g.title || '(untitled group)'}
                    </span>
                    <span className="admin-row-sub">
                      {(g.courses || []).length} courses
                      {school ? ` · ${school.label || school.university}` : ''}
                    </span>
                  </div>
                  <span className="admin-row-cta">Edit</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard

