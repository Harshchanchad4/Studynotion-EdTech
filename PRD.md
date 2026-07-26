# Prompt: Generate Realistic Seed Data for StudyNotion

You are working on my existing MERN application called **StudyNotion** (an online learning platform).

## Objective

The application currently has very little data. To make the platform realistic for demos, testing, portfolio showcasing, and future AI/RAG implementation, generate comprehensive and production-quality seed data.

Do **NOT** modify any existing business logic or APIs.

Your only task is to populate the database with realistic interconnected data.

---

# Requirements

Read all existing MongoDB schemas/models and relationships first.

Generate seed data that matches the current schema exactly.

Do not invent fields that don't exist.

Create a reusable seed script (`seed.js` or `seed.ts`) that can populate the database in one command.

The seed script should clear previously generated demo data before inserting new data, so it can be run multiple times without creating duplicates.

---

# Generate the following data

## 1. Categories (12–15)

Create realistic categories such as:

* Web Development
* Data Science
* Machine Learning
* Artificial Intelligence
* Mobile App Development
* DevOps
* Cloud Computing
* UI/UX Design
* Cyber Security
* Blockchain
* Programming Languages
* Interview Preparation
* Aptitude
* Data Structures & Algorithms
* System Design

Each category should have:

* Name
* Description

---

## 2. Instructors (20)

Generate 20 realistic instructors.

Each instructor should have:

* Full Name
* Email
* Profile Picture (placeholder URL is acceptable)
* Bio
* Expertise
* Years of Experience
* Social links (if supported)
* Rating
* Students taught
* Courses created

Mix beginner, intermediate, and expert instructors.

---

## 3. Students (150–200)

Create realistic student accounts.

Include:

* Name
* Email
* Profile
* Avatar
* Bio (if supported)

Distribute students across different enrolled courses.

Generate varied activity levels:

* Highly active
* Average
* Inactive

---

## 4. Courses (40–50)

Create high-quality courses across all categories.

Each course should include:

* Title
* Subtitle
* Description
* What you'll learn
* Requirements
* Target audience
* Thumbnail
* Price (₹299–₹4,999)
* Category
* Instructor
* Language
* Difficulty (if supported)
* Published status
* Average Rating
* Number of enrolled students

Course titles should look realistic, for example:

* Complete MERN Stack Bootcamp
* React.js Masterclass
* Advanced Node.js
* Python for Beginners
* Docker & Kubernetes
* AWS Cloud Practitioner
* Machine Learning A-Z
* System Design Interview Prep
* DSA in JavaScript
* Next.js Full Course

---

## 5. Sections

Each course should contain:

5–8 sections.

Examples:

* Introduction
* Getting Started
* Core Concepts
* Intermediate Concepts
* Advanced Features
* Project
* Deployment
* Summary

---

## 6. Lectures

Each section should contain:

4–8 lectures.

Each lecture should include:

* Title
* Description
* Video URL (dummy URL or sample public video)
* Duration (5–35 minutes)
* Order

Each course should end up with roughly 30–50 lectures.

---

## 7. Ratings & Reviews

Generate 500+ realistic reviews.

Each review should include:

* Student
* Course
* Rating (1–5)
* Meaningful review text

Review lengths should vary naturally.

---

## 8. Enrollments

Enroll students realistically.

Rules:

* Some popular courses should have 80–120 students.
* Some niche courses should have 15–30 students.
* Every student should be enrolled in 2–6 courses.
* No duplicate enrollments.

---

## 9. Course Progress

Generate realistic learning progress.

Examples:

* 100% completed
* 80%
* 45%
* 10%
* Newly enrolled

Mark completed lectures according to each student's progress.

---

## 10. Wishlist

Generate wishlist data.

Each student should have 2–8 wishlisted courses.

---

## 11. Cart

Randomly populate shopping carts for some students.

---

## 12. Payments

Generate realistic payment history for completed enrollments.

Include:

* Amount
* Payment ID (fake but unique)
* Status
* Timestamp

---

## 13. User Statistics

Update any derived values if your schema supports them.

Examples:

* Total students
* Total courses
* Average ratings
* Course enrollment count
* Instructor course count
* Revenue

---

# Data Quality

All generated data should look realistic.

Avoid repetitive names.

Avoid duplicate emails.

Use natural descriptions.

Generate meaningful course descriptions instead of placeholder text.

Generate realistic review text.

Distribute categories evenly.

Maintain proper relationships between collections.

---

# Seed Script Requirements

The script should:

* Read existing models
* Create all related data in the correct order
* Handle foreign key/object references
* Be reusable
* Print progress logs
* Print a summary at the end

Example:

Inserted 15 Categories

Inserted 20 Instructors

Inserted 200 Students

Inserted 50 Courses

Inserted 320 Sections

Inserted 1,850 Lectures

Inserted 500 Reviews

Inserted 650 Enrollments

Seed completed successfully.

---

# Important

Use existing Mongoose models only.

Do not change any schema unless absolutely necessary.

If a required field is missing from the schema, stop and report it instead of guessing.

Write clean, modular code by splitting the seeding logic into separate files (categories, users, courses, reviews, enrollments, etc.) if appropriate.

The final result should make the platform feel like a real EdTech product with enough data for demos, testing, portfolio presentation, analytics, and future AI/RAG features.
