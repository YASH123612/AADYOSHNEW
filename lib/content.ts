/* Copy and small datasets used by the homepage and shared components. */

export const REVIEWS = [
  { name: "Aarav M.", role: "Frontend Engineer Trainee", quote: "The mentor feedback loop made the biggest difference — every project review pointed at something specific to fix." },
  { name: "Sneha K.", role: "Cloud Program Learner", quote: "Structured, no fluff. I liked that certificates were tied to actual deliverables instead of just finishing videos." },
  { name: "Rohit P.", role: "Career Switcher", quote: "Mock interviews were the most useful part for me — I walked into real interviews far less nervous." },
];

export const FAQS = [
  { tag: "Overview", icon: "fa-solid fa-circle-info", q: "What is aadyosh, in one line?", a: "Outcome-first training with mentor-led cohorts and internship-style projects, built to produce portfolio proof and interview readiness — not just course completion." },
  { tag: "Mentors", icon: "fa-solid fa-user-check", q: "Who are the mentors?", a: "Working professionals from relevant fields who review your deliverables and run live sessions, not pre-recorded narrators." },
  { tag: "Beginner", icon: "fa-solid fa-seedling", q: "Is this beginner friendly?", a: "Yes. You start fundamentals-first, then move into structured projects with checkpoints and clear guidance on what to build." },
  { tag: "Projects", icon: "fa-regular fa-file-lines", q: "What do I actually build?", a: "Two to three real-world projects per track, reviewed by a mentor, so you finish with something you can show — not just a transcript." },
  { tag: "Certificate", icon: "fa-solid fa-award", q: "Do you provide a certificate?", a: "Yes — a training or internship certificate issued after your deliverables pass mentor review, not simply for attending sessions." },
  { tag: "Hiring", icon: "fa-solid fa-briefcase", q: "What does placement support mean here?", a: "Resume and profile reviews, mock interviews, and warm introductions through our hiring network once you're ready." },
  { tag: "Access", icon: "fa-regular fa-clock", q: "How long do I get access to content?", a: "Recordings and materials stay available for six months so you can revisit, refine projects, and prep properly for interviews." },
];

/* Placeholder marks. To show a REAL company, replace its entry with { name, logo } and save the logo file in
   public/assets/img/mentors/. Only do this for companies where your mentors really work (and you have
   permission to use the mark) - otherwise it misleads visitors. Plain strings render as text tiles. */
export const PARTNER_NAMES = ["Nexora", "Verdant Labs", "Bluepeak", "Cirrus Works", "Solvix", "Meridian Tech", "Vantage Cloud", "Orbital Data", "Northfield Digital", "Quanta Systems"];
export type MentorBg = string | { name: string; logo: string; height?: number };
export const MENTOR_BG_NAMES: MentorBg[] = [
  { name: "Apple", logo: "/assets/img/companies/apple.svg", height: 32 },
  { name: "Amazon", logo: "/assets/img/companies/amazon.svg", height: 26 },
  { name: "Netflix", logo: "/assets/img/companies/netflix.svg", height: 24 },
  { name: "Google", logo: "/assets/img/companies/google.svg", height: 28 },
  { name: "Adobe", logo: "/assets/img/companies/adobe.svg", height: 24 },
  { name: "Meta", logo: "/assets/img/companies/meta.svg", height: 24 },
  { name: "Microsoft", logo: "/assets/img/companies/microsoft.svg", height: 24 },
];

/* Tools marquee: technology logos (public/assets/img/tech/*.svg, Devicon - MIT) */
export const TECH_ENGINEERING = [
  { name: "Python", file: "python" }, { name: "SQL", file: "sql" }, { name: "Apache Spark", file: "apachespark" },
  { name: "Airflow", file: "airflow" }, { name: "Docker", file: "docker" }, { name: "Kubernetes", file: "kubernetes" },
  { name: "React", file: "react" }, { name: "Node.js", file: "nodejs" }, { name: "TensorFlow", file: "tensorflow" }, { name: "Git", file: "git" },
];
export const TECH_BUSINESS = [
  { name: "Excel", file: "microsoftexcel" }, { name: "Power BI", file: "powerbi" }, { name: "Tableau", file: "tableau" },
  { name: "Google Analytics", file: "googleanalytics" }, { name: "Google Ads", file: "googleads" }, { name: "HubSpot", file: "hubspot" },
  { name: "Salesforce", file: "salesforce" }, { name: "SAP", file: "sap" }, { name: "QuickBooks", file: "quickbooks" },
  { name: "Jira", file: "jira" }, { name: "Notion", file: "notion" }, { name: "Mailchimp", file: "mailchimp" },
  { name: "Canva", file: "canva" }, { name: "Slack", file: "slack" },
];

export const STEPS = [
  { label: "Register", icon: "fa-solid fa-user-plus", tag: "Step 01", title: "Create your account", checks: ["Basic details", "Verify email", "Set a password"], panelTitle: "Tell us who you are.", info: "A quick sign-up so we can save your progress and send batch updates." },
  { label: "Share goals", icon: "fa-regular fa-file-lines", tag: "Step 02", title: "Share goals", checks: ["Role clarity", "Skill baseline", "Right track match"], panelTitle: "Tell us your target role and current skill level.", info: "This helps us recommend the right starting point instead of guessing." },
  { label: "Pick a program", icon: "fa-solid fa-bullseye", tag: "Step 03", title: "Pick a program", checks: ["Compare tracks", "Check curriculum", "Confirm batch date"], panelTitle: "Choose the track that matches your goal.", info: "Browse curriculum and pick a confirmed upcoming batch." },
  { label: "Payment & access", icon: "fa-solid fa-credit-card", tag: "Step 04", title: "Payment & access", checks: ["Secure checkout", "Instant confirmation", "LMS access granted"], panelTitle: "Complete payment to lock your seat.", info: "Seats are batch-limited, so this confirms your spot in the cohort." },
  { label: "Start learning", icon: "fa-solid fa-graduation-cap", tag: "Step 05", title: "Start learning", checks: ["Orientation call", "Meet your mentor", "First live class"], panelTitle: "You're in — welcome to the cohort.", info: "From here it's live classes, project checkpoints, and mentor reviews." },
];

