const { randomUUID: uuidv4 } = require("crypto");
const Course = require("../../models/Course");
const Category = require("../../models/Category");
const User = require("../../models/User");
const RatingAndReview = require("../../models/RatingAndRaview");
const Section = require("../../models/Section");
const SubSection = require("../../models/SubSection");
const { embedText } = require("../embeddings");
const { upsertPoints } = require("../vector");

/**
 * Convert a Mongoose document to a text chunk for embedding.
 */

// ── Category documents ──
async function ingestCategories() {
  const categories = await Category.find().populate("courses");
  const points = [];

  for (const cat of categories) {
    const courseNames = cat.courses.map((c) => c.courseName).join(", ");
    const content = `Category: ${cat.name}\nDescription: ${cat.description || "N/A"}\nCourses in this category: ${courseNames || "None"}`;

    const vector = await embedText(content);
    points.push({
      id: uuidv4(),
      vector,
      payload: {
        type: "category",
        sourceId: cat._id.toString(),
        name: cat.name,
        content,
      },
    });
  }

  const count = await upsertPoints(points);
  console.log(`  [Ingest] ${count} category documents indexed`);
  return count;
}

// ── Course documents ──
async function ingestCourses() {
  const courses = await Course.find({ status: "Published" })
    .populate("instructor", "firstName lastName")
    .populate("category", "name")
    .populate({
      path: "courseContent",
      populate: { path: "subSection", select: "title timeDuration" },
    })
    .populate("ratingAndReviews");

  const points = [];

  for (const course of courses) {
    const instructorName = course.instructor
      ? `${course.instructor.firstName} ${course.instructor.lastName}`
      : "Unknown";

    const sections = (course.courseContent || [])
      .map((s) => {
        const lectures = (s.subSection || []).map((ss) => ss.title).join(", ");
        return `${s.sectionName}: ${lectures}`;
      })
      .join("\n");

    const avgRating =
      course.ratingAndReviews.length > 0
        ? (
            course.ratingAndReviews.reduce((sum, r) => sum + r.rating, 0) /
            course.ratingAndReviews.length
          ).toFixed(1)
        : "No ratings";

    const content = [
      `Course: ${course.courseName}`,
      `Description: ${course.courseDescription}`,
      `Instructor: ${instructorName}`,
      `Category: ${course.category ? course.category.name : "Uncategorized"}`,
      `Price: ₹${course.price}`,
      `Tags: ${(course.tag || []).join(", ")}`,
      `What You'll Learn: ${course.whatYouWillLearn || "N/A"}`,
      `Average Rating: ${avgRating} (${course.ratingAndReviews.length} reviews)`,
      `Students Enrolled: ${(course.studentsEnrolled || []).length}`,
      `Status: ${course.status}`,
      `Course Content:\n${sections}`,
    ].join("\n");

    const vector = await embedText(content);
    points.push({
      id: uuidv4(),
      vector,
      payload: {
        type: "course",
        sourceId: course._id.toString(),
        name: course.courseName,
        content,
      },
    });
  }

  const count = await upsertPoints(points);
  console.log(`  [Ingest] ${count} course documents indexed`);
  return count;
}

// ── Instructor documents ──
async function ingestInstructors() {
  const instructors = await User.find({ accountType: "Instructor" })
    .populate("additionalDetails")
    .populate("courses");

  const points = [];

  for (const inst of instructors) {
    const profile = inst.additionalDetails || {};
    const courseNames = (inst.courses || []).map((c) => c.courseName).join(", ");

    const content = [
      `Instructor: ${inst.firstName} ${inst.lastName}`,
      `Email: ${inst.email}`,
      `Bio: ${profile.about || "N/A"}`,
      `Gender: ${profile.gender || "N/A"}`,
      `Courses: ${courseNames || "None"}`,
      `Number of Courses: ${(inst.courses || []).length}`,
    ].join("\n");

    const vector = await embedText(content);
    points.push({
      id: uuidv4(),
      vector,
      payload: {
        type: "instructor",
        sourceId: inst._id.toString(),
        name: `${inst.firstName} ${inst.lastName}`,
        content,
      },
    });
  }

  const count = await upsertPoints(points);
  console.log(`  [Ingest] ${count} instructor documents indexed`);
  return count;
}

