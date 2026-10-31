/* Per-program syllabus. One string per module: "Module title | topic; topic | deliverable; deliverable".
   Parsed by lib/program.ts. Do not use "|" or ";" inside a title or topic. */
export const SYLLABUS: Record<string, string[]> = {
  "ai-generative-agentic": [
    "Generative AI Foundations | How large language models work; Tokens, context windows and sampling; Model families and trade-offs; Setting up an API workspace | Concept quiz; Workspace setup",
    "Prompt Engineering | Instruction and role design; Few-shot and chain-of-thought patterns; Structured (JSON) outputs; Prompt testing and versioning | Prompt library; Evaluation sheet",
    "Embeddings & Vector Search | Text embeddings explained; Chunking strategies; Vector databases and indexing; Similarity search tuning | Search prototype; Chunking comparison",
    "Retrieval-Augmented Generation | RAG pipeline architecture; Retrievers, re-rankers and citations; Grounding and reducing hallucination; Evaluating answer quality | Document Q&A bot; Eval report",
    "Tool Use & Function Calling | Designing tool schemas; Calling APIs from a model; Error handling and retries; Guardrails for tool safety | Tool-using assistant; Test cases",
    "Agentic Workflows | Planning and reasoning loops; Memory and state; Multi-step and multi-agent patterns; Human-in-the-loop checkpoints | Research agent; Workflow diagram",
    "Evaluation, Safety & Cost | Automated and human evals; Prompt-injection and data-leak risks; Latency and token cost control; Monitoring in production | Safety checklist; Cost dashboard",
    "Capstone: Deploy an AI Product | Scoping a real use case; Building the backend and UI; Deployment and observability; Demo and mentor review | Live demo; Capstone review"
  ],
  "full-stack-web-development": [
    "Web Fundamentals | How the web works (HTTP, DNS, browsers); Semantic HTML; Modern CSS layout with Flexbox and Grid; Git and GitHub workflow | Static portfolio page; Git repository",
    "JavaScript Essentials | Types, functions and scope; DOM manipulation and events; Async JS, promises and fetch; ES modules and tooling | Interactive to-do app; Code review",
    "Front-End with React | Components, props and state; Hooks and effects; Routing and forms; State management patterns | Multi-page React app; Component library",
    "Back-End with Node & Express | REST API design; Routing, middleware and validation; Authentication with JWT; Error handling and logging | Working REST API; Postman collection",
    "Databases | Relational modelling with SQL; MongoDB and document design; ORM / ODM usage; Indexing and query basics | Schema design; Data-backed API",
    "Testing & Quality | Unit and integration tests; API testing; Linting and formatting; Debugging in browser and server | Test suite; Coverage report",
    "Deployment & DevOps Basics | Environment configuration; Docker basics; CI/CD with GitHub Actions; Hosting front end and back end | Deployed application; CI pipeline",
    "Capstone: Production-Style App | Requirement scoping; Auth, CRUD and payments flow; Performance and security pass; Demo and code review | Live full-stack app; Capstone review"
  ],
  "front-end-web-development": [
    "HTML & Accessibility | Semantic structure; Forms and validation; ARIA and keyboard navigation; SEO fundamentals | Accessible landing page; Audit notes",
    "CSS & Responsive Design | Flexbox, Grid and container queries; Custom properties and theming; Animations and transitions; Mobile-first strategy | Responsive site; Design token file",
    "JavaScript Deep Dive | Closures, prototypes and this; Async patterns and fetch; Browser storage and APIs; Modules and bundlers | Data-driven widget; Code review",
    "React Foundations | Components and JSX; State, props and hooks; Lists, forms and controlled inputs; Routing | Multi-view React app; Component checklist",
    "State, Data & Performance | Context and reducer patterns; Data fetching and caching; Memoization and lazy loading; Core Web Vitals | Optimised dashboard; Lighthouse report",
    "Testing & Tooling | Component tests; End-to-end tests; TypeScript basics; Linting and CI checks | Test suite; Typed component set",
    "Deploy & Portfolio | Build and deploy pipelines; Preview environments; Case-study writing; Final code review | Deployed portfolio; Case study"
  ],
  "android-app-development": [
    "Kotlin Fundamentals | Variables, null safety and functions; Classes, data classes and collections; Coroutines basics; Android Studio setup | Kotlin exercises; Emulator run",
    "UI with Jetpack Compose | Composables and layouts; State and recomposition; Navigation between screens; Material design and theming | Multi-screen UI; Design review",
    "App Architecture | MVVM pattern; ViewModel and LiveData / Flow; Dependency injection basics; Repository pattern | Architected sample app; Diagram",
    "Data & Networking | Room local database; Retrofit and REST APIs; JSON parsing; Offline-first caching | News or catalogue app; API integration",
    "Firebase & Services | Firebase Authentication; Firestore and storage; Push notifications; Background work with WorkManager | Auth + cloud sync; Notification demo",
    "Quality & Release | Unit and UI tests; Debugging and profiling; App signing and versioning; Play Store listing checklist | Test suite; Release build",
    "Capstone: Publish-Ready App | Product scoping; Full feature build; Performance and battery pass; Demo and mentor review | Working APK; Capstone review"
  ],
  "cloud-computing": [
    "Cloud Fundamentals | Service and deployment models; Shared responsibility model; Regions, zones and pricing; Choosing a cloud provider | Concept quiz; Cost estimate",
    "Compute & Storage | Virtual machines and images; Containers and orchestration overview; Object, block and file storage; Autoscaling basics | Deployed VM; Storage plan",
    "Networking & Security | VPCs, subnets and routing; Load balancers and DNS; Identity and access management; Encryption and secrets | Network diagram; IAM policy set",
    "Databases & Serverless | Managed SQL and NoSQL; Serverless functions and events; Queues and messaging; API gateways | Serverless API; Data flow map",
    "Infrastructure as Code | Declarative provisioning; Terraform basics; Environments and state; Reviewing infrastructure changes | IaC module; Pull-request review",
    "Monitoring & Cost | Logging and metrics; Alerts and dashboards; Cost allocation and budgets; Backup and disaster recovery | Dashboard; Cost report",
    "Capstone: Cloud-Native Deployment | Architecture design; Build and deploy the stack; Security and cost review; Presentation | Live deployment; Architecture review"
  ],
  "aws-cloud": [
    "AWS Foundations | Global infrastructure and regions; IAM users, roles and policies; Billing and Free Tier hygiene; Console, CLI and SDK | Account setup; IAM policy set",
    "Compute with EC2 & Containers | EC2 instances and AMIs; Auto Scaling and load balancing; ECS and container basics; Lambda functions | Scaled web tier; Lambda demo",
    "Storage & Databases | S3 buckets, lifecycle and versioning; EBS and EFS; RDS and Aurora; DynamoDB design | Static site on S3; Data-store comparison",
    "Networking & Security | VPC, subnets and gateways; Security groups and NACLs; Route 53 and CloudFront; KMS and Secrets Manager | Private network design; Security review",
    "Serverless & Integration | API Gateway and Lambda; SQS, SNS and EventBridge; Step Functions; Event-driven design | Serverless API; Event diagram",
    "Infrastructure as Code & CI/CD | CloudFormation and Terraform; CodePipeline and CodeBuild; Blue/green deployments; Environment strategy | IaC stack; Working pipeline",
    "Operations & Well-Architected | CloudWatch metrics and alarms; Cost Explorer and budgets; Well-Architected pillars; Backup and recovery | Ops dashboard; Architecture review",
    "Capstone: Production Workload on AWS | Design for reliability; Build, secure and deploy; Load test and tune; Mentor review | Live deployment; Capstone review"
  ],
  "programming-in-java": [
    "Java Basics | JDK, tooling and first program; Types, operators and control flow; Methods and arrays; Strings and input handling | Console problems; Code review",
    "Object-Oriented Programming | Classes and objects; Inheritance and polymorphism; Interfaces and abstract classes; Encapsulation and design principles | OOP mini-project; UML sketch",
    "Collections & Generics | Lists, sets and maps; Iterators and comparators; Generics and wildcards; Choosing the right collection | Data manager app; Complexity notes",
    "Exceptions, I/O & Streams | Exception handling patterns; File and stream I/O; Lambdas and Stream API; Optional and functional style | File-processing tool; Stream refactor",
    "Multithreading & Concurrency | Threads and executors; Synchronization and locks; Concurrent collections; Common concurrency bugs | Concurrent task runner; Race-condition fix",
    "Databases with JDBC | Relational basics; JDBC and connection pooling; Transactions; Intro to JPA / Hibernate | CRUD data layer; Schema design",
    "Testing & Build Tools | JUnit and Mockito; Maven and Gradle; Logging and debugging; Code quality tooling | Test suite; Build configuration",
    "Capstone: Java Application | Requirements and design; Layered implementation; Testing and documentation; Demo and review | Working application; Capstone review"
  ],
  "programming-in-python": [
    "Python Fundamentals | Syntax, types and control flow; Functions and modules; Strings, lists, dicts and sets; Virtual environments | Practice set; Environment setup",
    "Data Structures & Idioms | Comprehensions and generators; Sorting and searching; Error handling; Writing readable Pythonic code | Utility library; Code review",
    "Object-Oriented Python | Classes and dunder methods; Inheritance and composition; Dataclasses and typing; Design patterns in practice | OOP project; Type-checked module",
    "Files, APIs & Automation | File and CSV / JSON handling; Requests and REST APIs; Web scraping basics; Scheduling and scripting | Automation script; API client",
    "Data Analysis with NumPy & Pandas | Arrays and vectorization; DataFrames and cleaning; Grouping and joins; Visualization with Matplotlib | Analysis notebook; Charts report",
    "Testing & Packaging | pytest and fixtures; Logging and debugging; Packaging and dependencies; Git workflow | Tested package; Repo review",
    "Intro to Web & ML | Flask / FastAPI basics; Building a small API; First ML model with scikit-learn; Model evaluation basics | API service; Model notebook",
    "Capstone: Applied Python Project | Problem scoping; Implementation and tests; Documentation; Demo and mentor review | Working project; Capstone review"
  ],
  "graphic-designing": [
    "Design Foundations | Layout, hierarchy and alignment; Colour theory and contrast; Typography pairing; Visual composition | Composition exercises; Style board",
    "Figma Essentials | Frames, auto layout and constraints; Components and variants; Vector tools and effects; Prototyping basics | Figma file; Component set",
    "Brand Identity Design | Brand strategy and moodboards; Logo design process; Colour and type systems; Brand guidelines | Logo suite; Brand guide",
    "Marketing & Social Design | Social post and ad formats; Poster and flyer layouts; Carousel and story design; Export and file specs | Campaign kit; Asset pack",
    "Illustration & Imagery | Vector illustration basics; Photo editing and retouching; Icon design; Using mockups | Icon set; Illustrated piece",
    "Design Systems | Tokens, styles and libraries; Documentation; Accessibility and contrast checks; Handoff to developers | Mini design system; Handoff notes",
    "Portfolio & Freelancing | Case study writing; Portfolio site setup; Client briefs and pricing; Presenting your work | Portfolio; Mock client brief"
  ],
  "cyber-security": [
    "Security Fundamentals | CIA triad and threat models; Common attack types; Security frameworks overview; Lab environment setup | Threat model; Lab setup",
    "Networking for Security | TCP/IP and protocols; DNS, HTTP and TLS; Packet analysis with Wireshark; Firewalls and segmentation | Packet capture report; Network map",
    "Linux & System Security | Linux command line; Users, permissions and hardening; Logging and auditing; Windows security basics | Hardened server; Audit checklist",
    "Web Application Security | OWASP Top 10; Injection and XSS; Authentication and session flaws; Testing with Burp Suite | Vulnerability write-up; Fixed sample app",
    "Ethical Hacking Methodology | Reconnaissance and scanning; Enumeration; Exploitation basics in a lab; Reporting findings responsibly | Lab pentest; Findings report",
    "Defensive Operations | Monitoring and SIEM basics; Incident response process; Malware analysis overview; Digital forensics intro | Incident timeline; Detection rules",
    "Cryptography & Identity | Symmetric and public-key crypto; Hashing and certificates; SSO and MFA; Secrets management | Crypto exercises; Identity design",
    "Capstone: Security Assessment | Scoping an authorised assessment; Testing and analysis; Remediation plan; Presentation | Assessment report; Capstone review"
  ],
  "devops": [
    "DevOps Culture & Git | DevOps lifecycle and principles; Git branching strategies; Pull-request workflows; Agile delivery basics | Branching workflow; Team repo",
    "Linux & Scripting | Shell and command line; Bash scripting; Processes, networking and services; Package management | Automation scripts; Server checklist",
    "CI/CD Pipelines | Build and test automation; GitHub Actions / Jenkins; Artifacts and versioning; Deployment strategies | Working pipeline; Release notes",
    "Containers with Docker | Images and Dockerfiles; Networking and volumes; Docker Compose; Registry and image security | Containerised app; Compose stack",
    "Kubernetes Essentials | Pods, deployments and services; ConfigMaps and secrets; Scaling and rolling updates; Helm basics | Cluster deployment; Manifest set",
    "Infrastructure as Code | Terraform fundamentals; Modules and state; Configuration management with Ansible; Environment promotion | IaC repo; Provisioned environment",
    "Monitoring & Reliability | Metrics with Prometheus and Grafana; Central logging; Alerting and on-call basics; SLOs and postmortems | Dashboard; Postmortem draft",
    "Capstone: End-to-End Delivery | Design the delivery pipeline; Automate build, test and deploy; Observability setup; Demo and review | Live pipeline; Capstone review"
  ],
  "dsa-system-design": [
    "Complexity & Problem Solving | Big-O analysis; Problem-solving framework; Arrays and strings; Two pointers and sliding window | Problem set; Complexity notes",
    "Linked Lists, Stacks & Queues | Linked list operations; Stack and queue patterns; Monotonic stacks; Practical use cases | Problem set; Mock interview",
    "Trees & Graphs | Binary trees and BSTs; Traversals; Graph representations; BFS, DFS and shortest paths | Problem set; Graph project",
    "Recursion, DP & Greedy | Recursion and backtracking; Dynamic programming patterns; Greedy strategies; Optimisation techniques | Problem set; Pattern cheat sheet",
    "Sorting, Searching & Heaps | Sorting algorithms compared; Binary search variants; Heaps and priority queues; Tries and hashing | Problem set; Timed contest",
    "System Design Fundamentals | Scalability and load balancing; Caching and CDNs; Databases, sharding and replication; API design | Design write-up; Architecture diagram",
    "Designing Real Systems | URL shortener and rate limiter; News feed and chat systems; Queues, streams and consistency; Trade-off discussions | Two design docs; Mock design round",
    "Interview Readiness | Mock coding interviews; Mock design interviews; Behavioural preparation; Resume review | Mock reports; Final feedback"
  ],
  "machine-learning": [
    "ML Foundations | Types of machine learning; Python, NumPy and Pandas refresher; Math essentials; Project workflow | Setup notebook; Math quiz",
    "Data Preparation | Cleaning and missing values; Feature engineering; Encoding and scaling; Train, validation and test splits | Clean dataset; Feature notebook",
    "Supervised Learning | Linear and logistic regression; Decision trees and forests; Gradient boosting; Cross-validation | Prediction model; Model comparison",
    "Unsupervised Learning | Clustering methods; Dimensionality reduction; Anomaly detection; Recommendation basics | Segmentation project; PCA notebook",
    "Model Evaluation & Tuning | Metrics for classification and regression; Bias, variance and overfitting; Hyperparameter tuning; Explainability | Evaluation report; Tuned model",
    "Deep Learning Basics | Neural networks and backpropagation; CNNs for images; Sequence models overview; Frameworks: PyTorch or TensorFlow | Image classifier; Training log",
    "MLOps & Deployment | Saving and serving models; APIs with FastAPI; Docker basics; Monitoring and drift | Deployed model API; Deployment notes",
    "Capstone: End-to-End ML Project | Problem framing; Data to model pipeline; Deployment and documentation; Demo and review | Working ML system; Capstone review"
  ],
  "data-science": [
    "Data Science Foundations | The data science lifecycle; Python and Jupyter workflow; Data types and sources; Reproducible work | Setup notebook; Workflow diagram",
    "Statistics & Probability | Descriptive statistics; Probability distributions; Hypothesis testing; Confidence intervals | Stats exercises; A/B test analysis",
    "Data Wrangling & SQL | Cleaning with Pandas; SQL joins and aggregations; Handling messy real data; Data quality checks | Cleaned dataset; SQL report",
    "Exploration & Visualization | Exploratory data analysis; Matplotlib, Seaborn and Plotly; Storytelling with data; Dashboard basics | EDA notebook; Insight deck",
    "Predictive Modelling | Regression and classification; Feature selection; Model validation; Interpreting results | Prediction project; Model report",
    "Advanced Topics | Time-series analysis; Text data and NLP basics; Clustering and segmentation; Working with big data tools | Forecast notebook; NLP mini-project",
    "Communication & Deployment | Executive summaries; Interactive apps with Streamlit; Version control for analysis; Ethics and privacy | Streamlit app; Presentation",
    "Capstone: Data Science Case Study | Business question framing; Full analysis pipeline; Recommendations; Mentor review | Case study; Capstone review"
  ],
  "data-analytics": [
    "Analytics Foundations | Roles and the analytics workflow; KPIs and metrics; Spreadsheet essentials; Data types and sources | Metrics glossary; Spreadsheet model",
    "SQL for Analysts | SELECT, filtering and sorting; Joins and aggregations; Window functions; Query optimisation basics | SQL problem set; Business query report",
    "Excel & Data Cleaning | Formulas and lookups; Pivot tables and charts; Power Query cleaning; Data validation | Cleaned workbook; Pivot report",
    "Visualization with Power BI / Tableau | Data modelling; Charts and dashboards; DAX or calculated fields; Design for readability | Interactive dashboard; Design review",
    "Python for Analysis | Pandas essentials; Descriptive and exploratory analysis; Automating reports; Visualization libraries | Analysis notebook; Automated report",
    "Business Analytics | Funnel and cohort analysis; A/B testing basics; Forecasting fundamentals; Turning data into recommendations | Cohort analysis; Recommendation memo",
    "Capstone: Analytics Project | Business problem framing; Build the dashboard and analysis; Present insights; Mentor review | Portfolio dashboard; Capstone review"
  ],
  "ui-ux": [
    "UX Foundations | The design thinking process; Users, personas and problem framing; Heuristics and usability principles; Design critique | Problem statement; Persona set",
    "User Research | Interviews and surveys; Competitive analysis; Affinity mapping and insights; Journey maps | Research summary; Journey map",
    "Information Architecture & Flows | Sitemaps and navigation; User flows; Low-fidelity wireframes; Content structure | Flow diagram; Wireframe set",
    "Visual & UI Design | Layout, grids and spacing; Typography and colour; Components and states; Iconography | High-fidelity screens; Style guide",
    "Figma & Prototyping | Auto layout and variants; Interactive prototypes; Micro-interactions; Responsive design | Clickable prototype; Component library",
    "Usability Testing & Iteration | Test planning; Moderated and unmoderated tests; Analysing findings; Design iteration | Test report; Revised design",
    "Design Systems & Handoff | Tokens and style libraries; Accessibility standards; Developer handoff; Documentation | Mini design system; Handoff file",
    "Capstone: End-to-End Product Design | Research to final UI; Case-study writing; Portfolio presentation; Mentor review | Portfolio case study; Capstone review"
  ],
  "embedded-systems": [
    "Electronics Foundations | Voltage, current and circuit laws; Passive and active components; Reading schematics; Breadboarding and measurement | Circuit build; Lab log",
    "C for Embedded | Data types and bit manipulation; Pointers and memory; Structs and state machines; Toolchains and debugging | Firmware exercises; Code review",
    "Microcontroller Architecture | CPU, memory and buses; GPIO and clocks; Timers and interrupts; Low-power modes | GPIO and timer demo; Datasheet notes",
    "Peripherals & Communication | ADC and DAC; UART, SPI and I2C; PWM and motor control; Sensor interfacing | Sensor node; Protocol capture",
    "RTOS & Firmware Design | Tasks, scheduling and priorities; Queues and semaphores; Driver layering; Watchdogs and fault handling | RTOS application; Design notes",
    "Testing & Debugging | Logic analyser and oscilloscope use; Unit testing firmware; Power profiling; Bootloaders and updates | Debug report; Test plan",
    "Capstone: Embedded Product | Requirements and block diagram; Firmware and hardware bring-up; Validation; Demo and review | Working prototype; Capstone review"
  ],
  "power-systems": [
    "Power System Basics | AC circuits and phasors; Three-phase systems; Per-unit system; Power, energy and losses | Problem set; Single-line diagram",
    "Generation | Thermal, hydro and nuclear plants; Solar and wind generation; Grid integration of renewables; Energy storage overview | Generation comparison; Site study",
    "Transmission & Distribution | Line parameters; Voltage regulation; Cables and insulators; Distribution network design | Line calculations; Network sketch",
    "Load Flow & Fault Analysis | Bus classification; Gauss-Seidel and Newton-Raphson; Symmetrical faults; Unsymmetrical faults | Load-flow study; Fault report",
    "Protection & Switchgear | Relays and circuit breakers; Protection schemes; Grounding and earthing; Surge protection | Protection scheme; Coordination sheet",
    "Simulation Tools | Modelling in MATLAB / Simulink; Power-flow tools; Interpreting results; Documenting studies | Simulation model; Results write-up",
    "Capstone: Substation or Microgrid Study | Design brief; Load and generation modelling; Protection and safety review; Presentation | Study report; Capstone review"
  ],
  "iot-systems": [
    "IoT Fundamentals | IoT architecture layers; Sensors and actuators; Edge, fog and cloud; Use cases and constraints | Architecture sketch; Use-case brief",
    "Devices & Firmware | Working with ESP32 / Arduino; Reading sensors; Power and battery design; OTA updates | Sensor prototype; Firmware repo",
    "Connectivity | Wi-Fi, BLE and LoRa; MQTT and CoAP; Gateways and provisioning; Reliability and retries | Connected node; Protocol notes",
    "Cloud & Data Pipelines | Device registries and brokers; Time-series storage; Rules and alerts; Data ingestion patterns | Live data pipeline; Alert rules",
    "Dashboards & Analytics | Building dashboards; Visualising time series; Basic anomaly detection; Reporting | IoT dashboard; Insight summary",
    "Security & Scaling | Device identity and certificates; Secure communication; Fleet management; Privacy considerations | Threat checklist; Security review",
    "Capstone: Connected Product | Problem and requirement definition; Hardware, cloud and app build; Field-style testing; Demo and review | Working IoT system; Capstone review"
  ],
  "vlsi-design": [
    "Digital Logic Foundations | Number systems and Boolean algebra; Combinational circuits; Sequential circuits; Timing basics | Logic problem set; Circuit design",
    "Verilog HDL | Modules, ports and data types; Behavioural and structural modelling; Testbenches; Synthesizable coding style | RTL modules; Testbench",
    "FPGA & Prototyping | FPGA architecture; Synthesis and implementation; Constraints and timing; On-board debugging | FPGA demo; Timing report",
    "CMOS & Circuit Basics | MOS transistor behaviour; CMOS gates; Delay and power; Layout basics | Gate-level design; Delay analysis",
    "RTL to GDS Flow | Synthesis overview; Floorplanning and placement; Clock tree and routing; Static timing analysis | Flow walkthrough; STA notes",
    "Verification | Simulation strategies; Assertions and coverage; Debugging waveforms; Regression testing | Verification plan; Coverage report",
    "Capstone: Digital Block Design | Specification; RTL design and verification; Synthesis and timing closure; Presentation | Verified design; Capstone review"
  ],
  "robotics-automation": [
    "Robotics Foundations | Robot types and applications; Kinematics basics; Sensors and actuators; Safety practices | Concept quiz; Component selection",
    "Control Systems | Feedback and stability; PID control; Modelling with transfer functions; Tuning and simulation | PID controller; Tuning report",
    "Electronics & Motor Drives | DC, stepper and servo motors; Motor drivers; Power supply design; Encoders | Motor control demo; Wiring diagram",
    "Programming Robots | Embedded C and Python; ROS basics; Sensor fusion overview; State machines | ROS node; Behaviour code",
    "Perception & Navigation | Cameras and LiDAR; Mapping and localisation; Path planning; Obstacle avoidance | Navigation demo; Mapping notes",
    "Industrial Automation | PLC basics and ladder logic; HMI and SCADA overview; Industrial sensors; Safety interlocks | PLC program; Process diagram",
    "Capstone: Autonomous System | System design; Build and integrate; Testing in simulation and hardware; Demo and review | Working robot or simulation; Capstone review"
  ],
  "cad-product-design": [
    "CAD Foundations | Interface and sketching; Constraints and dimensioning; Extrudes, revolves and sweeps; Reference geometry | Part models; Sketch checklist",
    "Part & Assembly Modelling | Feature-based modelling; Assembly mates; Motion study basics; Configurations | Assembly model; Mate report",
    "Engineering Drawings & GD&T | Orthographic projection; Sectioning and dimensioning; GD&T symbols; Tolerance stack-ups | Drawing set; GD&T review",
    "Surfacing & Sheet Metal | Surface modelling; Sheet-metal design rules; Bends and flat patterns; Weldments | Enclosure model; Flat pattern",
    "Design for Manufacturing | DFM and DFA principles; Material selection; 3D printing and machining constraints; Cost estimation | DFM review; Cost sheet",
    "Simulation & Rendering | Basic FEA in CAD; Interpreting stress results; Photorealistic rendering; Presenting a design | FEA report; Render set",
    "Capstone: Product Design | Problem definition and concepts; Detailed CAD and drawings; Prototype-ready package; Review | Complete design package; Capstone review"
  ],
  "mechanical-design-fundamentals": [
    "Engineering Mechanics | Statics and equilibrium; Free-body diagrams; Friction and moments; Dynamics overview | Problem set; Worked examples",
    "Strength of Materials | Stress and strain; Bending and torsion; Deflection of beams; Failure theories | Beam analysis; Calculation sheet",
    "Materials & Selection | Metals, polymers and composites; Material properties and testing; Selection charts; Corrosion and fatigue | Selection report; Property comparison",
    "Machine Elements | Shafts, keys and couplings; Bearings and gears; Fasteners and welds; Springs and brakes | Component design; Design calculations",
    "Mechanisms & Kinematics | Linkages and cams; Velocity and acceleration analysis; Gear trains; Mechanism synthesis | Mechanism model; Motion analysis",
    "Design Process & Standards | Requirements and concept generation; Safety factors; Standards and codes; Design reviews | Design brief; Review notes",
    "Capstone: Mechanical Design Project | Concept selection; Detailed calculations; CAD and drawings; Presentation | Design report; Capstone review"
  ],
  "manufacturing-cam": [
    "Manufacturing Overview | Casting, forming and joining; Machining processes; Additive manufacturing; Process selection | Process comparison; Case notes",
    "Machining Fundamentals | Turning, milling and drilling; Cutting tools and materials; Speeds, feeds and depth of cut; Workholding | Machining plan; Parameter sheet",
    "CNC & G-code | CNC machine anatomy; G and M codes; Coordinate systems and offsets; Manual programming | G-code program; Simulation run",
    "CAM Toolpath Programming | Setup and stock definition; 2D and 3D toolpaths; Tool libraries; Post-processing | CAM project; Toolpath review",
    "Quality & Metrology | Measuring instruments; Inspection planning; SPC basics; Tolerances and fits | Inspection plan; Quality report",
    "Lean & Production Planning | Lean principles; Layout and workflow; Scheduling; Cost and time estimation | Process map; Cost estimate",
    "Capstone: Part Manufacturing Plan | Part analysis; Process planning; CAM programming; Presentation | Full process plan; Capstone review"
  ],
  "structural-design-basics": [
    "Structural Fundamentals | Types of structures; Loads: dead, live, wind and seismic; Equilibrium and reactions; Structural idealisation | Load calculations; Problem set",
    "Analysis of Determinate Structures | Beams, frames and trusses; Shear force and bending moment diagrams; Influence lines; Deflection methods | Analysis sheets; Diagram set",
    "Indeterminate Structures | Slope-deflection method; Moment distribution; Introduction to matrix methods; Software verification | Frame analysis; Software check",
    "RCC Design Basics | Concrete and steel properties; Limit state design; Beams and slabs; Columns and footings | Beam design; Slab design",
    "Steel Design Basics | Steel sections and connections; Tension and compression members; Beam design; Bolted and welded joints | Member design; Connection detail",
    "Codes & Software | Reading design codes; Modelling in structural software; Load combinations; Interpreting outputs | Software model; Output review",
    "Capstone: Building Frame Study | Structural layout; Loads and analysis; Member design; Presentation | Design report; Capstone review"
  ],
  "digital-marketing": [
    "Marketing Foundations | Funnel and customer journey; Audience research; Positioning and messaging; Setting goals and KPIs | Audience profile; Channel plan",
    "SEO & Content | Keyword research; On-page and technical SEO; Content strategy and calendars; Link building basics | SEO audit; Content calendar",
    "Paid Advertising | Search ads structure; Social ads and audiences; Creative and landing pages; Budgeting and bidding | Ad campaign; Budget plan",
    "Social Media & Community | Platform strategy; Content formats; Community management; Influencer basics | Social plan; Post set",
    "Email & Automation | List building; Email design and copy; Automation flows; Deliverability | Email sequence; Automation map",
    "Analytics & Optimisation | Google Analytics; Attribution and conversion tracking; A/B testing; Reporting dashboards | Analytics report; Test plan",
    "Capstone: Growth Campaign | Brief and strategy; Multi-channel execution plan; Measurement framework; Presentation | Campaign deck; Capstone review"
  ],
  "finance-investment": [
    "Finance Foundations | Financial statements; Time value of money; Risk and return; Financial markets overview | Statement analysis; Problem set",
    "Corporate Finance | Capital budgeting; Cost of capital; Working capital management; Capital structure | Project appraisal; Case notes",
    "Financial Modelling | Spreadsheet best practices; Three-statement models; Forecasting; Scenario and sensitivity analysis | Financial model; Assumptions sheet",
    "Valuation | DCF valuation; Comparable company analysis; Multiples and precedents; Valuation pitfalls | Valuation report; Comps table",
    "Markets & Portfolio Basics | Equity and debt instruments; Diversification; Risk metrics; Portfolio construction concepts | Portfolio exercise; Risk summary",
    "Ethics & Regulation | Investor protection principles; Professional ethics; Disclosure basics; Common misconduct cases | Ethics case reflection; Quiz",
    "Capstone: Company Analysis | Selecting a company; Financial analysis and valuation; Investment thesis; Presentation | Research report; Capstone review"
  ],
  "human-resources": [
    "HR Foundations | Role of HR in organisations; HR lifecycle; Labour law overview; HR metrics | HR process map; Quiz",
    "Talent Acquisition | Job analysis and descriptions; Sourcing strategies; Interview design; Selection and offers | Hiring plan; Interview kit",
    "Onboarding & Development | Onboarding design; Learning needs analysis; Training methods; Measuring impact | Onboarding programme; Training plan",
    "Performance & Rewards | Performance management cycles; Goals and feedback; Compensation and benefits; Recognition | Appraisal framework; Reward design",
    "Employee Relations & Culture | Engagement and retention; Conflict resolution; Diversity and inclusion; Policy writing | Engagement plan; Policy draft",
    "HR Analytics & Tools | HRIS overview; Attrition and hiring metrics; Dashboards; Data privacy | HR dashboard; Metrics report",
    "Capstone: HR Strategy Project | Diagnose an organisation; Design HR interventions; Roadmap and metrics; Presentation | HR strategy deck; Capstone review"
  ],
  "product-management": [
    "Product Foundations | What product managers do; Product lifecycle; Strategy and vision; Working with teams | Product teardown; Role map",
    "Customer Discovery | User interviews; Problem framing; Jobs to be done; Market and competitor analysis | Discovery report; Opportunity map",
    "Prioritisation & Roadmaps | Frameworks: RICE, MoSCoW and Kano; Roadmap types; Stakeholder alignment; Trade-off decisions | Prioritised backlog; Roadmap",
    "Specs & Delivery | PRDs and user stories; Working with design and engineering; Agile and sprint rituals; Release planning | PRD; Sprint plan",
    "Metrics & Experimentation | North-star and funnel metrics; A/B testing; Analytics tools; Data-informed decisions | Metrics tree; Experiment plan",
    "Go-to-Market | Positioning and pricing; Launch planning; Feedback loops; Post-launch review | Launch plan; Pricing note",
    "Capstone: Product Case | Pick a problem space; Discovery to roadmap; Spec and metrics; Presentation | Product case study; Capstone review"
  ],
  "business-analytics": [
    "Analytics for Business | Business questions to data questions; Metrics and KPIs; Data sources; Analytics workflow | KPI framework; Question brief",
    "Excel & SQL for Business | Spreadsheet modelling; Pivot tables; SQL queries for reporting; Data cleaning | Business workbook; SQL report",
    "Statistics for Decisions | Descriptive statistics; Probability and distributions; Hypothesis testing; Correlation and regression | Stats exercises; Analysis memo",
    "Visualisation & Dashboards | Choosing the right chart; Dashboard design; Power BI or Tableau; Storytelling | Business dashboard; Story deck",
    "Predictive & Prescriptive Basics | Forecasting; Segmentation; Optimisation concepts; Scenario planning | Forecast model; Segmentation summary",
    "Domain Applications | Marketing analytics; Operations analytics; Finance analytics; Customer analytics | Domain case; Findings brief",
    "Capstone: Decision Analytics | Frame the business problem; Data analysis and modelling; Recommendations; Presentation | Analytics report; Capstone review"
  ],
  "operations-management": [
    "Operations Foundations | Role of operations; Process types and layouts; Performance measures; Operations strategy | Process map; Quiz",
    "Process Design & Improvement | Flowcharts and bottlenecks; Lean principles; Six Sigma basics; Continuous improvement | Improvement plan; Bottleneck analysis",
    "Capacity & Scheduling | Capacity planning; Forecasting demand; Scheduling methods; Queueing basics | Capacity model; Schedule",
    "Quality Management | Quality tools and control charts; Root-cause analysis; Standards overview; Cost of quality | Quality plan; RCA report",
    "Inventory & Planning | Inventory models; MRP basics; Safety stock; ERP overview | Inventory model; Planning sheet",
    "Project & Change Management | Project planning; Risk management; Change management; Stakeholder communication | Project plan; Risk register",
    "Capstone: Operations Improvement | Diagnose a process; Design improvements; Business case; Presentation | Improvement proposal; Capstone review"
  ],
  "medical-coding": [
    "Healthcare & Anatomy Basics | Healthcare systems overview; Medical terminology; Anatomy and physiology essentials; Documentation types | Terminology quiz; Glossary",
    "Coding Foundations | Purpose of medical coding; Code sets overview; Guidelines and conventions; Ethics and compliance | Guideline notes; Quiz",
    "ICD-10 Coding | Structure and chapters; Diagnosis coding rules; Sequencing; Practice cases | Coding set; Case review",
    "CPT & HCPCS Coding | Procedure code structure; Evaluation and management; Modifiers; Practice cases | Coding set; Case review",
    "Billing & Revenue Cycle | Claim lifecycle; Payers and adjudication; Denials and appeals; Compliance and audits | Claim walkthrough; Denial analysis",
    "Tools & Accuracy | Encoder and EHR tools; Quality checks; Productivity benchmarks; Privacy basics | Tool exercise; Accuracy log",
    "Capstone: Coding Practicum | Mixed chart-coding set; Accuracy review; Feedback; Final assessment | Coded charts; Capstone review"
  ],
  "clinical-trial-research": [
    "Clinical Research Foundations | Drug development phases; Types of trials; Key roles and stakeholders; Terminology | Phase map; Quiz",
    "Ethics & Regulations | Good Clinical Practice; Informed consent; Ethics committees; Regulatory bodies overview | Consent review; Ethics case",
    "Protocol & Study Design | Protocol structure; Endpoints and objectives; Randomisation and blinding; Sample size basics | Protocol summary; Design critique",
    "Trial Conduct & Monitoring | Site selection and start-up; Monitoring visits; Source data verification; Deviations and CAPA | Monitoring report; CAPA draft",
    "Data Management & Safety | CRF design; Data cleaning; Adverse event reporting; Pharmacovigilance basics | CRF sample; Safety case",
    "Documentation & Quality | Trial master file; Audits and inspections; SOPs; Quality culture | TMF checklist; Audit prep",
    "Capstone: Trial Case Study | Case selection; End-to-end trial walkthrough; Risk assessment; Presentation | Case report; Capstone review"
  ],
  "psychology": [
    "Introduction to Psychology | Branches and history; Research methods; Biological bases of behaviour; Sensation and perception | Concept quiz; Reflection note",
    "Cognition & Learning | Attention and memory; Problem-solving; Learning theories; Motivation | Case notes; Study summary",
    "Developmental Psychology | Lifespan development; Attachment; Cognitive and social development; Adolescence and ageing | Timeline chart; Case analysis",
    "Personality & Social Psychology | Personality theories; Attitudes and persuasion; Group behaviour; Bias and stereotypes | Theory comparison; Observation report",
    "Mental Health Foundations | Common disorders overview; Assessment basics; Therapy approaches; Stigma and wellbeing | Case study; Approach comparison",
    "Research & Statistics | Study design; Descriptive and inferential statistics; Ethics in research; Reading papers | Mini study; Stats exercises",
    "Capstone: Applied Psychology Project | Choose a topic; Literature review; Applied proposal; Presentation | Project report; Capstone review"
  ]
};