export const CERT_TABS = [
  { label: "Training · Cohort completion", kind: "Certificate", desc: "Awarded for completing a mentor-led training program, with every deliverable reviewed by a mentor." },
  { label: "Internship · Project + review proof", kind: "Internship Certificate", desc: "Awarded for completing an internship-style project track reviewed by working mentors." },
  { label: "Excellence · Top performance", kind: "Certificate of Excellence", desc: "Awarded to top-performing learners for outstanding project quality and consistency." },
];

/* Fictional companies - real named employers aren't used for unverified testimonials.
   Swap in real alumni + employers once available. */
export type Testimonial = { name: string; role: string; company: string; quote: string; outcome: string };
export const FEATURED: Testimonial[] = [
  { name: "Priyanka R.", role: "Software Engineer", company: "Nexora", quote: "The advanced project reviews and 1:1 mock interviews were the turning point. My mentor pushed me to optimize beyond the obvious answer, which is exactly what I got asked about in real interviews.", outcome: "Offer + mentor-reviewed certificate" },
  { name: "Harsha V.", role: "Software Engineer", company: "Vantage Cloud", quote: "aadyosh's full-stack curriculum isn't just tutorials — it's about building systems that hold up. The system design sessions directly helped me get through a tough final round.", outcome: "System design confidence" },
  { name: "Meera S.", role: "Software Engineer", company: "Northfield Digital", quote: "The dedicated mentor support meant I never stayed stuck for long. Their structured approach to the curriculum changed how I actually write and review code.", outcome: "Fast doubt resolution" },
];
export const TESTIMONIALS: Testimonial[] = [
  { name: "Priyanka R.", role: "Software Engineer", company: "Nexora", quote: "The advanced project reviews and 1:1 mock interviews were the turning point. My mentor pushed me to optimize beyond the obvious answer.", outcome: "Cracked interviews + strong projects" },
  { name: "Harsha V.", role: "Software Engineer", company: "Vantage Cloud", quote: "Aadyosh's curriculum isn't just tutorials — it's about building scalable systems. The system design sessions helped me directly.", outcome: "System design confidence + offer" },
  { name: "Meera S.", role: "Software Engineer", company: "Northfield Digital", quote: "The dedicated mentor support meant I never stayed stuck for long. Their structured approach to projects transformed how I write code.", outcome: "Fast doubt resolution + clean architecture" },
  { name: "Madhuri K.", role: "ML Intern", company: "Bluepeak", quote: "The hands-on AI/ML projects were exactly what my resume needed. During interviews, we spent real time discussing the models I actually built here.", outcome: "Industry-grade ML projects" },
  { name: "Suresh T.", role: "Trainee Engineer", company: "Cirrus Works", quote: "Coming from a non-CS background, the beginner-friendly yet rigorous curriculum gave me the foundation I needed to land my first tech role.", outcome: "Career switch, first tech offer" },
  { name: "Kiran D.", role: "Associate Analyst", company: "Meridian Tech", quote: "The mock interviews simulated real-world pressure well. The feedback was blunt but useful — it stopped my rambling and made me interview-ready.", outcome: "Interview readiness" },
];
export const MORE_TESTIMONIALS: Testimonial[] = [
  { name: "Ananya P.", role: "Data Analyst", company: "Orbital Data", quote: "The mentor reviews made feedback specific instead of generic — I always knew exactly what to fix next.", outcome: "Portfolio-grade projects" },
  { name: "Rohit N.", role: "Frontend Engineer", company: "Solvix", quote: "Weekly mentor check-ins kept me accountable in a way self-paced courses never did.", outcome: "Consistent weekly progress" },
  { name: "Divya S.", role: "QA Engineer", company: "Quanta Systems", quote: "The placement support team helped me rework my resume around what recruiters actually scan for.", outcome: "Resume + LinkedIn overhaul" },
];

/* Chat widget ("Ady") canned replies and the fixed contact details shown across the site. */
export const CHAT_REPLY = "Thanks! A mentor will follow up shortly — meanwhile check the FAQ section on the homepage for quick answers.";

export const SITE = {
  name: "aadyosh",
  email: "hr@aadyosh.com",
  phoneDisplay: "+91 78882 09756",
  phoneHref: "tel:+917888209756",
  office: "Aadyosh Corporate Private Limited, Anand Nagar, Nagpur",
  cin: "U62099MH2026PTC468346",
  gstin: "27ABECA9034E1ZS",
  enrollUrl: "https://payments.cashfree.com/forms/AADYOSH",
  social: {
    instagram: "https://www.instagram.com/aadyosh/",
    linkedin: "https://www.linkedin.com/company/110086196/",
    youtube: "https://www.youtube.com/channel/UCEqhCyXC7BdpnFsuLa2ojBw",
  },
};
