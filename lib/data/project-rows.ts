/* Project catalogue: original project briefs, 3 per program. Each row is
   "Level | Project title | What you build | Tool, Tool, Tool"  (Level = Minor, Major or Capstone).
   Add a row for a slug and it appears on the homepage Projects section and that program's page. */
export const PROJECT_ROWS: Record<string, string[]> = {
  "artificial-intelligence": [
    "Minor | Spam Message Detector | Train a text classifier that separates spam from genuine messages and report its precision and recall. | Python, scikit-learn, Pandas",
    "Major | Handwritten Digit Recogniser | Build and tune a small neural network on image data and explain where it goes wrong. | TensorFlow, Keras, NumPy",
    "Capstone | Customer Support Triage Assistant | Combine a classifier and a search step to route incoming tickets and suggest first replies. | Python, Flask, scikit-learn"
  ],
  "ai-generative-agentic": [
    "Minor | Prompt Playbook for a Real Task | Design, test and score a set of prompts for summarising, extracting and rewriting documents. | LLM APIs, Python, Notebooks",
    "Major | Document Q&A with Retrieval | Index a set of PDFs and answer questions with cited passages, measuring how often the answer is right. | LangChain, Vector DB, FastAPI",
    "Capstone | Research Agent with Tools | Build an agent that plans steps, calls tools, checks its own output and logs every decision. | Agents, Function calling, Evals"
  ],
  "full-stack-web-development": [
    "Minor | Personal Portfolio Site | Design, build and deploy a responsive portfolio with a working contact form. | HTML, CSS, JavaScript",
    "Major | Task and Team Board | Ship a multi-user board with sign-in, roles, drag-and-drop and a REST API behind it. | React, Node.js, MongoDB",
    "Capstone | Online Store with Payments | Build a catalogue, cart, order flow and admin panel, then deploy it with a test payment gateway. | React, Express, PostgreSQL"
  ],
  "front-end-web-development": [
    "Minor | Responsive Landing Page | Recreate a design brief pixel-faithfully for mobile, tablet and desktop. | HTML, CSS, Flexbox/Grid",
    "Major | Movie Explorer App | Fetch data from a public API with search, filters, pagination and a favourites list. | React, REST APIs, Hooks",
    "Capstone | Component Library and Docs Site | Publish a small, accessible component library with a live documentation site and tests. | React, Storybook, Testing Library"
  ],
  "android-app-development": [
    "Minor | Expense Tracker | Record spending locally, group it by category and show a monthly summary. | Kotlin, Room, Jetpack Compose",
    "Major | Chat and Notes App | Sign users in, sync notes to the cloud and send push notifications. | Kotlin, Firebase, Material Design",
    "Capstone | Publish-Ready Service Booking App | Ship a full app with maps, bookings and offline support, prepared for Play Store review. | Kotlin, Maps SDK, Firebase"
  ],
  "cloud-computing": [
    "Minor | Static Site on Object Storage | Host a website on cloud storage with a CDN, a custom domain and HTTPS. | Cloud storage, CDN, DNS",
    "Major | Three-Tier App Deployment | Deploy a web app with load balancer, app servers and a managed database on a private network. | VMs, Load balancer, Managed DB",
    "Capstone | Cost-Aware Cloud Architecture | Design, build and document a highly available system, then cut its monthly bill with measured changes. | Terraform, Monitoring, Budgets"
  ],
  "aws-cloud": [
    "Minor | Serverless Image Resizer | Resize uploaded images automatically using events, a function and storage. | S3, Lambda, IAM",
    "Major | Scalable Web App on AWS | Run an app behind a load balancer with auto scaling, a database and alarms. | EC2, ALB, RDS, CloudWatch",
    "Capstone | Infrastructure as Code Platform | Define a full production environment as code with separate staging and prod stacks. | CloudFormation, VPC, CodePipeline"
  ],
  "programming-in-java": [
    "Minor | Library Management Console App | Model books, members and loans with clean object-oriented design and unit tests. | Java, OOP, JUnit",
    "Major | Concurrent File Processor | Process many files in parallel, handle failures safely and measure the speed-up. | Collections, Threads, Streams",
    "Capstone | Banking Service with REST API | Build a layered service with validation, persistence and automated tests. | Spring Boot, JPA, MySQL"
  ],
  "programming-in-python": [
    "Minor | Command-Line Budget Planner | Parse, store and summarise personal spending from the terminal. | Python, argparse, CSV",
    "Major | Web Scraper and Price Tracker | Collect product data on a schedule, store history and flag price drops. | Requests, BeautifulSoup, SQLite",
    "Capstone | Data Pipeline with a Dashboard | Ingest raw data, clean it, analyse it and present results in a small web app. | Pandas, Flask, Matplotlib"
  ],
  "graphic-designing": [
    "Minor | Social Media Post Kit | Design a consistent set of post and story templates for one brand. | Figma, Typography, Colour",
    "Major | Brand Identity Package | Create a logo, palette, type system and usage guide for a fictional business. | Illustrator, Figma, Brand guidelines",
    "Capstone | Campaign Design Portfolio | Produce a complete multi-format campaign, from poster to digital banners, with a written rationale. | Photoshop, Illustrator, Mockups"
  ],
  "cyber-security": [
    "Minor | Network Scan and Findings Report | Map hosts and open services in a lab network and rank the risks you find. | Nmap, Wireshark, Linux",
    "Major | Web Application Vulnerability Assessment | Test an intentionally vulnerable app for common flaws and document each with a fix. | OWASP Top 10, Burp Suite, SQL injection",
    "Capstone | Authorised Security Assessment | Run a scoped assessment in a lab environment and deliver an executive summary and remediation plan. | Metasploit, Reporting, Hardening"
  ],
  "devops": [
    "Minor | Containerised Web App | Package an application with Docker and run it the same way on every machine. | Docker, Linux, Git",
    "Major | CI Pipeline with Automated Tests | Build, test and scan every commit automatically and block bad changes. | GitHub Actions, Jenkins, SonarQube",
    "Capstone | Zero-Downtime Delivery Platform | Deploy a service to Kubernetes with infrastructure as code, monitoring and safe rollbacks. | Kubernetes, Terraform, Prometheus"
  ],
  "dsa-system-design": [
    "Minor | Algorithm Visualiser | Animate sorting and searching algorithms and compare their running time on real input sizes. | JavaScript, Big-O, Recursion",
    "Major | Autocomplete and Search Engine | Build a fast prefix search over a large word list and benchmark your design choices. | Tries, Heaps, Hashing",
    "Capstone | Design a URL Shortener at Scale | Produce a full design document covering data model, caching, sharding and failure handling. | Databases, Caching, Load balancing"
  ],
  "machine-learning": [
    "Minor | House Price Predictor | Clean a housing dataset, train baseline models and explain which features matter. | Scikit-learn, Pandas, Regression",
    "Major | Customer Churn Model | Build and compare several classifiers, handle imbalance and justify the final choice. | XGBoost, Cross-validation, SHAP",
    "Capstone | End-to-End ML Service | Train, version and serve a model through an API with monitoring for drift. | MLflow, FastAPI, Docker"
  ],
  "data-science": [
    "Minor | Exploratory Analysis of Public Data | Clean a real dataset, test hypotheses and tell the story in charts. | Python, Pandas, Seaborn",
    "Major | Sales Forecasting Study | Forecast demand with several methods and report the error of each honestly. | Statsmodels, Time series, Jupyter",
    "Capstone | Business Case Study with Recommendations | Frame a question, run the full analysis and present decisions a manager can act on. | SQL, Python, Storytelling"
  ],
  "data-analytics": [
    "Minor | Retail Sales Dashboard | Turn a messy sales export into a clean dashboard with filters and key metrics. | Excel, Power BI, DAX",
    "Major | Marketing Funnel Analysis | Query campaign data to find where users drop off and size the opportunity. | SQL, Tableau, A/B testing",
    "Capstone | Executive Reporting Suite | Build a connected set of dashboards and a written summary for a fictional leadership team. | Power BI, SQL, Data modelling"
  ],
  "ui-ux": [
    "Minor | Usability Review of a Real App | Test an existing product with five users and turn the findings into prioritised fixes. | User testing, Heuristics, Figma",
    "Major | Mobile App Design from Research | Take a problem from interviews to wireframes to a clickable prototype. | Figma, Personas, Prototyping",
    "Capstone | Design System and Case Study | Deliver a small design system with components, tokens and a written case study of the process. | Figma, Design tokens, Accessibility"
  ],
  "embedded-systems": [
    "Minor | LED and Button Controller | Read inputs and drive outputs with clean, interrupt-based firmware. | C, Arduino, GPIO",
    "Major | Temperature Logger with Display | Sample a sensor on a schedule, filter the noise and show readings on a screen. | ADC, I2C, UART",
    "Capstone | Real-Time Motor Controller | Build firmware with a control loop, fault handling and serial diagnostics. | STM32, PWM, RTOS basics"
  ],
  "power-systems": [
    "Minor | Load Flow Study of a Small Network | Model a simple grid and calculate bus voltages and line flows. | MATLAB, Per-unit system, Load flow",
    "Major | Fault Analysis and Protection Settings | Compute fault currents and choose relay settings that protect the network. | Fault analysis, Relays, Simulink",
    "Capstone | Solar Plus Storage System Design | Size panels, inverter and batteries for a site and justify the cost and payback. | PV design, Battery sizing, Economics"
  ],
  "iot-systems": [
    "Minor | Room Climate Monitor | Send temperature and humidity readings to a live web dashboard. | ESP32, MQTT, Sensors",
    "Major | Smart Plant Watering System | Read soil moisture, water automatically and alert the owner on a phone. | IoT cloud, Relays, Notifications",
    "Capstone | Connected Asset Tracking Platform | Collect device data, store it securely and visualise fleet health with alerts. | MQTT, Time-series DB, Grafana"
  ],
  "vlsi-design": [
    "Minor | Combinational Logic Blocks | Design and simulate an adder, multiplexer and decoder with test benches. | Verilog, ModelSim, Boolean logic",
    "Major | 8-bit ALU Design | Build an arithmetic logic unit, verify it fully and review timing. | Verilog, Test benches, Synthesis",
    "Capstone | Simple CPU Datapath | Design a small processor datapath with control logic and run test programs on it. | Verilog, FPGA flow, Verification"
  ],
  "robotics-automation": [
    "Minor | Line-Following Robot | Read floor sensors and steer a small robot along a track. | Arduino, Sensors, Motor drivers",
    "Major | PID Speed Controller | Tune a controller for a motor and compare its step response with an open loop. | PID, Encoders, Simulink",
    "Capstone | Pick-and-Place Automation Cell | Plan, program and simulate a robot arm and PLC workflow with safety interlocks. | ROS, PLC basics, Kinematics"
  ],
  "cad-product-design": [
    "Minor | Parametric Bracket Model | Model a bracket with sketches, constraints and a dimensioned drawing. | SolidWorks, Sketching, Drawings",
    "Major | Multi-Part Assembly with Motion | Assemble a mechanism with mates, check for interference and animate it. | Assemblies, Mates, Motion study",
    "Capstone | Product Design to Manufacturing Pack | Design a consumer product, simulate it and prepare a bill of materials and drawing set. | CAD, FEA basics, BOM"
  ],
  "mechanical-design-fundamentals": [
    "Minor | Shaft and Key Design Calculation | Size a shaft for torque and bending and select a suitable key. | Strength of materials, Design codes, Excel",
    "Major | Gear Train Design | Choose gear ratios, check stresses and document the design choices. | Gears, Fatigue, Materials selection",
    "Capstone | Lifting Mechanism Design Report | Design a small lifting device from loads to drawings with a safety review. | Mechanisms, Factor of safety, CAD"
  ],
  "manufacturing-cam": [
    "Minor | CNC Toolpath for a Simple Part | Generate and simulate a milling toolpath and read the G-code it produces. | CAM, G-code, Tooling",
    "Major | Process Plan and Cost Estimate | Plan the operations, tooling and cycle time for a batch of parts and estimate cost. | Process planning, Costing, Jigs",
    "Capstone | Design for Manufacturing Review | Take a part design, improve it for manufacturability and show the saving. | DFM, Tolerances, Quality checks"
  ],
  "structural-design-basics": [
    "Minor | Beam Load and Bending Calculator | Calculate reactions, shear and bending moment for common beams. | Statics, Excel, Diagrams",
    "Major | RCC Slab and Beam Design | Design a small floor system to code and present the reinforcement detail. | IS codes, Limit state, Detailing",
    "Capstone | G+2 Building Structural Model | Model and analyse a small building under dead, live and wind loads and report the member sizes. | STAAD/ETABS basics, Load combinations, Reporting"
  ],
  "digital-marketing": [
    "Minor | SEO Audit for a Small Website | Find technical and content issues and rank the fixes by expected impact. | SEO tools, Keyword research, Analytics",
    "Major | Paid Campaign Plan and Mock Launch | Plan budgets, audiences and ads, then measure results from a simulated run. | Google Ads, Meta Ads, UTM tracking",
    "Capstone | Full Funnel Growth Plan | Build a 90-day plan across content, email and ads with targets and a reporting template. | Content, Email, Analytics"
  ],
  "finance-investment": [
    "Minor | Company Ratio Analysis | Read three years of statements and judge the health of a listed company. | Excel, Financial statements, Ratios",
    "Major | Discounted Cash Flow Valuation | Build a valuation model with assumptions you can defend and test. | DCF, Sensitivity analysis, Excel",
    "Capstone | Model Portfolio and Risk Report | Construct a diversified portfolio, measure risk and explain every allocation. | Portfolio theory, Risk metrics, Reporting"
  ],
  "human-resources": [
    "Minor | Job Description and Hiring Scorecard | Write a clear role profile and a fair, structured interview scorecard. | Job analysis, Interviewing, Scoring",
    "Major | Onboarding and Training Plan | Design a 30-60-90 day onboarding journey with measurable learning goals. | L&D, Surveys, Planning",
    "Capstone | HR Analytics Dashboard | Analyse attrition and engagement data and recommend three retention actions. | Excel, Power BI, HR metrics"
  ],
  "product-management": [
    "Minor | Problem Discovery Brief | Interview users, map the problem and write a one-page product opportunity. | User interviews, Journey maps, JTBD",
    "Major | PRD and Prioritised Roadmap | Write a requirements document and a roadmap built on a clear scoring method. | PRD, RICE scoring, Roadmapping",
    "Capstone | Product Launch Case Study | Take a feature from idea to launch plan with metrics, risks and an experiment design. | Metrics, A/B testing, Go-to-market"
  ],
  "business-analytics": [
    "Minor | KPI Tree and Metrics Sheet | Break a business goal into measurable drivers and track them in a simple sheet. | Excel, KPIs, Data definitions",
    "Major | Customer Segmentation Study | Group customers by behaviour and recommend a different action for each group. | SQL, Clustering, Power BI",
    "Capstone | Profitability Diagnosis | Find where a business loses margin and present a costed fix to leadership. | Analytics, Forecasting, Presentation"
  ],
  "operations-management": [
    "Minor | Process Map and Bottleneck Finder | Map a real workflow and find where work waits the longest. | Flowcharts, Time study, Lean",
    "Major | Inventory and Reorder Model | Set reorder points and safety stock from demand data and compare costs. | EOQ, Safety stock, Excel",
    "Capstone | Operations Improvement Plan | Run a full improvement study on a service or factory process and present the results. | Six Sigma, Kaizen, Control charts"
  ],
  "medical-coding": [
    "Minor | Diagnosis Coding Workbook | Assign diagnosis codes to a set of anonymised sample records with justification. | ICD-10, Coding guidelines, Documentation",
    "Major | Procedure Coding and Claim Review | Code procedures, apply modifiers and find errors that cause rejections. | CPT, Modifiers, Claim forms",
    "Capstone | End-to-End Billing Workflow Audit | Trace sample cases from record to claim, find the gaps and report an accuracy score. | Revenue cycle, Audit, Compliance"
  ],
  "clinical-trial-research": [
    "Minor | Protocol Summary and Checklist | Read a sample protocol and turn it into a visit schedule and a site checklist. | GCP, Protocols, Visit schedules",
    "Major | Informed Consent and Safety Reporting Exercise | Review a consent form for clarity and handle sample adverse event reports. | Ethics, Pharmacovigilance, Documentation",
    "Capstone | Monitoring Visit Simulation | Plan a monitoring visit, review mock source data and write the follow-up letter. | Monitoring, Source verification, Quality"
  ],
  "psychology": [
    "Minor | Behavioural Observation Study | Design a small observation, record behaviour carefully and report the patterns. | Research methods, Ethics, Observation",
    "Major | Survey Design and Analysis | Build a valid questionnaire, collect responses and test a simple hypothesis. | Surveys, SPSS/Excel, Statistics",
    "Capstone | Case Study Report | Analyse a fictional case using two frameworks and present supportive recommendations. | Case formulation, Theories, Reporting"
  ]
};
