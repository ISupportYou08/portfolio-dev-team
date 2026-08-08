// personalInfo — name, title, bio, contact links shown in Hero, About, Navbar, Footer
export const personalInfo = {
  name: "Ralph Felix C. Florita",
  title: "3rd Year BSIT Student | Assistant Head of Developer Team",
  heroHeading: "Hi, I'm Ralph",
  heroSubtitle: "Aspiring developer crafting practical solutions through code. Passionate about web development, system troubleshooting, and continuous learning.",
  aboutBio: "I'm a 3rd year BSIT student at Global Reciprocal Colleges - GRC, serving as Assistant Head of the Developer Team. I specialize in building functional web applications and providing technical support — from software installation to hardware and PC troubleshooting. I'm continuously expanding my skills in Java, C#, Python, SQL, and PHP, with certifications in CSS NCII, Java Programming NCIII, Python Essentials, and Excel.",
  email: "floritaalp@gmail.com",
  location: "Philippines",
  resumeUrl: "/resume.html",
  social: {
    github: "https://github.com/ISupportYou08",
    linkedin: "https://linkedin.com/in/ralphflorita",
    facebook: "https://www.facebook.com/profile.php?id=61588944848819",
    email: "floritaalp@gmail.com",
  },
}

// stats — quick numbers (projects, certifications, etc.) displayed in the About/Stats section
export type Stat = { label: string; value: number; suffix: string; detail?: string[] }
export const stats: Stat[] = [
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "Certifications", value: 10, suffix: "" },
  { label: "Years Learning", value: 3, suffix: "+" },
  { label: "Languages", value: 5, suffix: "", detail: ["Java", "C#", "Python", "SQL", "PHP"] },
]

// experience — work/role history rendered as timeline cards in the Experience section
export const experience = [
  {
    id: 1,
    company: "Global Reciprocal Colleges - GRC",
    position: "Assistant Head of Developer Team",
    duration: "Present",
    description: "Leading and coordinating the developer team in building and maintaining web applications. Assigned to oversee the scholarship portal and other institutional systems.",
    technologies: ["PHP", "MySQL", "Java", "JavaScript"],
  },
  {
    id: 2,
    company: "Global Reciprocal Colleges - GRC",
    position: "Web Developer — Hackathon Website",
    duration: "2024",
    description: "Developed the official website for the college hackathon event. Designed and implemented the front-end and back-end to handle registrations, submissions, and live updates.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    id: 3,
    company: "Global Reciprocal Colleges - GRC",
    position: "Developer — Scholarship Portal",
    duration: "2024",
    description: "Built and maintained the scholarship portal for managing student applications, document submissions, and approval workflows for the institution.",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
  },
  {
    id: 4,
    company: "Global Reciprocal Colleges - GRC",
    position: "Technical Support & PC Troubleshooting",
    duration: "2023 - Present",
    description: "Installed software, configured systems, and performed hardware and software troubleshooting for computers in the college. Handled repairs, upgrades, and maintenance.",
    technologies: ["Windows", "Linux", "Hardware", "Networking"],
  },
  {
    id: 5,
    company: "Global Reciprocal Colleges - GRC",
    position: "Student Assistant for IT",
    duration: "2023 - Present",
    description: "Assisted the IT department with daily operations, managed computer laboratories, provided technical support to students and staff, and maintained institutional software and hardware assets.",
    technologies: ["IT Support", "Hardware", "Software", "Documentation"],
  },
]

// education — academic background shown in the Experience section
export const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Global Reciprocal Colleges - GRC",
    year: "2023 - Present",
    role: "3rd Year BSIT Student",
    address: "GRC Building, 454, 1400 Rizal Ave Ext, Grace Park East, Caloocan, Metro Manila",
    website: "https://grc.edu.ph/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Global%20Reciprocal%20Colleges%20-%20GRC%2C%20454%20Rizal%20Ave%20Ext%2C%20Grace%20Park%20East%2C%20Caloocan%2C%20Metro%20Manila",
  },
]

