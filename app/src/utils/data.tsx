import {
  BriefcaseBusiness,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

const featureCards = [
  {
    title: "Launch a new career",
    icon: <BadgeCheck size={80} strokeWidth={1.8} />, // size={42}
  },
  {
    title: "Try Coursera for Business",
    icon: <BriefcaseBusiness size={80} strokeWidth={1.8} />,
  },
  {
    title: "Earn a degree",
    icon: <GraduationCap size={80} strokeWidth={1.8} />,
  },
];

const categories = [
  "All",
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Business",
  "Finance",
  "Personal Development",
  "Cloud Computing",
  "Cybersecurity",
];

const carouselData = [
  [
    {
      subtitle: "COURSERA PLUS",
      title: "Grow your skills. Shape your career.",
      description: "Build in-demand skills with expert-led programs.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      buttonText: "Save Now",
    },
    {
      subtitle: "MICROSOFT",
      title: "Launch your career in AI engineering",
      description: "Learn from Microsoft experts",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      buttonText: "Start Learning",
    },
  ],
  [
    {
      subtitle: "GOOGLE",
      title: "Data Analytics Professional Certificate",
      description: "Start your data career",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      buttonText: "Enroll Now",
    },
    {
      subtitle: "META",
      title: "Frontend Developer Program",
      description: "Master React and UI design",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      buttonText: "Explore",
    },
  ],
];

const partners = [
  "Google",
  "IBM",
  "Microsoft",
  "University of Illinois",
  "OpenAI",
  "Anthropic",
  "DeepLearning.AI",
  "Stanford University",
  "University of Pennsylvania",
  "University of Michigan",
];

const testimonials = [
  {
    name: "Sarah W.",
    text: "Coursera's reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Noeris B.",
    text: "Coursera rebuilt my confidence and showed me I could dream bigger. It wasn't just about gaining knowledge—it was about believing in my potential again.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Abdullahi M.",
    text: "I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Anas A.",
    text: "Learning with Coursera has expanded my professional expertise by giving me access to cutting-edge research, practical tools, and global perspectives.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const footerData = [
  {
    title: "Explore",
    links: ["Courses", "Projects", "Certificates", "Degrees"],
  },
  {
    title: "Community",
    links: ["Learners", "Partners", "Forums", "Events"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Blog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Privacy Policy", "Terms"],
  },
];

const coursesData = [
  {
    title: "React Bootcamp",
    author: "John Doe",
    rating: 4.5,
    level: "Beginner",
    duration: "6 weeks",
  },
  {
    title: "Advanced Node.js",
    author: "Jane Smith",
    rating: 4.8,
    level: "Advanced",
    duration: "8 weeks",
  },
  {
    title: "Machine Learning",
    author: "Andrew Ng",
    rating: 4.9,
    level: "Intermediate",
    duration: "10 weeks",
  },
  {
    title: "Frontend Development",
    author: "Meta",
    rating: 4.6,
    level: "Beginner",
    duration: "5 weeks",
  },
  {
    title: "Python for Beginners",
    author: "Alice Brown",
    rating: 4.4,
    level: "Beginner",
    duration: "6 weeks",
  },
  {
    title: "Full Stack Web Development",
    author: "David Wilson",
    rating: 4.7,
    level: "Intermediate",
    duration: "12 weeks",
  },
  {
    title: "Data Structures & Algorithms",
    author: "Robert Martin",
    rating: 4.8,
    level: "Intermediate",
    duration: "9 weeks",
  },
  {
    title: "UI/UX Design Fundamentals",
    author: "Emily Davis",
    rating: 4.3,
    level: "Beginner",
    duration: "4 weeks",
  },
  {
    title: "Docker & Kubernetes",
    author: "Chris Richardson",
    rating: 4.7,
    level: "Advanced",
    duration: "7 weeks",
  },
  {
    title: "Cybersecurity Basics",
    author: "Kevin Mitnick",
    rating: 4.6,
    level: "Beginner",
    duration: "6 weeks",
  },
  {
    title: "Java Programming Masterclass",
    author: "Tim Buchalka",
    rating: 4.5,
    level: "Intermediate",
    duration: "11 weeks",
  },
  {
    title: "iOS App Development",
    author: "Angela Yu",
    rating: 4.8,
    level: "Intermediate",
    duration: "10 weeks",
  },
  {
    title: "Android Development with Kotlin",
    author: "Google",
    rating: 4.7,
    level: "Intermediate",
    duration: "9 weeks",
  },
  {
    title: "Cloud Computing with AWS",
    author: "Amazon",
    rating: 4.9,
    level: "Advanced",
    duration: "8 weeks",
  },
  {
    title: "DevOps Engineering",
    author: "HashiCorp",
    rating: 4.6,
    level: "Advanced",
    duration: "7 weeks",
  },
  {
    title: "Deep Learning Specialization",
    author: "Andrew Ng",
    rating: 4.9,
    level: "Advanced",
    duration: "12 weeks",
  },
  {
    title: "GraphQL API Development",
    author: "Apollo",
    rating: 4.5,
    level: "Intermediate",
    duration: "5 weeks",
  },
  {
    title: "Blockchain Fundamentals",
    author: "Vitalik Buterin",
    rating: 4.4,
    level: "Intermediate",
    duration: "6 weeks",
  },
  {
    title: "Game Development with Unity",
    author: "Unity Technologies",
    rating: 4.6,
    level: "Beginner",
    duration: "8 weeks",
  },
  {
    title: "Artificial Intelligence Basics",
    author: "IBM",
    rating: 4.7,
    level: "Beginner",
    duration: "6 weeks",
  },
];

export { categories, carouselData, featureCards, partners, testimonials, footerData, coursesData }