/* Curated copy for tracks that have it. Everything else uses the shared template in lib/program.ts. */
export type Module = { code: string; topics: number; title: string; items: string[]; deliverables: string[] };
export type FullProgram = {
  title: string; badge: string; icon: string; orbitIcons: string[];
  stats: { enrolled: string; rating: string; reviews: string; seats: string };
  desc: string;
  tiles: { lbl: string; val: string; ic: string }[];
  modules: Module[];
  projects: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const PROGRAM_DATA: Record<string, FullProgram> = {
  "artificial-intelligence": {
    "title": "Artificial Intelligence",
    "badge": "Popular track",
    "icon": "fa-solid fa-brain",
    "orbitIcons": [
      "fa-solid fa-robot",
      "fa-solid fa-database",
      "fa-solid fa-comments",
      "fa-brands fa-python",
      "fa-solid fa-magnifying-glass-chart",
      "fa-solid fa-microchip",
      "fa-solid fa-eye"
    ],
    "stats": {
      "enrolled": "1,240+",
      "rating": "4.8/5",
      "reviews": "312 reviews",
      "seats": "14 seats left"
    },
    "desc": "Go from core concepts to hands-on applications. Cover ML foundations, deep learning, NLP, and computer vision to understand how intelligent systems are built and used in real products.",
    "tiles": [
      {
        "lbl": "Duration",
        "val": "8 weeks · Accelerated",
        "ic": "fa-regular fa-clock"
      },
      {
        "lbl": "Format",
        "val": "Mentor-led + LMS",
        "ic": "fa-solid fa-chalkboard-user"
      },
      {
        "lbl": "Projects",
        "val": "Internship + projects",
        "ic": "fa-solid fa-diagram-project"
      },
      {
        "lbl": "Certificate",
        "val": "Verified certificate",
        "ic": "fa-solid fa-award"
      }
    ],
    "modules": [
      {
        "code": "M01",
        "topics": 4,
        "title": "AI Overview & Core Ideas",
        "items": [
          "AI evolution and key milestones",
          "Where AI is applied today",
          "Ethics and responsible use",
          "Environment setup for AI work"
        ],
        "deliverables": [
          "Skill checkpoint",
          "Setup + onboarding"
        ]
      },
      {
        "code": "M02",
        "topics": 3,
        "title": "Python Toolkit for AI",
        "items": [
          "NumPy, pandas, and data handling",
          "Visualizing data for ML",
          "Working with notebooks"
        ],
        "deliverables": [
          "Guided exercise",
          "Peer review"
        ]
      },
      {
        "code": "M03",
        "topics": 4,
        "title": "Machine Learning Foundations",
        "items": [
          "Supervised vs. unsupervised learning",
          "Model training and evaluation",
          "Feature engineering basics",
          "Common pitfalls and overfitting"
        ],
        "deliverables": [
          "Project milestone",
          "Mentor checkpoint"
        ]
      },
      {
        "code": "M04",
        "topics": 3,
        "title": "Deep Learning Foundations",
        "items": [
          "Neural network fundamentals",
          "Training with backpropagation",
          "Frameworks: PyTorch/TensorFlow basics"
        ],
        "deliverables": [
          "Project milestone",
          "Code review"
        ]
      },
      {
        "code": "M05",
        "topics": 3,
        "title": "Natural Language Processing",
        "items": [
          "Text preprocessing and embeddings",
          "Transformer models (overview)",
          "Building a simple NLP pipeline"
        ],
        "deliverables": [
          "Mini project",
          "Mentor checkpoint"
        ]
      },
      {
        "code": "M06",
        "topics": 3,
        "title": "Capstone & Deployment",
        "items": [
          "Choosing and scoping your capstone",
          "Deploying a model (overview)",
          "Presenting your work"
        ],
        "deliverables": [
          "Capstone project",
          "Certificate-ready review"
        ]
      }
    ],
    "projects": [
      {
        "title": "Text Summarization Model",
        "desc": "Train a model that condenses long articles into clear summaries."
      },
      {
        "title": "Medical Imaging Classifier",
        "desc": "Build a model that flags anomalies in sample diagnostic images."
      },
      {
        "title": "Conversational AI Assistant",
        "desc": "Design and ship a domain-specific chatbot with guided flows."
      },
      {
        "title": "Recommendation Engine",
        "desc": "Build a recommender system from a sample product/interaction dataset."
      },
      {
        "title": "Sentiment Analysis Tool",
        "desc": "Classify sentiment across a real-world text dataset with evaluation."
      },
      {
        "title": "Image Classifier",
        "desc": "Train and evaluate a computer-vision model on a labeled image set."
      }
    ],
    "faqs": [
      {
        "q": "Do I need a coding background for this track?",
        "a": "Basic Python helps but isn't required. Module 2 builds the Python foundation you'll use throughout."
      },
      {
        "q": "What math is involved?",
        "a": "We cover the intuition behind linear algebra, probability, and calculus as needed — this isn't a pure math course."
      },
      {
        "q": "What do I walk away with?",
        "a": "A capstone project, a portfolio of smaller builds, and a mentor-reviewed certificate tied to your actual deliverables."
      }
    ]
  }
};

export const PROGRAM_META: Record<string, { title: string; icon: string; desc: string; orbitIcons: string[] }> = {
  "aws-cloud": {
    "title": "AWS Cloud",
    "icon": "fa-brands fa-aws",
    "desc": "Learn core AWS services, infrastructure-as-code, and how to run production workloads reliably in the cloud.",
    "orbitIcons": [
      "fa-solid fa-server",
      "fa-solid fa-cloud",
      "fa-solid fa-lock",
      "fa-solid fa-network-wired",
      "fa-solid fa-database",
      "fa-solid fa-gears",
      "fa-solid fa-chart-line"
    ]
  },
  "programming-in-java": {
    "title": "Programming in Java",
    "icon": "fa-brands fa-java",
    "desc": "Build a strong foundation in Java — OOP, collections, and multithreading — through hands-on, reviewed practice.",
    "orbitIcons": [
      "fa-brands fa-java",
      "fa-solid fa-code",
      "fa-solid fa-cubes",
      "fa-solid fa-bug",
      "fa-solid fa-layer-group",
      "fa-solid fa-gears",
      "fa-solid fa-diagram-project"
    ]
  },
  "programming-in-python": {
    "title": "Programming in Python",
    "icon": "fa-brands fa-python",
    "desc": "Go from Python fundamentals to applied scripting, data analysis, and automation with mentor feedback.",
    "orbitIcons": [
      "fa-brands fa-python",
      "fa-solid fa-chart-line",
      "fa-solid fa-table",
      "fa-solid fa-code",
      "fa-solid fa-microchip",
      "fa-solid fa-database",
      "fa-solid fa-flask"
    ]
  },
  "graphic-designing": {
    "title": "Graphic Designing",
    "icon": "fa-solid fa-pen-nib",
    "desc": "Learn Figma, branding fundamentals, and design systems to ship visual work that holds up in a real portfolio.",
    "orbitIcons": [
      "fa-solid fa-pen-nib",
      "fa-solid fa-palette",
      "fa-solid fa-shapes",
      "fa-solid fa-swatchbook",
      "fa-solid fa-layer-group",
      "fa-solid fa-image",
      "fa-solid fa-vector-square"
    ]
  },
  "cyber-security": {
    "title": "Cyber Security & Ethical Hacking",
    "icon": "fa-solid fa-user-shield",
    "desc": "Learn defensive fundamentals and ethical hacking practice — from threat basics to hands-on labs.",
    "orbitIcons": [
      "fa-solid fa-shield-halved",
      "fa-solid fa-lock",
      "fa-solid fa-bug",
      "fa-solid fa-network-wired",
      "fa-solid fa-key",
      "fa-solid fa-user-secret",
      "fa-solid fa-terminal"
    ]
  },
  "devops": {
    "title": "DevOps",
    "icon": "fa-solid fa-infinity",
    "desc": "Build real CI/CD pipelines and learn the deployment and reliability practices behind shipping software safely.",
    "orbitIcons": [
      "fa-solid fa-infinity",
      "fa-brands fa-docker",
      "fa-solid fa-server",
      "fa-solid fa-cloud",
      "fa-solid fa-code-branch",
      "fa-solid fa-gears",
      "fa-solid fa-chart-line"
    ]
  },
  "dsa-system-design": {
    "title": "DSA + System Design",
    "icon": "fa-solid fa-sitemap",
    "desc": "Sharpen data structures and algorithms, then learn to design systems that scale — the core of technical interviews.",
    "orbitIcons": [
      "fa-solid fa-sitemap",
      "fa-solid fa-code",
      "fa-solid fa-server",
      "fa-solid fa-diagram-project",
      "fa-solid fa-database",
      "fa-solid fa-network-wired",
      "fa-solid fa-scale-balanced"
    ]
  },
  "machine-learning": {
    "title": "Machine Learning",
    "icon": "fa-solid fa-microchip",
    "desc": "Learn to train, evaluate, and ship machine learning models with a project-first, mentor-reviewed approach.",
    "orbitIcons": [
      "fa-solid fa-microchip",
      "fa-brands fa-python",
      "fa-solid fa-chart-line",
      "fa-solid fa-table",
      "fa-solid fa-brain",
      "fa-solid fa-flask",
      "fa-solid fa-diagram-project"
    ]
  },
  "data-science": {
    "title": "Data Science",
    "icon": "fa-solid fa-database",
    "desc": "Go from raw data to real insight — statistics, analysis, and modeling applied to real-world datasets.",
    "orbitIcons": [
      "fa-solid fa-database",
      "fa-solid fa-chart-line",
      "fa-brands fa-python",
      "fa-solid fa-table",
      "fa-solid fa-magnifying-glass-chart",
      "fa-solid fa-flask",
      "fa-solid fa-server"
    ]
  },
  "data-analytics": {
    "title": "Data Analytics",
    "icon": "fa-solid fa-chart-simple",
    "desc": "Turn raw numbers into dashboards and decisions — metrics, visualization, and business-facing analysis.",
    "orbitIcons": [
      "fa-solid fa-chart-simple",
      "fa-solid fa-table",
      "fa-solid fa-magnifying-glass-chart",
      "fa-solid fa-database",
      "fa-solid fa-chart-pie",
      "fa-solid fa-filter",
      "fa-solid fa-diagram-project"
    ]
  },
  "ui-ux": {
    "title": "UI / UX",
    "icon": "fa-solid fa-swatchbook",
    "desc": "Design usable, well-crafted product experiences — research, wireframes, and high-fidelity UI, reviewed by mentors.",
    "orbitIcons": [
      "fa-solid fa-swatchbook",
      "fa-solid fa-pen-nib",
      "fa-solid fa-shapes",
      "fa-solid fa-mobile-screen",
      "fa-solid fa-layer-group",
      "fa-solid fa-vector-square",
      "fa-solid fa-magnifying-glass"
    ]
  }
};