// certifications — valid, free certifications for students, displayed in the About section with details
export const certifications = [
  { name: "NCII — Computer Systems Servicing", issuer: "TESDA", details: "Free government training program covering PC assembly, installation, and system maintenance." },
  { name: "NCIII — Java Programming", issuer: "TESDA", details: "National certificate for Java development — OOP, database integration, and deployment." },
  { name: "Python Essentials I", issuer: "Cisco Networking Academy", details: "Free NetAcad course on Python fundamentals, preparing for the PCAP certification exam." },
  { name: "Python Essentials II", issuer: "Cisco Networking Academy", details: "Advanced Python — modules, classes, exception handling, and file operations." },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", details: "Free course on security threats, vulnerabilities, and defense strategies." },
  { name: "Cybersecurity Fundamentals", issuer: "IBM SkillsBuild", details: "Free student digital credential covering security basics, risk, and incident response." },
  { name: "Data Analytics Certificate", issuer: "IBM SkillsBuild", details: "Free student credential — data collection, analysis, and visualization." },
  { name: "Google Analytics Individual Qualification", issuer: "Google Analytics Academy", details: "Free GA4 certification validating analytics, reporting, and data insights skills." },
  { name: "Foundational C# with Microsoft", issuer: "freeCodeCamp & Microsoft", details: "Free developer certification for C# fundamentals, issued on freeCodeCamp." },
  { name: "AI Fundamentals (AI-900) Training", issuer: "Microsoft Learn", details: "Free AI-900 training path; students can earn free certification exam vouchers." },
]

// skills — grouped by category with proficiency levels and icon names, drives the Skills section
export const skills = {
  Languages: [
    { name: "Java", level: 80, years: 3, icon: "SiOpenjdk" },
    { name: "Python", level: 75, years: 2, icon: "SiPython" },
    { name: "C#", level: 65, years: 1, icon: "SiDotnet" },
    { name: "PHP", level: 78, years: 2, icon: "SiPhp" },
    { name: "JavaScript", level: 72, years: 2, icon: "SiJavascript" },
  ],
  Frontend: [
    { name: "HTML", level: 88, years: 3, icon: "SiHtml5" },
    { name: "CSS", level: 82, years: 3, icon: "SiCss" },
    { name: "Bootstrap", level: 78, years: 2, icon: "SiBootstrap" },
    { name: "Tailwind CSS", level: 70, years: 1, icon: "SiTailwindcss" },
  ],
  Backend: [
    { name: "PHP", level: 78, years: 2, icon: "SiPhp" },
    { name: "Java", level: 80, years: 3, icon: "SiOpenjdk" },
    { name: "Python", level: 75, years: 2, icon: "SiPython" },
  ],
  Database: [
    { name: "MySQL", level: 78, years: 2, icon: "SiMysql" },
    { name: "phpMyAdmin", level: 75, years: 2, icon: "SiMysql" },
    { name: "XAMPP", level: 80, years: 2, icon: "SiXampp" },
    { name: "SSMS (SQL Server)", level: 65, years: 1, icon: "Database" },
  ],
  "Tools & Support": [
    { name: "Git", level: 70, years: 2, icon: "SiGit" },
    { name: "GitHub", level: 75, years: 2, icon: "SiGithub" },
    { name: "VS Code", level: 85, years: 3, icon: "CodeXml" },
    { name: "PC Hardware", level: 80, years: 3, icon: "Cpu" },
    { name: "Windows/Linux", level: 78, years: 3, icon: "Monitor" },
  ],
}

// projects — portfolio pieces with images, tech, and links, rendered in the Projects section.
// Each project opens a full sample website built in this app under /samples/...
export const projects = [
  {
    id: 1,
    title: "Luxora",
    description: "Premium fashion e-commerce store with category filtering, an add-to-cart flow, and editorial hero — a luxury shopping experience.",
    category: "E-Commerce",
    image: "/projects/luxora.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/luxora",
  },
  {
    id: 2,
    title: "Nexus",
    description: "SaaS analytics dashboard landing page with an interactive monthly/yearly pricing toggle, feature grid, and product mockup.",
    category: "SaaS",
    image: "/projects/nexus.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/nexus",
  },
  {
    id: 3,
    title: "Emilia",
    description: "Warm editorial restaurant website with a tabbed menu, add-to-order counter, reservation section, and story of the chef.",
    category: "Restaurant",
    image: "/projects/emilia.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/emilia",
  },
  {
    id: 4,
    title: "Sweatbase",
    description: "High-energy fitness app landing page with animated stat counters, program tabs, and a three-tier pricing plan.",
    category: "Fitness",
    image: "/projects/sweatbase.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/sweatbase",
  },
  {
    id: 5,
    title: "Wanderly",
    description: "Travel booking landing page with destination filtering, a working trip search bar, itinerary steps, and trip cards.",
    category: "Travel",
    image: "/projects/wanderly.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/wanderly",
  },
  {
    id: 6,
    title: "PulseMed",
    description: "Healthcare booking system with doctor cards, specialty filtering, an appointment form, and a live queue board.",
    category: "Healthcare",
    image: "/projects/pulsemed.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/pulsemed",
  },
  {
    id: 7,
    title: "HireHub",
    description: "Job portal with keyword search, job-type filters, a live listing board, and an application form with success state.",
    category: "Job Portal",
    image: "/projects/hirehub.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/hirehub",
  },
  {
    id: 8,
    title: "NestFinder",
    description: "Real estate platform with sale/rent filtering, property cards, a neighborhood comparison, and a mortgage calculator.",
    category: "Real Estate",
    image: "/projects/nestfinder.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/nestfinder",
  },
  {
    id: 9,
    title: "EduLink",
    description: "E-learning platform with course category tabs, curriculum cards, mentor profiles, and an enrollment flow.",
    category: "E-Learning",
    image: "/projects/edulink.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/edulink",
  },
  {
    id: 10,
    title: "Vault",
    description: "Fintech banking dashboard with balance cards, category-filtered transactions, savings goals, and a transfer form.",
    category: "Fintech",
    image: "/projects/vault.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demo: "/samples/vault",
  },
]

