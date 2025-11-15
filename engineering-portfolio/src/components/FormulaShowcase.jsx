import React from 'react'
import { BlockMath, InlineMath } from 'react-katex'

function FormulaShowcase() {
  return (
    <section id="math" className="section section-alt">
      <div className="section-header">
        <h2>Math / LaTeX examples</h2>
        <p className="section-subtitle">
          Rendered with KaTeX via <code>react-katex</code>. Edit these formulas to match your own work.
        </p>
      </div>

      <div className="math-grid">
        <article className="card">
          <h3>Rocket equation</h3>
          <p>Tsiolkovsky equation for idealised chemical propulsion:</p>
          <BlockMath math={'\\Delta v = I_\\mathrm{sp} \\, g_0 \\, \\ln \\left( \\frac{m_0}{m_f} \\right)'} />
          <p className="math-caption">
            Here <InlineMath math="I_\mathrm{sp}" /> is the specific impulse, <InlineMath math="g_0" /> is
            standard gravity, and <InlineMath math="m_0, m_f" /> are initial and final mass.
          </p>
        </article>

        <article className="card">
          <h3>Incompressible flow</h3>
          <p>Continuity equation in differential form:</p>
          <BlockMath math={'\\nabla \\cdot \\mathbf{u} = 0'} />
          <p className="math-caption">
            For a Newtonian fluid, combining with momentum equations yields the Navier–Stokes system.
          </p>
        </article>

        <article className="card">
          <h3>Orbital energy</h3>
          <p>Specific mechanical energy for a two-body orbit:</p>
          <BlockMath math={'\\varepsilon = -\\dfrac{\\mu}{2a}'} />
          <p className="math-caption">
            With gravitational parameter <InlineMath math="\\mu" /> and semi-major axis{' '}
            <InlineMath math="a" />.
          </p>
        </article>
      </div>
    </section>
  )
}

export default FormulaShowcase
