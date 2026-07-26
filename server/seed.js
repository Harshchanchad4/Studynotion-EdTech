/**
 * StudyNotion Seed Script
 * Populates the database with realistic demo data.
 * Run: node seed.js
 * Safe to run multiple times — clears seeded data before inserting.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Models
const User = require("./models/User");
const Profile = require("./models/Profile");
const Category = require("./models/Category");
const Course = require("./models/Course");
const Section = require("./models/Section");
const SubSection = require("./models/SubSection");
const RatingAndReview = require("./models/RatingAndRaview");
const CourseProgress = require("./models/CourseProgress");

// ─── Seed marker ───
const SEED_EMAIL_DOMAIN = "@seeduser.studynotion.com";

// ─── Helpers ───
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickN(arr, min, max) {
  const n = min + Math.floor(Math.random() * (max - min + 1));
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, arr.length));
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randFloat(min, max, decimals = 1) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}
function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ".");
}

// ─── Data pools ───
const FIRST_NAMES = [
  "Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Ayaan","Krishna","Ishaan",
  "Ananya","Diya","Myra","Sara","Aanya","Aadhya","Ira","Riya","Priya","Neha",
  "Rohan","Karan","Nikhil","Amit","Rahul","Suresh","Pooja","Sneha","Kavya","Meera",
  "Tanvi","Shreya","Isha","Manav","Dev","Kabir","Zara","Tara","Nisha","Arun",
  "Lakshmi","Harini","Siddharth","Pranav","Varun","Mohit","Deepak","Rajesh","Sunita","Anjali",
  "Vikram","Gaurav","Ritika","Divya","Sakshi","Tushar","Kunal","Akash","Swati","Bhavna",
  "Yash","Harsh","Piyush","Naveen","Sandeep","Geeta","Komal","Pallavi","Rachna","Ashok",
  "Vishal","Manoj","Rakesh","Shweta","Madhuri","Jatin","Neeraj","Tarun","Rekha","Suman",
  "Chetan","Hemant","Anand","Vinay","Preeti","Sapna","Manish","Sunil","Ramesh","Dinesh",
  "Alok","Kapil","Ajay","Vijay","Sanjay","Mukesh","Nilesh","Paresh","Umesh","Kamal"
];

const LAST_NAMES = [
  "Sharma","Verma","Patel","Gupta","Singh","Kumar","Joshi","Reddy","Nair","Iyer",
  "Chopra","Mehta","Shah","Desai","Rao","Pillai","Menon","Das","Bose","Sen",
  "Chauhan","Thakur","Mishra","Pandey","Tiwari","Dubey","Srivastava","Agarwal","Bansal","Goel",
  "Malhotra","Kapoor","Khanna","Bhatia","Sethi","Arora","Saxena","Rastogi","Mathur","Chawla"
];

const GENDERS = ["Male", "Female", "Non-Binary", "Prefer not to say"];

const INSTRUCTOR_BIOS = [
  "Full-stack developer with {years}+ years building scalable web applications. Passionate about clean code and modern JavaScript.",
  "Data scientist and ML engineer with {years}+ years of industry experience at top tech companies. Love making complex topics simple.",
  "DevOps architect who has managed infrastructure at scale for {years}+ years. Certified AWS and GCP professional.",
  "UI/UX designer turned frontend developer with {years}+ years of experience creating beautiful, accessible interfaces.",
  "Backend engineer specializing in Node.js and Python for {years}+ years. Published author and open-source contributor.",
  "Mobile app developer with {years}+ years building cross-platform apps. Former lead at a Y Combinator startup.",
  "Cybersecurity professional with {years}+ years in penetration testing and security auditing. CEH and OSCP certified.",
  "Cloud computing expert with {years}+ years managing enterprise-level AWS/Azure/GCP deployments.",
  "AI researcher and educator with {years}+ years of experience. PhD in Computer Science, published 15+ papers.",
  "Blockchain developer and consultant with {years}+ years. Contributed to multiple DeFi protocols.",
  "Competitive programmer turned educator with {years}+ years. Multiple ICPC and CodeForces achievements.",
  "System design specialist with {years}+ years at FAANG companies. Interview coach for 500+ engineers.",
  "React and Next.js specialist with {years}+ years. Core contributor to popular open-source libraries.",
  "Python enthusiast and data engineering lead with {years}+ years. Built data pipelines processing 10M+ records daily.",
  "Game developer turned web developer with {years}+ years. Teaching coding through interactive projects.",
  "Technical lead with {years}+ years in agile teams. Passionate about mentoring junior developers.",
  "Database architect with {years}+ years in SQL and NoSQL systems. Oracle and MongoDB certified.",
  "Embedded systems engineer with {years}+ years. Teaching programming fundamentals through hardware projects.",
  "Product manager turned developer with {years}+ years. Unique perspective on building user-centric software.",
  "Open source advocate with {years}+ years of contributions. Maintainer of several npm packages with 1M+ downloads."
];

// ─── Categories ───
const CATEGORIES_DATA = [
  { name: "Web Development", description: "Learn to build modern, responsive websites and web applications using the latest frameworks and tools." },
  { name: "Data Science", description: "Master data analysis, visualization, and statistical modeling to extract insights from complex datasets." },
  { name: "Machine Learning", description: "Explore algorithms and techniques to build intelligent systems that learn from data." },
  { name: "Artificial Intelligence", description: "Dive into AI concepts including NLP, computer vision, and reinforcement learning." },
  { name: "Mobile App Development", description: "Build native and cross-platform mobile applications for iOS and Android." },
  { name: "DevOps", description: "Learn CI/CD pipelines, containerization, infrastructure as code, and modern deployment strategies." },
  { name: "Cloud Computing", description: "Master cloud platforms like AWS, Azure, and GCP for scalable infrastructure management." },
  { name: "UI/UX Design", description: "Design intuitive user interfaces and experiences using industry-standard tools and methodologies." },
  { name: "Cyber Security", description: "Learn ethical hacking, penetration testing, network security, and security best practices." },
  { name: "Blockchain", description: "Understand distributed ledger technology, smart contracts, and decentralized application development." },
  { name: "Programming Languages", description: "Master popular programming languages from fundamentals to advanced concepts." },
  { name: "Interview Preparation", description: "Prepare for technical interviews at top tech companies with structured practice and mock sessions." },
  { name: "Data Structures & Algorithms", description: "Build a strong foundation in DSA to solve complex computational problems efficiently." },
  { name: "System Design", description: "Learn to design large-scale distributed systems with high availability and scalability." },
  { name: "Database Management", description: "Master SQL and NoSQL databases, query optimization, and database architecture." }
];

// ─── Courses ───
const COURSES_DATA = [
  { title: "Complete MERN Stack Bootcamp 2024", category: "Web Development", tags: ["mern","mongodb","express","react","node"], price: 3499, desc: "Build full-stack web applications from scratch using MongoDB, Express.js, React, and Node.js. Includes 5 real-world projects.", learn: "Build production-ready MERN apps, REST APIs, authentication, deployment on AWS" },
  { title: "React.js Masterclass - Zero to Hero", category: "Web Development", tags: ["react","hooks","redux","nextjs"], price: 2499, desc: "Master React.js from fundamentals to advanced patterns including hooks, context API, Redux, and server-side rendering with Next.js.", learn: "React hooks, state management, routing, testing, performance optimization" },
  { title: "Advanced Node.js - Backend Architecture", category: "Web Development", tags: ["nodejs","express","microservices","api"], price: 2999, desc: "Deep dive into Node.js internals, event loop, streams, clustering, and building microservices architecture.", learn: "Node.js internals, scalable APIs, caching, message queues, microservices" },
  { title: "Next.js 14 Full Course - App Router & Server Actions", category: "Web Development", tags: ["nextjs","react","ssr","fullstack"], price: 2799, desc: "Learn Next.js 14 with the new App Router, Server Components, Server Actions, and deploy production apps.", learn: "Next.js App Router, server components, data fetching, authentication, deployment" },
  { title: "Python for Beginners - Complete Programming Course", category: "Programming Languages", tags: ["python","beginner","programming"], price: 999, desc: "Start your programming journey with Python. No prior experience needed. Learn through 200+ exercises and 10 mini projects.", learn: "Python syntax, OOP, file handling, error handling, modules, basic data structures" },
  { title: "JavaScript - The Complete Guide (ES6+)", category: "Programming Languages", tags: ["javascript","es6","dom","async"], price: 1999, desc: "Master JavaScript from basics to advanced concepts including ES6+, async/await, closures, prototypes, and DOM manipulation.", learn: "Modern JavaScript, DOM manipulation, async programming, design patterns" },
  { title: "Java Programming Masterclass", category: "Programming Languages", tags: ["java","oop","spring","collections"], price: 2499, desc: "Comprehensive Java course covering OOP, collections framework, multithreading, and Spring Boot basics.", learn: "Java fundamentals, OOP, generics, streams, lambda expressions, Spring basics" },
  { title: "Go Programming - Build Scalable Applications", category: "Programming Languages", tags: ["golang","concurrency","backend"], price: 2299, desc: "Learn Go (Golang) for building high-performance, concurrent applications. Covers goroutines, channels, and web services.", learn: "Go syntax, concurrency, REST APIs, testing, Docker integration" },
  { title: "Machine Learning A-Z: From Theory to Practice", category: "Machine Learning", tags: ["ml","scikit-learn","regression","classification"], price: 3999, desc: "Complete machine learning course covering supervised, unsupervised, and reinforcement learning with hands-on Python projects.", learn: "Regression, classification, clustering, dimensionality reduction, model evaluation" },
  { title: "Deep Learning with TensorFlow & Keras", category: "Machine Learning", tags: ["deep-learning","tensorflow","keras","neural-networks"], price: 3499, desc: "Build neural networks, CNNs, RNNs, and transformers using TensorFlow and Keras. Deploy models to production.", learn: "Neural networks, CNNs, RNNs, transfer learning, model deployment" },
  { title: "Natural Language Processing with Python", category: "Artificial Intelligence", tags: ["nlp","transformers","bert","gpt"], price: 3299, desc: "Master NLP techniques from tokenization to transformer models. Build chatbots, sentiment analyzers, and text generators.", learn: "Text processing, word embeddings, transformers, BERT, GPT, text classification" },
  { title: "Computer Vision - OpenCV & Deep Learning", category: "Artificial Intelligence", tags: ["computer-vision","opencv","cnn","yolo"], price: 3499, desc: "Learn computer vision from scratch. Build face detection, object recognition, and image segmentation systems.", learn: "Image processing, CNNs, object detection, YOLO, image segmentation" },
  { title: "Data Science with Python - Complete Bootcamp", category: "Data Science", tags: ["data-science","pandas","numpy","visualization"], price: 2999, desc: "Master data science with Python. Learn pandas, NumPy, matplotlib, seaborn, and statistical analysis for real-world datasets.", learn: "Data cleaning, EDA, statistical analysis, data visualization, feature engineering" },
  { title: "SQL for Data Analytics - Beginner to Advanced", category: "Data Science", tags: ["sql","analytics","database","queries"], price: 1499, desc: "Master SQL queries from basics to advanced analytics functions. Practice with 100+ real-world exercises.", learn: "SQL fundamentals, joins, window functions, CTEs, query optimization" },
  { title: "Power BI - Business Intelligence & Data Visualization", category: "Data Science", tags: ["power-bi","dashboard","visualization","bi"], price: 1999, desc: "Create interactive dashboards and reports using Microsoft Power BI. Connect to multiple data sources and tell stories with data.", learn: "DAX formulas, data modeling, interactive dashboards, report publishing" },
  { title: "Docker & Kubernetes - Complete DevOps Guide", category: "DevOps", tags: ["docker","kubernetes","containers","orchestration"], price: 2999, desc: "Master containerization with Docker and orchestration with Kubernetes. Deploy and manage microservices at scale.", learn: "Docker containers, Kubernetes pods, services, deployments, Helm charts" },
  { title: "CI/CD Pipelines with Jenkins & GitHub Actions", category: "DevOps", tags: ["cicd","jenkins","github-actions","automation"], price: 2499, desc: "Automate your software delivery pipeline with Jenkins and GitHub Actions. Learn testing, building, and deployment automation.", learn: "CI/CD concepts, Jenkins pipelines, GitHub Actions workflows, automated testing" },
  { title: "AWS Cloud Practitioner - Complete Certification Prep", category: "Cloud Computing", tags: ["aws","cloud","certification","infrastructure"], price: 1999, desc: "Prepare for the AWS Cloud Practitioner exam. Learn all AWS services, pricing, security, and architecture best practices.", learn: "EC2, S3, RDS, Lambda, IAM, VPC, CloudFormation, billing and pricing" },
  { title: "AWS Solutions Architect - Associate Level", category: "Cloud Computing", tags: ["aws","solutions-architect","architecture","cloud"], price: 3999, desc: "Advanced AWS course for the Solutions Architect Associate certification. Design highly available and fault-tolerant architectures.", learn: "Multi-tier architectures, auto-scaling, disaster recovery, cost optimization" },
  { title: "Google Cloud Platform - Complete Guide", category: "Cloud Computing", tags: ["gcp","cloud","bigquery","compute-engine"], price: 2799, desc: "Comprehensive guide to Google Cloud Platform services. Learn Compute Engine, Cloud Functions, BigQuery, and more.", learn: "GCP core services, data engineering, ML on GCP, security and compliance" },
  { title: "React Native - Build Mobile Apps with JavaScript", category: "Mobile App Development", tags: ["react-native","mobile","javascript","cross-platform"], price: 2999, desc: "Build iOS and Android apps with React Native. Learn navigation, state management, native modules, and app store deployment.", learn: "React Native components, navigation, animations, native modules, deployment" },
  { title: "Flutter & Dart - Complete Mobile Development", category: "Mobile App Development", tags: ["flutter","dart","mobile","cross-platform"], price: 2799, desc: "Build beautiful, natively compiled mobile apps with Flutter and Dart. Includes Firebase integration and state management.", learn: "Dart language, Flutter widgets, state management, Firebase, animations" },
  { title: "Figma UI/UX Design - From Beginner to Expert", category: "UI/UX Design", tags: ["figma","ui","ux","prototyping"], price: 1999, desc: "Master Figma for UI/UX design. Learn wireframing, prototyping, design systems, and collaborative design workflows.", learn: "Figma tools, auto layout, components, variants, prototyping, handoff to developers" },
  { title: "UI/UX Design Principles & Portfolio Building", category: "UI/UX Design", tags: ["ux","design-thinking","portfolio","user-research"], price: 2499, desc: "Learn UX research, design thinking, information architecture, and build a portfolio that lands you a design job.", learn: "User research, personas, wireframes, usability testing, portfolio presentation" },
  { title: "Ethical Hacking - Complete Cybersecurity Course", category: "Cyber Security", tags: ["ethical-hacking","penetration-testing","security","kali"], price: 3499, desc: "Learn ethical hacking and penetration testing from scratch. Use Kali Linux, Burp Suite, and Metasploit for security assessments.", learn: "Network scanning, vulnerability assessment, web app security, social engineering" },
  { title: "Web Application Security & Bug Bounty", category: "Cyber Security", tags: ["web-security","bug-bounty","owasp","xss"], price: 2999, desc: "Master web application security testing. Learn OWASP Top 10, XSS, SQL injection, and start earning through bug bounty programs.", learn: "OWASP Top 10, SQL injection, XSS, CSRF, authentication flaws, reporting" },
  { title: "Blockchain Development with Solidity & Ethereum", category: "Blockchain", tags: ["blockchain","solidity","ethereum","smart-contracts"], price: 3499, desc: "Build decentralized applications on Ethereum. Learn Solidity, smart contracts, Web3.js, and DeFi protocols.", learn: "Solidity, smart contracts, Web3.js, Hardhat, DeFi protocols, NFTs" },
  { title: "Web3 & DeFi - Decentralized Finance Deep Dive", category: "Blockchain", tags: ["web3","defi","crypto","dao"], price: 2999, desc: "Understand DeFi protocols, liquidity pools, yield farming, DAOs, and build your own decentralized exchange.", learn: "DeFi mechanics, AMMs, lending protocols, governance tokens, security auditing" },
  { title: "DSA in JavaScript - Interview Ready", category: "Data Structures & Algorithms", tags: ["dsa","javascript","algorithms","interview"], price: 2499, desc: "Master data structures and algorithms using JavaScript. 300+ problems from LeetCode and competitive programming.", learn: "Arrays, linked lists, trees, graphs, DP, greedy, backtracking, time complexity" },
  { title: "Data Structures & Algorithms in Java", category: "Data Structures & Algorithms", tags: ["dsa","java","algorithms","problem-solving"], price: 2499, desc: "Complete DSA course in Java. Covers every data structure and algorithm pattern needed for FAANG interviews.", learn: "All DS, sorting, searching, graph algorithms, dynamic programming, system design basics" },
  { title: "Data Structures & Algorithms in Python", category: "Data Structures & Algorithms", tags: ["dsa","python","algorithms","coding"], price: 2299, desc: "Learn DSA with Python. Includes 250+ coding problems with detailed video explanations and optimal solutions.", learn: "Python DSA, recursion, trees, heaps, tries, segment trees, competitive programming" },
  { title: "System Design Interview Prep - Complete Guide", category: "System Design", tags: ["system-design","scalability","architecture","interview"], price: 3999, desc: "Learn to design large-scale distributed systems. Covers URL shortener, Twitter, Netflix, Uber, and 15+ system design problems.", learn: "Load balancing, caching, databases, message queues, microservices, CAP theorem" },
  { title: "System Design for Backend Engineers", category: "System Design", tags: ["system-design","backend","distributed-systems","database"], price: 3499, desc: "Deep dive into backend system design. Learn database sharding, event-driven architecture, and real-time systems.", learn: "Database design, caching strategies, event sourcing, CQRS, API gateway patterns" },
  { title: "Cracking the Coding Interview - Complete Prep", category: "Interview Preparation", tags: ["interview","coding","behavioral","resume"], price: 2999, desc: "Comprehensive interview preparation covering coding, system design, and behavioral rounds for top tech companies.", learn: "Problem solving patterns, mock interviews, behavioral frameworks, resume building" },
  { title: "Frontend Interview Preparation 2024", category: "Interview Preparation", tags: ["frontend","interview","javascript","react"], price: 1999, desc: "Prepare for frontend interviews with focus on JavaScript, React, CSS, system design, and take-home assignments.", learn: "JS fundamentals, React internals, CSS layout, web performance, accessibility" },
  { title: "HTML & CSS - Build Responsive Websites", category: "Web Development", tags: ["html","css","responsive","flexbox"], price: 799, desc: "Learn HTML5 and CSS3 from scratch. Build 10 responsive websites with Flexbox, Grid, and animations.", learn: "HTML5 semantics, CSS3, Flexbox, Grid, responsive design, CSS animations" },
  { title: "TypeScript - Complete Developer Guide", category: "Programming Languages", tags: ["typescript","javascript","types","generics"], price: 1999, desc: "Master TypeScript for building robust, type-safe applications. Covers generics, decorators, and integration with React and Node.", learn: "TypeScript types, interfaces, generics, decorators, React + TS, Node + TS" },
  { title: "MongoDB - The Complete Developer's Guide", category: "Database Management", tags: ["mongodb","nosql","aggregation","atlas"], price: 1999, desc: "Master MongoDB from CRUD operations to aggregation pipelines, indexing, and Atlas cloud deployment.", learn: "CRUD, aggregation framework, indexing, replication, sharding, Atlas" },
  { title: "PostgreSQL - Advanced Database Design", category: "Database Management", tags: ["postgresql","sql","database","optimization"], price: 2299, desc: "Advanced PostgreSQL course covering query optimization, partitioning, replication, and database security.", learn: "Query planning, indexing strategies, partitioning, replication, pgAdmin, security" },
  { title: "Terraform & Infrastructure as Code", category: "DevOps", tags: ["terraform","iac","devops","automation"], price: 2499, desc: "Learn Infrastructure as Code with Terraform. Manage multi-cloud infrastructure with declarative configuration.", learn: "Terraform basics, providers, modules, state management, CI/CD integration" },
  { title: "Prompt Engineering & AI Tools Mastery", category: "Artificial Intelligence", tags: ["prompt-engineering","chatgpt","ai-tools","llm"], price: 1499, desc: "Master prompt engineering for ChatGPT, Claude, and other LLMs. Build AI-powered workflows and applications.", learn: "Prompt techniques, chain-of-thought, RAG, AI agents, API integration" },
  { title: "Android Development with Kotlin", category: "Mobile App Development", tags: ["android","kotlin","jetpack","mobile"], price: 2999, desc: "Build modern Android apps with Kotlin and Jetpack Compose. Learn MVVM, Room, Retrofit, and Material Design 3.", learn: "Kotlin, Jetpack Compose, MVVM, Room DB, Retrofit, coroutines" },
  { title: "C++ for Competitive Programming", category: "Programming Languages", tags: ["cpp","competitive","algorithms","stl"], price: 1799, desc: "Learn C++ and STL for competitive programming. Practice with 200+ problems from Codeforces, LeetCode, and SPOJ.", learn: "C++ STL, algorithms, graph theory, number theory, dynamic programming" },
  { title: "Linux Administration & Shell Scripting", category: "DevOps", tags: ["linux","bash","shell","sysadmin"], price: 1499, desc: "Master Linux system administration and Bash scripting. Essential skills for any DevOps or backend engineer.", learn: "Linux commands, file systems, networking, Bash scripting, cron jobs, security" },
  { title: "Tableau - Data Visualization & Analytics", category: "Data Science", tags: ["tableau","visualization","dashboard","analytics"], price: 1999, desc: "Create stunning data visualizations with Tableau. Connect data sources, build dashboards, and tell compelling data stories.", learn: "Tableau Desktop, calculated fields, parameters, storytelling, Tableau Server" },
  { title: "Rust Programming - Systems to Web", category: "Programming Languages", tags: ["rust","systems","memory-safety","wasm"], price: 2799, desc: "Learn Rust from basics to advanced concepts. Build CLI tools, web servers, and WebAssembly applications.", learn: "Ownership, borrowing, lifetimes, async Rust, Actix/Axum, WASM" },
];

// ─── Section templates per category ───
const SECTION_TEMPLATES = {
  default: [
    "Introduction & Setup",
    "Core Fundamentals",
    "Working with Data",
    "Intermediate Concepts",
    "Advanced Techniques",
    "Real-World Project",
    "Testing & Debugging",
    "Deployment & Best Practices"
  ]
};

// ─── Review templates ───
const REVIEW_TEMPLATES = {
  5: [
    "Absolutely fantastic course! The instructor explains everything so clearly. Best investment I've made in my learning journey.",
    "This course exceeded all my expectations. The projects are practical and the concepts are well-explained. Highly recommended!",
    "Amazing content and teaching style. I went from knowing nothing to building real projects. Worth every rupee!",
    "One of the best courses on this topic. The instructor's expertise really shows. Crystal clear explanations.",
    "Incredible depth and breadth of content. The hands-on projects sealed the deal for me. 10/10 would recommend.",
    "Perfect course for anyone serious about learning this topic. The instructor responds to doubts quickly too.",
    "This course transformed my career. Got a job offer within 2 months of completing it. Can't thank the instructor enough!",
    "Exceptional quality. Every concept is explained with real-world examples. The best online course I've taken.",
  ],
  4: [
    "Very good course overall. Some sections could use more depth but the fundamentals are covered excellently.",
    "Great content and well-structured. A few videos feel rushed but the course material is solid.",
    "Really enjoyed this course. The projects are practical and the instructor is knowledgeable. Minor audio issues in a few videos.",
    "Good course with practical examples. Would have liked more advanced topics but it's great for the price.",
    "Solid course covering all the essentials. The instructor's pace is good and examples are relevant.",
    "Well-organized course. I learned a lot. Some sections could benefit from updated content but still very valuable.",
    "The course delivers on its promises. Good mix of theory and practice. Would recommend to intermediate learners.",
  ],
  3: [
    "Decent course but nothing extraordinary. Covers the basics well but lacks depth in advanced areas.",
    "Average course. Some concepts are explained well, others feel rushed. Could use more practical exercises.",
    "It's okay for beginners but if you have some experience, you might find it too basic. Content could be updated.",
    "The course has good moments but is inconsistent. Some modules are excellent while others feel like filler.",
    "Satisfactory content. Gets the job done but doesn't go the extra mile. Expected more hands-on projects.",
  ],
  2: [
    "Below expectations. The content feels outdated and some videos have poor audio quality. Needs an update.",
    "Disappointed with the course. Too much theory and not enough practical application. Would not recommend at this price.",
    "The course needs significant improvement. Many concepts are glossed over and the projects are too simple.",
  ],
  1: [
    "Very poor quality. Outdated content, unclear explanations, and no support for student questions.",
    "Would not recommend. The course description promises much more than what is actually delivered.",
  ]
};

// ─── Lecture title generators ───
function generateLectureTitles(sectionName, count) {
  const templates = {
    "Introduction & Setup": [
      "Welcome & Course Overview", "Prerequisites & What You'll Need", "Setting Up Your Development Environment",
      "Installing Required Tools", "Course Roadmap & Resources", "Quick Start Guide", "Your First Hello World",
      "Understanding the Ecosystem"
    ],
    "Core Fundamentals": [
      "Understanding the Basics", "Key Concepts Explained", "Working with Variables & Data Types",
      "Control Flow & Logic", "Functions & Modules", "Error Handling Basics", "Hands-on Exercise: Fundamentals",
      "Quiz & Review"
    ],
    "Working with Data": [
      "Data Structures Overview", "Arrays & Collections", "Objects & Maps", "Data Transformation Techniques",
      "File I/O Operations", "Working with JSON", "Database Basics", "Data Validation"
    ],
    "Intermediate Concepts": [
      "Design Patterns Introduction", "Asynchronous Programming", "State Management", "API Integration",
      "Authentication & Authorization", "Middleware & Plugins", "Performance Optimization", "Code Organization"
    ],
    "Advanced Techniques": [
      "Advanced Architecture Patterns", "Scalability Considerations", "Security Best Practices",
      "Caching Strategies", "Advanced Debugging", "Profiling & Monitoring", "CI/CD Integration",
      "Advanced Project"
    ],
    "Real-World Project": [
      "Project Planning & Requirements", "Setting Up the Project", "Building the Core Features",
      "Adding User Interface", "Implementing Business Logic", "Integrating External Services",
      "Testing the Application", "Final Review & Improvements"
    ],
    "Testing & Debugging": [
      "Unit Testing Fundamentals", "Integration Testing", "End-to-End Testing", "Debugging Techniques",
      "Test-Driven Development", "Mocking & Stubbing", "Code Coverage", "Testing Best Practices"
    ],
    "Deployment & Best Practices": [
      "Preparing for Production", "Deployment Strategies", "Environment Configuration",
      "Monitoring & Logging", "Performance Tuning", "Security Hardening", "Documentation",
      "Course Wrap-up & Next Steps"
    ]
  };
  const titles = templates[sectionName] || templates["Core Fundamentals"];
  return titles.slice(0, count);
}

// ═════════════════════════════════════════════════════════
// MAIN SEED FUNCTION
// ═════════════════════════════════════════════════════════
async function seed() {
  console.log("🔌 Connecting to database...");
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("✅ Connected to MongoDB\n");

  // ── Step 0: Clean previous seed data ──
  console.log("🧹 Cleaning previous seed data...");
  const seedUsers = await User.find({ email: { $regex: SEED_EMAIL_DOMAIN } }).select("_id additionalDetails courseProgress");
  const seedUserIds = seedUsers.map(u => u._id);
  const seedProfileIds = seedUsers.map(u => u.additionalDetails).filter(Boolean);
  const seedProgressIds = seedUsers.flatMap(u => u.courseProgress || []);

  if (seedUserIds.length > 0) {
    // Delete courses created by seed instructors
    const seedCourses = await Course.find({ instructor: { $in: seedUserIds } }).select("_id courseContent ratingAndReviews");
    const seedCourseIds = seedCourses.map(c => c._id);
    const seedSectionIds = seedCourses.flatMap(c => c.courseContent || []);
    const seedReviewIds = seedCourses.flatMap(c => c.ratingAndReviews || []);

    // Get subsections from sections
    const seedSections = await Section.find({ _id: { $in: seedSectionIds } }).select("subSection");
    const seedSubSectionIds = seedSections.flatMap(s => s.subSection || []);

    // Delete in reverse order of dependencies
    await SubSection.deleteMany({ _id: { $in: seedSubSectionIds } });
    await Section.deleteMany({ _id: { $in: seedSectionIds } });
    await RatingAndReview.deleteMany({ _id: { $in: seedReviewIds } });
    await CourseProgress.deleteMany({ $or: [{ _id: { $in: seedProgressIds } }, { userId: { $in: seedUserIds } }] });
    await Course.deleteMany({ _id: { $in: seedCourseIds } });
    await Profile.deleteMany({ _id: { $in: seedProfileIds } });
    await User.deleteMany({ _id: { $in: seedUserIds } });
  }

  // Clean seed categories
  await Category.deleteMany({ name: { $in: CATEGORIES_DATA.map(c => c.name) } });
  console.log("✅ Previous seed data cleaned\n");

  // ── Step 1: Categories ──
  console.log("📁 Inserting Categories...");
  const categories = await Category.insertMany(CATEGORIES_DATA);
  const categoryMap = {};
  categories.forEach(c => { categoryMap[c.name] = c; });
  console.log(`   ✅ Inserted ${categories.length} Categories\n`);

  // ── Step 2: Instructors ──
  console.log("👨‍🏫 Creating Instructors...");
  const hashedPassword = await bcrypt.hash("SeedPass@123", 10);
  const instructors = [];

  for (let i = 0; i < 20; i++) {
    const firstName = FIRST_NAMES[i];
    const lastName = LAST_NAMES[i % LAST_NAMES.length];
    const years = rand(3, 15);

    const profile = await Profile.create({
      gender: pick(GENDERS),
      dateOfBirth: `${rand(1980, 2000)}-${String(rand(1,12)).padStart(2,'0')}-${String(rand(1,28)).padStart(2,'0')}`,
      about: INSTRUCTOR_BIOS[i].replace("{years}", years),
      contactNumber: 9000000000 + rand(100000, 999999)
    });

    const user = await User.create({
      firstName,
      lastName,
      email: `${slug(firstName)}.${slug(lastName)}.inst${i}${SEED_EMAIL_DOMAIN}`,
      password: hashedPassword,
      accountType: "Instructor",
      additionalDetails: profile._id,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300`,
      approved: true,
      courses: []
    });

    instructors.push(user);
  }
  console.log(`   ✅ Created ${instructors.length} Instructors\n`);

  // ── Step 3: Students ──
  console.log("👨‍🎓 Creating Students...");
  const students = [];
  const usedNames = new Set();

  for (let i = 0; i < 150; i++) {
    let firstName, lastName, key;
    do {
      firstName = pick(FIRST_NAMES);
      lastName = pick(LAST_NAMES);
      key = `${firstName}-${lastName}`;
    } while (usedNames.has(key));
    usedNames.add(key);

    const profile = await Profile.create({
      gender: pick(GENDERS),
      dateOfBirth: `${rand(1995, 2006)}-${String(rand(1,12)).padStart(2,'0')}-${String(rand(1,28)).padStart(2,'0')}`,
      about: pick([
        "Aspiring software developer looking to upskill.",
        "Computer science student exploring new technologies.",
        "Career switcher transitioning into tech.",
        "Self-taught programmer building projects.",
        "Engineering graduate seeking industry-relevant skills.",
        "Working professional learning on weekends.",
        "Passionate about coding and building things.",
        "Preparing for tech interviews at top companies.",
        ""
      ]),
      contactNumber: 7000000000 + rand(100000, 9999999)
    });

    const user = await User.create({
      firstName,
      lastName,
      email: `${slug(firstName)}.${slug(lastName)}.stu${i}${SEED_EMAIL_DOMAIN}`,
      password: hashedPassword,
      accountType: "Student",
      additionalDetails: profile._id,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300`,
      approved: true,
      courses: []
    });

    students.push(user);
    if ((i + 1) % 50 === 0) console.log(`   ... created ${i + 1} students`);
  }
  console.log(`   ✅ Created ${students.length} Students\n`);

  // ── Step 4: Courses with Sections & SubSections ──
  console.log("📚 Creating Courses with Sections & Lectures...");
  const courses = [];
  let totalSections = 0;
  let totalSubSections = 0;

  for (let i = 0; i < COURSES_DATA.length; i++) {
    const cd = COURSES_DATA[i];
    const instructor = instructors[i % instructors.length];
    const category = categoryMap[cd.category];

    if (!category) {
      console.log(`   ⚠️  Category "${cd.category}" not found, skipping course "${cd.title}"`);
      continue;
    }

    // Create sections and subsections
    const sectionTemplates = SECTION_TEMPLATES.default;
    const numSections = rand(5, 8);
    const selectedSections = sectionTemplates.slice(0, numSections);
    const sectionIds = [];

    for (const sectionName of selectedSections) {
      const numLectures = rand(4, 8);
      const lectureTitles = generateLectureTitles(sectionName, numLectures);
      const subSectionIds = [];

      for (let l = 0; l < lectureTitles.length; l++) {
        const sub = await SubSection.create({
          title: lectureTitles[l],
          timeDuration: `${rand(5, 35)}:${String(rand(0, 59)).padStart(2, '0')}`,
          description: `Learn about ${lectureTitles[l].toLowerCase()} in this detailed video lecture.`,
          videoUrl: `https://res.cloudinary.com/demo/video/upload/sample.mp4`
        });
        subSectionIds.push(sub._id);
        totalSubSections++;
      }

      const section = await Section.create({
        sectionName,
        subSection: subSectionIds
      });
      sectionIds.push(section._id);
      totalSections++;
    }

    // Create course
    const course = await Course.create({
      courseName: cd.title,
      courseDescription: cd.desc,
      instructor: instructor._id,
      whatYouWillLearn: cd.learn,
      courseContent: sectionIds,
      price: cd.price,
      thumbnail: `https://api.dicebear.com/6.x/shapes/svg?seed=${encodeURIComponent(cd.title)}`,
      tag: cd.tags,
      category: category._id,
      studentsEnrolled: [],
      instructions: ["A computer with internet access", "Basic understanding of programming (for advanced courses)", "Willingness to learn and practice"],
      status: "Published",
      ratingAndReviews: []
    });

    courses.push(course);

    // Update instructor's courses
    await User.findByIdAndUpdate(instructor._id, { $push: { courses: course._id } });

    // Update category's courses
    await Category.findByIdAndUpdate(category._id, { $push: { courses: course._id } });

    if ((i + 1) % 10 === 0) console.log(`   ... created ${i + 1} courses`);
  }
  console.log(`   ✅ Created ${courses.length} Courses, ${totalSections} Sections, ${totalSubSections} Lectures\n`);

  // ── Step 5: Enrollments ──
  console.log("📝 Enrolling Students...");
  let totalEnrollments = 0;

  // Make some courses popular (high enrollment), some niche (low enrollment)
  const popularCourses = courses.slice(0, 15); // first 15 are popular
  const nicheCourses = courses.slice(15);

  for (const student of students) {
    // Each student enrolls in 2-6 courses
    const numCourses = rand(2, 6);
    // Pick from both popular and niche, weighted toward popular
    const selectedCourses = [];
    for (let j = 0; j < numCourses; j++) {
      const pool = Math.random() < 0.65 ? popularCourses : nicheCourses;
      const course = pick(pool);
      if (!selectedCourses.includes(course)) {
        selectedCourses.push(course);
      }
    }

    for (const course of selectedCourses) {
      await Course.findByIdAndUpdate(course._id, { $addToSet: { studentsEnrolled: student._id } });
      await User.findByIdAndUpdate(student._id, { $addToSet: { courses: course._id } });
      totalEnrollments++;
    }
  }
  console.log(`   ✅ Created ${totalEnrollments} Enrollments\n`);

  // ── Step 6: Course Progress ──
  console.log("📊 Generating Course Progress...");
  let totalProgress = 0;

  // Refresh courses with populated content
  const allCourses = await Course.find({ _id: { $in: courses.map(c => c._id) } })
    .populate({ path: "courseContent", populate: { path: "subSection" } });

  for (const student of students) {
    const enrolledCourses = await Course.find({ studentsEnrolled: student._id }).select("_id");

    for (const ec of enrolledCourses) {
      const fullCourse = allCourses.find(c => c._id.equals(ec._id));
      if (!fullCourse) continue;

      const allSubSections = fullCourse.courseContent.flatMap(s => s.subSection.map(ss => ss._id));
      if (allSubSections.length === 0) continue;

      // Varied progress: 100%, 80%, 50%, 20%, 5%
      const progressPercent = pick([1, 0.8, 0.5, 0.2, 0.05]);
      const completedCount = Math.max(1, Math.floor(allSubSections.length * progressPercent));
      const completedVideos = allSubSections.slice(0, completedCount);

      const progress = await CourseProgress.create({
        courseID: fullCourse._id,
        userId: student._id,
        completedVideos
      });

      await User.findByIdAndUpdate(student._id, { $push: { courseProgress: progress._id } });
      totalProgress++;
    }

    if ((students.indexOf(student) + 1) % 50 === 0) {
      console.log(`   ... processed progress for ${students.indexOf(student) + 1} students`);
    }
  }
  console.log(`   ✅ Generated ${totalProgress} Course Progress records\n`);

  // ── Step 7: Ratings & Reviews ──
  console.log("⭐ Generating Ratings & Reviews...");
  let totalReviews = 0;
  const reviewedPairs = new Set();

  for (const course of courses) {
    const enrolledStudents = await Course.findById(course._id).select("studentsEnrolled");
    if (!enrolledStudents || enrolledStudents.studentsEnrolled.length === 0) continue;

    // 40-70% of enrolled students leave a review
    const reviewerCount = Math.max(3, Math.floor(enrolledStudents.studentsEnrolled.length * randFloat(0.4, 0.7)));
    const reviewers = pickN(enrolledStudents.studentsEnrolled, reviewerCount, reviewerCount);

    for (const reviewerId of reviewers) {
      const pairKey = `${reviewerId}-${course._id}`;
      if (reviewedPairs.has(pairKey)) continue;
      reviewedPairs.add(pairKey);

      // Weighted rating distribution: mostly 4-5
      const ratingWeights = [1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
      const rating = pick(ratingWeights);
      const reviewText = pick(REVIEW_TEMPLATES[rating]);

      const review = await RatingAndReview.create({
        user: reviewerId,
        rating,
        review: reviewText,
        course: course._id
      });

      await Course.findByIdAndUpdate(course._id, { $push: { ratingAndReviews: review._id } });
      totalReviews++;
    }
  }
  console.log(`   ✅ Generated ${totalReviews} Reviews\n`);

  // ── Summary ──
  console.log("═".repeat(50));
  console.log("🎉 SEED COMPLETED SUCCESSFULLY!");
  console.log("═".repeat(50));
  console.log(`   📁 Categories:      ${categories.length}`);
  console.log(`   👨‍🏫 Instructors:     ${instructors.length}`);
  console.log(`   👨‍🎓 Students:        ${students.length}`);
  console.log(`   📚 Courses:          ${courses.length}`);
  console.log(`   📑 Sections:         ${totalSections}`);
  console.log(`   🎬 Lectures:         ${totalSubSections}`);
  console.log(`   📝 Enrollments:      ${totalEnrollments}`);
  console.log(`   📊 Progress Records: ${totalProgress}`);
  console.log(`   ⭐ Reviews:          ${totalReviews}`);
  console.log("═".repeat(50));

  await mongoose.disconnect();
  console.log("\n🔌 Disconnected from database.");
}

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  mongoose.disconnect();
  process.exit(1);
});