// services — offerings with icon names, displayed as cards in the Services section
export const services = [
  { title: "Web Development", description: "Building functional websites and web applications using PHP, JavaScript, and MySQL.", icon: "Globe" },
  { title: "Application Development", description: "Developing desktop and web applications in Java, Python, and C#.", icon: "Server" },
  { title: "PC Troubleshooting", description: "Hardware and software diagnosis, repair, and maintenance for computers and peripherals.", icon: "Smartphone" },
  { title: "Software Installation", description: "Installation and configuration of operating systems, drivers, and productivity software.", icon: "Database" },
  { title: "Database Management", description: "Design and management of MySQL databases for web applications and information systems.", icon: "Database" },
  { title: "Technical Support", description: "End-user support for system issues, network connectivity, and hardware problems.", icon: "Cloud" },
]

// testimonials — quotes with ratings and avatars, shown in the Testimonials section
export const testimonials = [
  {
    id: 1,
    name: "Dev Team Lead",
    position: "Global Reciprocal Colleges - GRC",
    avatar: "/avatars/avatar1.jpg",
    rating: 5,
    text: "Ralph is a dedicated team player who takes initiative. His work on the scholarship portal was instrumental to our department's success.",
  },
  {
    id: 2,
    name: "IT Instructor",
    position: "Global Reciprocal Colleges - GRC",
    avatar: "/avatars/avatar2.jpg",
    rating: 5,
    text: "One of the most hardworking students I've taught. Ralph consistently delivers quality outputs and shows strong problem-solving skills.",
  },
]

// techStack — technologies grouped by purpose (icon names + labels for the logo wall)
export const techStack = {
  Languages: [
    { name: "JavaScript", icon: "SiJavascript" },
    { name: "Java", icon: "SiOpenjdk" },
    { name: "C#", icon: "SiDotnet" },
    { name: "Python", icon: "SiPython" },
    { name: "PHP", icon: "SiPhp" },
    { name: "TypeScript", icon: "SiTypescript" },
    { name: "Dart", icon: "SiDart" },
    { name: "HTML", icon: "SiHtml5" },
    { name: "CSS", icon: "SiCss" },
  ],
  "Frameworks & Libraries": [
    { name: "Laravel", icon: "SiLaravel" },
    { name: "Tailwind CSS", icon: "SiTailwindcss" },
    { name: "Bootstrap", icon: "SiBootstrap" },
    { name: "React", icon: "SiReact" },
    { name: "Vue.js", icon: "SiVuedotjs" },
    { name: "Node.js", icon: "SiNodedotjs" },
    { name: "Flutter", icon: "SiFlutter" },
  ],
  Database: [
    { name: "MySQL", icon: "SiMysql" },
    { name: "Firebase", icon: "SiFirebase" },
    { name: "XAMPP", icon: "SiXampp" },
    { name: "SSMS", icon: "Database" },
  ],
  "Tools & Platforms": [
    { name: "Git", icon: "SiGit" },
    { name: "GitHub", icon: "SiGithub" },
    { name: "Docker", icon: "SiDocker" },
    { name: "Railway", icon: "SiRailway" },
  ],
}