// ── Review documents ──
async function ingestReviews() {
  const reviews = await RatingAndReview.find()
    .populate("user", "firstName lastName")
    .populate("course", "courseName");

  const points = [];

  for (const rev of reviews) {
    const studentName = rev.user
      ? `${rev.user.firstName} ${rev.user.lastName}`
      : "Anonymous";
    const courseName = rev.course ? rev.course.courseName : "Unknown Course";

    const content = `Review for "${courseName}" by ${studentName}\nRating: ${rev.rating}/5\nReview: ${rev.review}`;

    const vector = await embedText(content);
    points.push({
      id: uuidv4(),
      vector,
      payload: {
        type: "review",
        sourceId: rev._id.toString(),
        courseName,
        content,
      },
    });
  }

  const count = await upsertPoints(points);
  console.log(`  [Ingest] ${count} review documents indexed`);
  return count;
}

// ── Platform FAQ / Static Knowledge ──
async function ingestFAQ() {
  const faqs = [
    {
      q: "How do I sign up on StudyNotion?",
      a: "You can sign up by clicking the Sign Up button on the homepage. Enter your name, email, and password. You will receive an OTP on your email for verification. Enter the OTP to complete registration.",
    },
    {
      q: "How do I purchase a course?",
      a: "Browse courses, click on a course you like, and click 'Buy Now'. You will be redirected to the payment gateway (Razorpay). After successful payment, the course will appear in your enrolled courses.",
    },
    {
      q: "How do I track my course progress?",
      a: "Go to your dashboard and click on 'Enrolled Courses'. Each course shows a progress bar indicating how many lectures you have completed.",
    },
    {
      q: "Can I become an instructor on StudyNotion?",
      a: "Yes! Sign up as an Instructor. Once approved, you can create courses, add sections and lectures, set pricing, and publish your courses on the platform.",
    },
    {
      q: "How do I leave a review for a course?",
      a: "Go to the course page of a course you are enrolled in. Scroll to the review section and submit your rating (1-5 stars) along with your written review.",
    },
    {
      q: "What payment methods are supported?",
      a: "StudyNotion uses Razorpay as its payment gateway, which supports UPI, credit cards, debit cards, net banking, and wallets.",
    },
    {
      q: "How can I reset my password?",
      a: "Click on 'Forgot Password' on the login page. Enter your registered email address. You will receive a password reset link via email.",
    },
    {
      q: "What is StudyNotion?",
      a: "StudyNotion is an online learning platform (EdTech) where students can browse and purchase courses across various categories like Web Development, Data Science, Machine Learning, and more. Instructors can create and sell their courses on the platform.",
    },
    {
      q: "How do I contact support?",
      a: "You can reach out to us using the Contact Us page on the platform. Fill in your name, email, and message, and our team will get back to you.",
    },
    {
      q: "Can I get a refund?",
      a: "Refund policies depend on the specific course and instructor. Please contact support for refund requests.",
    },
    {
      q: "How does the instructor dashboard work?",
      a: "The instructor dashboard shows your created courses, total students enrolled, revenue earned, and course ratings. You can create new courses, edit existing ones, add sections and lectures, and manage your profile.",
    },
    {
      q: "What categories of courses are available?",
      a: "StudyNotion offers courses across categories including Web Development, Data Science, Machine Learning, AI, Mobile App Development, DevOps, Cloud Computing, UI/UX Design, Cyber Security, Blockchain, Programming Languages, Interview Preparation, DSA, System Design, and Database Management.",
    },
  ];

  const points = [];

  for (const faq of faqs) {
    const content = `FAQ\nQuestion: ${faq.q}\nAnswer: ${faq.a}`;
    const vector = await embedText(content);
    points.push({
      id: uuidv4(),
      vector,
      payload: {
        type: "faq",
        content,
      },
    });
  }

  const count = await upsertPoints(points);
  console.log(`  [Ingest] ${count} FAQ documents indexed`);
  return count;
}

/**
 * Run full ingestion — index all data sources into Qdrant.
 */
async function ingestAll() {
  console.log("[Ingest] Starting full data ingestion...");

  const counts = {
    categories: await ingestCategories(),
    courses: await ingestCourses(),
    instructors: await ingestInstructors(),
    reviews: await ingestReviews(),
    faqs: await ingestFAQ(),
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`[Ingest] Done. Total documents indexed: ${total}`);
  return { counts, total };
}

module.exports = { ingestAll };
