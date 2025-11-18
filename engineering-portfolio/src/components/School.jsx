// src/pages/School.jsx
import React from "react";
import { schools, courseGroups } from "../data/school";

const statusBadgeClass = (status) => {
  const base = "school-status-badge";
  if (status === "Completed") return base + " school-status-completed";
  if (status === "In progress") return base + " school-status-progress";
  return base + " school-status-planned";
};

export default function School() {
  return (
    <div className="page school-page">
      <header className="school-header">
        <p className="school-eyebrow">School</p>
        <h1 className="school-title">Universities & Courses</h1>
        <p className="school-summary">
          A snapshot of my academic path so far: undergraduate and graduate
          studies, with course groups organised by university.
        </p>
      </header>

      <main className="school-multi-layout">
        {schools.map((school) => {
          const groupsForSchool = courseGroups.filter(
            (g) => g.schoolId === school.id
          );

          return (
            <section
              key={school.id}
              className="school-block"
            >
              {/* School header */}
              <div className="school-block-header">
                <p className="school-block-label">
                  {school.label || school.level || "Program"}
                </p>
                <h2 className="school-block-title">
                  {school.university}
                </h2>
                <p className="school-block-subtitle">
                  {school.degree}
                </p>
                {school.period && (
                  <p className="school-block-period">
                    {school.period}
                  </p>
                )}
                {school.summary && (
                  <p className="school-block-summary">
                    {school.summary}
                  </p>
                )}
              </div>

              {/* Course groups for this school */}
              <div className="school-block-groups">
                {groupsForSchool.map((group) => (
                  <section key={group.id} className="school-group">
                    <div className="school-group-header">
                      <h3 className="school-group-title">{group.title}</h3>
                      {group.blurb && (
                        <p className="school-group-blurb">{group.blurb}</p>
                      )}
                    </div>

                    <div className="school-course-grid">
                      {(group.courses || []).map((course) => (
                        <article
                          key={course.code + course.name}
                          className="school-course-card"
                        >
                          <div className="school-course-top">
                            <span className="school-course-code">
                              {course.code}
                            </span>
                            {course.status && (
                              <span className={statusBadgeClass(course.status)}>
                                {course.status}
                              </span>
                            )}
                          </div>
                          <h4 className="school-course-name">
                            {course.name}
                          </h4>
                          {course.type && (
                            <p className="school-course-meta">{course.type}</p>
                          )}
                        </article>
                      ))}
                    </div>
                  </section>
                ))}

                {groupsForSchool.length === 0 && (
                  <p className="school-empty">
                    No course groups assigned yet for this school.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
