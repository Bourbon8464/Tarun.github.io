import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import FormulaShowcase from './components/FormulaShowcase'
import ProjectDetail from './components/ProjectDetail'
import AllProjects from './components/AllProjects'
import CustomCursor from './components/CustomCursor'
import AdminDashboard from './components/AdminDashboard'
import School from "./components/School"; 

function HomePage() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
    </main>
  )
}

function AllProjectsPage() {
  return (
    <main>
      <AllProjects />
    </main>
  )
}

function ExperiencePage() {
  return (
    <main>
      <section className="section">
        <div className="section-header">
          <h2>Experiences</h2>
          <p className="section-subtitle">
            Roles, responsibilities, and impact over time.
          </p>
        </div>
        <Experience />
      </section>
    </main>
  )
}

function MathPage() {
  return (
    <main>
      <FormulaShowcase />
    </main>
  )
}

function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  )
}

function App() {
  return (
    <div className="app">
      {/* <CustomCursor /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/school" element={<School />} />
        <Route path="/admin" element={<AdminDashboard />} />


      </Routes>
    </div>
  )
}

export default App
