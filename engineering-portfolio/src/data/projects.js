export const projects = [
  {
    "slug": "designed-flight-control-systems-for-high-altitude-long-endurance-uav",
    "title": "Designed Flight Control Systems for High-Altitude Long-Endurance UAV",
    "period": "July 2022 –  June 2023",
    "tags": [
      "Simulink"
    ],
    "summary": "Designed A HALE UAV for class project",
    "detailIntro": "Unmanned Aerial Vehicles have revolutionised the aerospace industry, proving to be an efficient and cost effective solution for a variety of applications. This very versatility has made them desirable for numerous sectors, from defence to disaster relief. \n\nThe purpose of this project is to show the complete design process of creating a new UAV for the market to fulfil a specific set of mission requirements and the development of the design throughout the process. ",
    "detailSections": [
      {
        "heading": "Objectives",
        "bullets": [
          "Design low-thrust transfers between LEO and cislunar orbits.",
          "Enable fast parametric sweeps on thrust levels and specific impulse.",
          "Compare against patched-conic and impulsive Δv baselines."
        ]
      },
      {
        "heading": "Approach",
        "bullets": [
          "Used a shape-based trajectory parameterisation with a small set of optimisation variables.",
          "Propagated dynamics using variable-step ODE solvers and included J2, SRP, and third-body gravity as optional terms.",
          "Wrapped the solver in a Python interface using SciPy’s optimisation routines."
        ]
      },
      {
        "heading": "Outcomes",
        "bullets": [
          "Obtained fuel-optimal trajectories within a few percent of high-fidelity benchmarks.",
          "Produced visualisations of thrust profiles, state histories, and Δv breakdowns.",
          "Demonstrated how low-thrust missions scale in flight time vs propellant mass."
        ]
      }
    ],
    "techStack": [
      "Python",
      "NumPy",
      "SciPy",
      "Matplotlib"
    ],
    "links": [
      {
        "label": "GitHub repo",
        "href": "https://github.com/yourname/low-thrust-optimizer"
      }
    ],
    "rawTags": "Simulink",
    "rawTechStack": "Python, NumPy, SciPy, Matplotlib"
  },
  {
    "slug": "improving-the-stability-of-unmanned-aerial-vehicles-using-artificial-intelligence-algorithms",
    "title": "Improving the Stability of Unmanned Aerial Vehicles using Artificial Intelligence Algorithms. ",
    "period": "July 2022 –  June 2023",
    "tags": [
      "Propulsion test",
      "Python",
      "Data acquisition"
    ],
    "summary": "Dissertation summary ",
    "detailIntro": "Compares the effectiveness of a traditional Proportional Integral Derivative Controller and an Artificial Intelligence based PID Controller in controlling the stability of a quadcopter in the presence of external disturbances, particularly wind. ",
    "detailSections": [
      {
        "heading": "Scope",
        "bullets": [
          "Processed pressure, temperature, and mass-flow sensor data from cold-flow and hot-fire tests.",
          "Computed discharge coefficients (CdA) for LOx valves and characterised valve behaviour vs command."
        ]
      },
      {
        "heading": "Data processing",
        "bullets": [
          "Implemented spike removal, time-base alignment, and unit normalisation.",
          "Generated plots for CdA vs time, valve command vs flow, and run-to-run comparisons."
        ]
      },
      {
        "heading": "Impact",
        "bullets": [
          "Supported valve qualification decisions before major test campaigns.",
          "Provided documentation-quality plots for design reviews and reports."
        ]
      }
    ],
    "techStack": [
      "SIMULINK"
    ],
    "links": [],
    "rawTags": "Propulsion test, Python, Data acquisition",
    "rawTechStack": "SIMULINK"
  },
  {
    "slug": "remote-sensing-mission-design",
    "title": "Remote sensing mission design",
    "period": "2024",
    "tags": [
      "Mission design",
      "STK",
      "Systems engineering"
    ],
    "summary": "LEO constellation and payload concept for global coverage and strict revisit constraints.",
    "detailIntro": "Designed a LEO constellation and payload concept for a radiometer with stringent revisit and resolution requirements.",
    "detailSections": [
      {
        "heading": "Mission concept",
        "bullets": [
          "Targeted sub-20 km nadir resolution with global coverage.",
          "Used a push-broom phased-array concept with multiple cross-track beams."
        ]
      },
      {
        "heading": "Analysis",
        "bullets": [
          "Used STK to quantify coverage and revisit vs number of satellites and orbital planes.",
          "Produced link budgets, power budgets, and duty-cycle analysis for the payload."
        ]
      },
      {
        "heading": "Results",
        "bullets": [
          "Identified constellations that meet < 6 h revisit with feasible satellite counts.",
          "Documented the trade-offs between altitude, inclination, and instrument swath."
        ]
      }
    ],
    "techStack": [
      "STK",
      "Python",
      "LaTeX"
    ],
    "links": [],
    "rawTags": "Mission design, STK, Systems engineering",
    "rawTechStack": "STK, Python, LaTeX"
  }
];
