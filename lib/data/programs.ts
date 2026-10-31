/* Program catalogue: every track shown in the Programs menu, the homepage and search. */
export type Cat = "cs" | "ee" | "mech" | "civil" | "mgmt" | "health";
export type CatalogProgram = { icon: string; title: string; desc: string };

export const PROGRAMS: Record<Cat, CatalogProgram[]> = {
  "cs": [
    {
      "icon": "fa-solid fa-brain",
      "title": "Artificial Intelligence",
      "desc": "Applied AI foundations"
    },
    {
      "icon": "fa-solid fa-robot",
      "title": "AI (Generative & Agentic)",
      "desc": "LLMs, RAG, agentic AI"
    },
    {
      "icon": "fa-solid fa-globe",
      "title": "Full Stack Web Development",
      "desc": "Build and ship web apps"
    },
    {
      "icon": "fa-solid fa-display",
      "title": "Front End Web Development",
      "desc": "React, UI engineering, deploy"
    },
    {
      "icon": "fa-brands fa-android",
      "title": "Android App Development",
      "desc": "Kotlin, Firebase, Play Store"
    },
    {
      "icon": "fa-solid fa-cloud",
      "title": "Cloud Computing",
      "desc": "Infrastructure and cloud ops"
    },
    {
      "icon": "fa-brands fa-aws",
      "title": "AWS",
      "desc": "Core services, IaC, production"
    },
    {
      "icon": "fa-brands fa-java",
      "title": "Programming in Java",
      "desc": "OOP, collections, multithreading"
    },
    {
      "icon": "fa-brands fa-python",
      "title": "Programming in Python",
      "desc": "Python, ML, analytics"
    },
    {
      "icon": "fa-solid fa-pen-nib",
      "title": "Graphic Designing",
      "desc": "Figma, branding, visual systems"
    },
    {
      "icon": "fa-solid fa-user-shield",
      "title": "Cyber Security & Ethical Hacking",
      "desc": "Defense, fundamentals, practice"
    },
    {
      "icon": "fa-solid fa-infinity",
      "title": "DevOps",
      "desc": "CI/CD pipelines, deployments"
    },
    {
      "icon": "fa-solid fa-sitemap",
      "title": "DSA + System Design",
      "desc": "Data structures, scalable design"
    },
    {
      "icon": "fa-solid fa-microchip",
      "title": "Machine Learning",
      "desc": "Model training and evaluation"
    },
    {
      "icon": "fa-solid fa-database",
      "title": "Data Science",
      "desc": "From raw data to real insight"
    },
    {
      "icon": "fa-solid fa-chart-simple",
      "title": "Data Analytics",
      "desc": "Dashboards, metrics, decisions"
    },
    {
      "icon": "fa-solid fa-swatchbook",
      "title": "UI / UX",
      "desc": "Product design and usability"
    }
  ],
  "ee": [
    {
      "icon": "fa-solid fa-microchip",
      "title": "Embedded Systems",
      "desc": "Microcontrollers, firmware"
    },
    {
      "icon": "fa-solid fa-bolt",
      "title": "Power Systems",
      "desc": "Generation, transmission basics"
    },
    {
      "icon": "fa-solid fa-satellite-dish",
      "title": "IoT Systems",
      "desc": "Sensors, connectivity, dashboards"
    },
    {
      "icon": "fa-solid fa-plug-circle-bolt",
      "title": "VLSI Design",
      "desc": "Digital design fundamentals"
    },
    {
      "icon": "fa-solid fa-robot",
      "title": "Robotics & Automation",
      "desc": "Control systems, actuators"
    }
  ],
  "mech": [
    {
      "icon": "fa-solid fa-cubes",
      "title": "CAD & Product Design",
      "desc": "SolidWorks, modeling basics"
    },
    {
      "icon": "fa-solid fa-gears",
      "title": "Mechanical Design Fundamentals",
      "desc": "Materials, stress, mechanisms"
    },
    {
      "icon": "fa-solid fa-industry",
      "title": "Manufacturing & CAM",
      "desc": "Production processes, tooling"
    }
  ],
  "civil": [
    {
      "icon": "fa-solid fa-drafting-compass",
      "title": "Structural Design Basics",
      "desc": "Loads, analysis, safety codes"
    }
  ],
  "mgmt": [
    {
      "icon": "fa-solid fa-chart-line",
      "title": "Digital Marketing",
      "desc": "SEO, ads, analytics"
    },
    {
      "icon": "fa-solid fa-sack-dollar",
      "title": "Finance & Investment",
      "desc": "Markets, valuation basics"
    },
    {
      "icon": "fa-solid fa-people-group",
      "title": "Human Resources",
      "desc": "Hiring, L&D, operations"
    },
    {
      "icon": "fa-solid fa-diagram-project",
      "title": "Product Management",
      "desc": "Discovery, roadmaps, delivery"
    },
    {
      "icon": "fa-solid fa-bullhorn",
      "title": "Business Analytics",
      "desc": "Data-driven decision making"
    },
    {
      "icon": "fa-solid fa-gears",
      "title": "Operations Management",
      "desc": "Process design, efficiency"
    }
  ],
  "health": [
    {
      "icon": "fa-solid fa-notes-medical",
      "title": "Medical Coding",
      "desc": "ICD-10, CPT, billing workflows"
    },
    {
      "icon": "fa-solid fa-flask",
      "title": "Clinical Trial & Research",
      "desc": "GCP, protocols, monitoring"
    },
    {
      "icon": "fa-solid fa-brain",
      "title": "Psychology",
      "desc": "Behaviour, cognition, mental health"
    }
  ]
};

export const CAT_LABEL: Record<Cat, string> = {
  "cs": "Computer Science",
  "ee": "Electrical & Electronics",
  "mech": "Mechanical",
  "civil": "Civil",
  "mgmt": "Management",
  "health": "Healthcare & Life Sciences"
};

export const SLUG_OVERRIDES: Record<string, string> = {
  "AWS": "aws-cloud",
  "Cyber Security & Ethical Hacking": "cyber-security"
};
