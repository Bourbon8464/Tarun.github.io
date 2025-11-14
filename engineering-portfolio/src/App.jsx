import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
// import Experience from './components/Experience'
// import Skills from './components/Skills'
// import FormulaShowcase from './components/FormulaShowcase'
import Contact from './components/Contact'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <FormulaShowcase />
        <Contact />
      </main>
    </div>
  )
}

export default App
