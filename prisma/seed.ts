import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...\n')

  // ============ CLEAN UP ============
  console.log('Cleaning up existing data...')
  await db.quizAttempt.deleteMany()
  await db.lessonProgress.deleteMany()
  await db.quizQuestion.deleteMany()
  await db.quiz.deleteMany()
  await db.discussion.deleteMany()
  await db.payment.deleteMany()
  await db.notification.deleteMany()
  await db.certificate.deleteMany()
  await db.wishlist.deleteMany()
  await db.review.deleteMany()
  await db.enrollment.deleteMany()
  await db.lesson.deleteMany()
  await db.section.deleteMany()
  await db.course.deleteMany()
  await db.liveClass.deleteMany()
  await db.userBadge.deleteMany()
  await db.coupon.deleteMany()
  await db.affiliate.deleteMany()
  await db.badge.deleteMany()
  await db.blogPost.deleteMany()
  await db.subscriptionPlan.deleteMany()
  await db.category.deleteMany()
  await db.user.deleteMany()

  // ============ USERS ============
  console.log('Creating users...')
  const admin = await db.user.create({
    data: {
      email: 'admin@lms.com',
      name: 'Admin User',
      password: 'admin123',
      role: 'ADMIN',
      isVerified: true,
      isApproved: true,
      bio: 'Platform administrator managing LearnHub LMS.',
      image: '',
    },
  })

  const instructor1 = await db.user.create({
    data: {
      email: 'instructor1@lms.com',
      name: 'Sarah Johnson',
      password: 'instructor123',
      role: 'INSTRUCTOR',
      isVerified: true,
      bio: 'Full-stack developer with 10+ years of experience. Passionate about teaching web development.',
      image: '',
      points: 500,
      streak: 30,
    },
  })

  const instructor2 = await db.user.create({
    data: {
      email: 'instructor2@lms.com',
      name: 'Michael Chen',
      password: 'instructor123',
      role: 'INSTRUCTOR',
      isVerified: true,
      bio: 'Data scientist and ML engineer at a Fortune 500 company. PhD in Computer Science.',
      image: '',
      points: 420,
      streak: 25,
    },
  })

  const instructor3 = await db.user.create({
    data: {
      email: 'instructor3@lms.com',
      name: 'Emily Rodriguez',
      password: 'instructor123',
      role: 'INSTRUCTOR',
      isVerified: true,
      bio: 'UX designer and front-end specialist. Former design lead at Google.',
      image: '',
      points: 380,
      streak: 20,
    },
  })

  const student1 = await db.user.create({
    data: {
      email: 'student1@lms.com',
      name: 'Alex Thompson',
      password: 'student123',
      role: 'STUDENT',
      isVerified: true,
      bio: 'Aspiring full-stack developer.',
      points: 250,
      streak: 15,
    },
  })

  const student2 = await db.user.create({
    data: {
      email: 'student2@lms.com',
      name: 'Jessica Park',
      password: 'student123',
      role: 'STUDENT',
      isVerified: true,
      bio: 'Career changer learning data science.',
      points: 180,
      streak: 10,
    },
  })

  const student3 = await db.user.create({
    data: {
      email: 'student3@lms.com',
      name: 'David Kim',
      password: 'student123',
      role: 'STUDENT',
      isVerified: true,
      bio: 'Computer science student at MIT.',
      points: 320,
      streak: 22,
    },
  })

  const student4 = await db.user.create({
    data: {
      email: 'student4@lms.com',
      name: 'Maria Garcia',
      password: 'student123',
      role: 'STUDENT',
      isVerified: true,
      bio: 'Learning mobile app development.',
      points: 150,
      streak: 8,
    },
  })

  const student5 = await db.user.create({
    data: {
      email: 'student5@lms.com',
      name: 'Ryan Mitchell',
      password: 'student123',
      role: 'STUDENT',
      isVerified: true,
      bio: 'DevOps enthusiast and cloud architect.',
      points: 200,
      streak: 12,
    },
  })

  console.log(`  ✅ Created ${9} users`)

  // ============ CATEGORIES ============
  console.log('Creating categories...')
  const categories = await Promise.all([
    db.category.create({
      data: {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Learn HTML, CSS, JavaScript, React, Next.js, and modern web frameworks.',
        icon: '💻',
      },
    }),
    db.category.create({
      data: {
        name: 'Mobile Development',
        slug: 'mobile-development',
        description: 'Build native and cross-platform mobile apps with React Native, Flutter, and Swift.',
        icon: '📱',
      },
    }),
    db.category.create({
      data: {
        name: 'Data Science',
        slug: 'data-science',
        description: 'Master data analysis, visualization, machine learning, and AI.',
        icon: '📊',
      },
    }),
    db.category.create({
      data: {
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'Design beautiful, user-friendly interfaces and experiences.',
        icon: '🎨',
      },
    }),
    db.category.create({
      data: {
        name: 'DevOps',
        slug: 'devops',
        description: 'Learn Docker, Kubernetes, CI/CD, and cloud infrastructure.',
        icon: '🔧',
      },
    }),
    db.category.create({
      data: {
        name: 'Machine Learning',
        slug: 'machine-learning',
        description: 'Deep dive into neural networks, NLP, computer vision, and deep learning.',
        icon: '🤖',
      },
    }),
    db.category.create({
      data: {
        name: 'Cloud Computing',
        slug: 'cloud-computing',
        description: 'Master AWS, Azure, GCP, and cloud architecture patterns.',
        icon: '☁️',
      },
    }),
    db.category.create({
      data: {
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        description: 'Learn ethical hacking, security best practices, and network defense.',
        icon: '🔒',
      },
    }),
  ])

  console.log(`  ✅ Created ${categories.length} categories`)

  // ============ COURSES ============
  console.log('Creating courses...')

  const courses = await Promise.all([
    // Course 1 - PUBLISHED, Featured
    db.course.create({
      data: {
        title: 'Complete Web Development Bootcamp',
        slug: 'complete-web-development-bootcamp',
        description: 'A comprehensive course covering HTML5, CSS3, JavaScript, React, Node.js, and MongoDB. Build 20+ real-world projects from scratch and become a full-stack web developer.',
        shortDesc: 'Master full-stack web development with 20+ projects',
        thumbnail: '',
        previewVideo: '',
        level: 'BEGINNER',
        language: 'English',
        price: 89.99,
        discountPrice: 49.99,
        duration: 7200,
        status: 'PUBLISHED',
        isFeatured: true,
        maxStudents: 500,
        categorySlug: 'web-development',
        instructorId: instructor1.id,
      },
    }),
    // Course 2 - PUBLISHED, Featured
    db.course.create({
      data: {
        title: 'React & Next.js Masterclass',
        slug: 'react-nextjs-masterclass',
        description: 'Learn React 19, Next.js 16, TypeScript, and modern web development patterns. Build production-ready applications with server components, streaming, and edge functions.',
        shortDesc: 'Build production apps with React 19 and Next.js 16',
        thumbnail: '',
        previewVideo: '',
        level: 'INTERMEDIATE',
        language: 'English',
        price: 79.99,
        discountPrice: 44.99,
        duration: 5400,
        status: 'PUBLISHED',
        isFeatured: true,
        maxStudents: 300,
        categorySlug: 'web-development',
        instructorId: instructor1.id,
      },
    }),
    // Course 3 - PUBLISHED, Featured
    db.course.create({
      data: {
        title: 'Python for Data Science',
        slug: 'python-for-data-science',
        description: 'Learn Python programming for data science including NumPy, Pandas, Matplotlib, Seaborn, and Scikit-learn. Analyze real-world datasets and build predictive models.',
        shortDesc: 'Master Python for data analysis and visualization',
        thumbnail: '',
        previewVideo: '',
        level: 'BEGINNER',
        language: 'English',
        price: 69.99,
        discountPrice: 39.99,
        duration: 4800,
        status: 'PUBLISHED',
        isFeatured: true,
        maxStudents: 400,
        categorySlug: 'data-science',
        instructorId: instructor2.id,
      },
    }),
    // Course 4 - PUBLISHED, Featured
    db.course.create({
      data: {
        title: 'UI/UX Design Fundamentals',
        slug: 'ui-ux-design-fundamentals',
        description: 'Learn the principles of user interface and user experience design. Master Figma, design systems, wireframing, prototyping, and usability testing.',
        shortDesc: 'Design beautiful interfaces with Figma',
        thumbnail: '',
        previewVideo: '',
        level: 'BEGINNER',
        language: 'English',
        price: 59.99,
        discountPrice: 34.99,
        duration: 3600,
        status: 'PUBLISHED',
        isFeatured: true,
        maxStudents: 350,
        categorySlug: 'ui-ux-design',
        instructorId: instructor3.id,
      },
    }),
    // Course 5 - PUBLISHED
    db.course.create({
      data: {
        title: 'React Native Mobile App Development',
        slug: 'react-native-mobile-app-development',
        description: 'Build beautiful cross-platform mobile apps for iOS and Android using React Native and Expo. Learn navigation, state management, native APIs, and app deployment.',
        shortDesc: 'Build iOS and Android apps with one codebase',
        thumbnail: '',
        previewVideo: '',
        level: 'INTERMEDIATE',
        language: 'English',
        price: 74.99,
        discountPrice: 42.99,
        duration: 4200,
        status: 'PUBLISHED',
        isFeatured: true,
        categorySlug: 'mobile-development',
        instructorId: instructor1.id,
      },
    }),
    // Course 6 - PUBLISHED
    db.course.create({
      data: {
        title: 'Machine Learning with TensorFlow',
        slug: 'machine-learning-tensorflow',
        description: 'Learn machine learning from scratch using TensorFlow and Keras. Build neural networks for classification, regression, NLP, and computer vision tasks.',
        shortDesc: 'Build intelligent systems with TensorFlow',
        thumbnail: '',
        previewVideo: '',
        level: 'INTERMEDIATE',
        language: 'English',
        price: 99.99,
        discountPrice: 54.99,
        duration: 6000,
        status: 'PUBLISHED',
        categorySlug: 'machine-learning',
        instructorId: instructor2.id,
      },
    }),
    // Course 7 - PUBLISHED
    db.course.create({
      data: {
        title: 'Docker & Kubernetes Masterclass',
        slug: 'docker-kubernetes-masterclass',
        description: 'Master containerization with Docker and orchestration with Kubernetes. Learn CI/CD pipelines, Helm charts, service mesh, and production deployment strategies.',
        shortDesc: 'Container orchestration for production',
        thumbnail: '',
        previewVideo: '',
        level: 'INTERMEDIATE',
        language: 'English',
        price: 84.99,
        discountPrice: 47.99,
        duration: 4500,
        status: 'PUBLISHED',
        categorySlug: 'devops',
        instructorId: instructor1.id,
      },
    }),
    // Course 8 - PUBLISHED
    db.course.create({
      data: {
        title: 'AWS Cloud Practitioner',
        slug: 'aws-cloud-practitioner',
        description: 'Prepare for the AWS Cloud Practitioner certification. Learn cloud concepts, AWS services, security, pricing, and architecture best practices.',
        shortDesc: 'Get AWS certified with hands-on labs',
        thumbnail: '',
        previewVideo: '',
        level: 'BEGINNER',
        language: 'English',
        price: 79.99,
        discountPrice: 39.99,
        duration: 3600,
        status: 'PUBLISHED',
        categorySlug: 'cloud-computing',
        instructorId: instructor1.id,
      },
    }),
    // Course 9 - PUBLISHED
    db.course.create({
      data: {
        title: 'Ethical Hacking & Penetration Testing',
        slug: 'ethical-hacking-penetration-testing',
        description: 'Learn ethical hacking techniques, vulnerability assessment, and penetration testing. Master tools like Kali Linux, Metasploit, Nmap, and Burp Suite.',
        shortDesc: 'Learn to hack ethically and defend systems',
        thumbnail: '',
        previewVideo: '',
        level: 'ADVANCED',
        language: 'English',
        price: 94.99,
        discountPrice: 59.99,
        duration: 5400,
        status: 'PUBLISHED',
        categorySlug: 'cybersecurity',
        instructorId: instructor1.id,
      },
    }),
    // Course 10 - PUBLISHED
    db.course.create({
      data: {
        title: 'TypeScript for Professionals',
        slug: 'typescript-for-professionals',
        description: 'Master TypeScript for building large-scale applications. Learn advanced types, generics, decorators, and integration with React, Node.js, and more.',
        shortDesc: 'Level up your JavaScript with TypeScript',
        thumbnail: '',
        previewVideo: '',
        level: 'INTERMEDIATE',
        language: 'English',
        price: 0,
        status: 'PUBLISHED',
        categorySlug: 'web-development',
        instructorId: instructor1.id,
      },
    }),
    // Course 11 - PUBLISHED
    db.course.create({
      data: {
        title: 'Flutter Mobile Development',
        slug: 'flutter-mobile-development',
        description: 'Build stunning cross-platform apps with Flutter and Dart. Learn widgets, state management with Riverpod, Firebase integration, and app store deployment.',
        shortDesc: 'Create beautiful apps with Flutter and Dart',
        thumbnail: '',
        previewVideo: '',
        level: 'BEGINNER',
        language: 'English',
        price: 69.99,
        discountPrice: 39.99,
        duration: 3900,
        status: 'PUBLISHED',
        categorySlug: 'mobile-development',
        instructorId: instructor3.id,
      },
    }),
    // Course 12 - PUBLISHED
    db.course.create({
      data: {
        title: 'Advanced CSS & Modern Layouts',
        slug: 'advanced-css-modern-layouts',
        description: 'Master advanced CSS including Grid, Flexbox, animations, custom properties, and responsive design patterns. Build complex layouts like a pro.',
        shortDesc: 'Master CSS Grid, Flexbox, and animations',
        thumbnail: '',
        previewVideo: '',
        level: 'INTERMEDIATE',
        language: 'English',
        price: 0,
        status: 'PUBLISHED',
        categorySlug: 'web-development',
        instructorId: instructor3.id,
      },
    }),
    // Course 13 - PUBLISHED
    db.course.create({
      data: {
        title: 'Deep Learning with PyTorch',
        slug: 'deep-learning-pytorch',
        description: 'Build deep learning models with PyTorch. Learn CNNs, RNNs, GANs, transformers, and deploy models to production using TorchServe.',
        shortDesc: 'Build cutting-edge AI with PyTorch',
        thumbnail: '',
        previewVideo: '',
        level: 'ADVANCED',
        language: 'English',
        price: 89.99,
        discountPrice: 54.99,
        duration: 5100,
        status: 'PUBLISHED',
        categorySlug: 'machine-learning',
        instructorId: instructor2.id,
      },
    }),
  ])

  console.log(`  ✅ Created ${courses.length} courses`)

  // ============ SECTIONS & LESSONS ============
  console.log('Creating sections and lessons...')

  const courseSectionsData: Record<string, Array<{ title: string; lessons: Array<{ title: string; type: string; duration: number; content: string; isPreview: boolean }> }>> = {
    [courses[0].id]: [ // Web Dev Bootcamp
      {
        title: 'Getting Started with Web Development',
        lessons: [
          { title: 'Introduction to Web Development', type: 'VIDEO', duration: 15, content: 'https://example.com/videos/webdev-intro.mp4', isPreview: true },
          { title: 'Setting Up Your Development Environment', type: 'VIDEO', duration: 20, content: 'https://example.com/videos/setup-dev-env.mp4', isPreview: true },
          { title: 'How the Web Works', type: 'TEXT', duration: 10, content: 'The web operates on a client-server model. When you type a URL, your browser sends a request to a server, which responds with HTML, CSS, and JavaScript files.', isPreview: false },
          { title: 'Web Development Basics Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
        ],
      },
      {
        title: 'HTML5 Fundamentals',
        lessons: [
          { title: 'HTML Document Structure', type: 'VIDEO', duration: 18, content: 'https://example.com/videos/html-structure.mp4', isPreview: true },
          { title: 'Semantic HTML Elements', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/semantic-html.mp4', isPreview: false },
          { title: 'Forms and Input Validation', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/html-forms.mp4', isPreview: false },
          { title: 'HTML Accessibility Best Practices', type: 'TEXT', duration: 12, content: 'Learn how to make your HTML accessible with ARIA labels, semantic elements, and proper heading hierarchy.', isPreview: false },
        ],
      },
      {
        title: 'CSS3 and Modern Styling',
        lessons: [
          { title: 'CSS Box Model and Selectors', type: 'VIDEO', duration: 20, content: 'https://example.com/videos/css-box-model.mp4', isPreview: true },
          { title: 'Flexbox Layout', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/flexbox.mp4', isPreview: false },
          { title: 'CSS Grid Layout', type: 'VIDEO', duration: 28, content: 'https://example.com/videos/css-grid.mp4', isPreview: false },
          { title: 'Responsive Design with Media Queries', type: 'VIDEO', duration: 18, content: 'https://example.com/videos/responsive.mp4', isPreview: false },
          { title: 'CSS Fundamentals Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
        ],
      },
      {
        title: 'JavaScript Essentials',
        lessons: [
          { title: 'Variables, Types, and Operators', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/js-variables.mp4', isPreview: true },
          { title: 'Functions and Scope', type: 'VIDEO', duration: 20, content: 'https://example.com/videos/js-functions.mp4', isPreview: false },
          { title: 'DOM Manipulation', type: 'VIDEO', duration: 30, content: 'https://example.com/videos/js-dom.mp4', isPreview: false },
          { title: 'ES6+ Features', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/js-es6.mp4', isPreview: false },
        ],
      },
    ],
    [courses[1].id]: [ // React & Next.js
      {
        title: 'React Fundamentals',
        lessons: [
          { title: 'Introduction to React', type: 'VIDEO', duration: 15, content: 'https://example.com/videos/react-intro.mp4', isPreview: true },
          { title: 'Components and Props', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/react-components.mp4', isPreview: true },
          { title: 'State and Lifecycle', type: 'VIDEO', duration: 28, content: 'https://example.com/videos/react-state.mp4', isPreview: false },
          { title: 'React Fundamentals Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
        ],
      },
      {
        title: 'Advanced React Patterns',
        lessons: [
          { title: 'Hooks Deep Dive', type: 'VIDEO', duration: 30, content: 'https://example.com/videos/react-hooks.mp4', isPreview: false },
          { title: 'Context API and State Management', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/react-context.mp4', isPreview: false },
          { title: 'Performance Optimization', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/react-perf.mp4', isPreview: false },
          { title: 'Custom Hooks', type: 'TEXT', duration: 15, content: 'Learn how to create reusable custom hooks for common patterns like data fetching, form handling, and animations.', isPreview: false },
        ],
      },
      {
        title: 'Next.js Framework',
        lessons: [
          { title: 'Next.js App Router', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/nextjs-router.mp4', isPreview: true },
          { title: 'Server Components vs Client Components', type: 'VIDEO', duration: 28, content: 'https://example.com/videos/nextjs-components.mp4', isPreview: false },
          { title: 'Data Fetching and Caching', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/nextjs-data.mp4', isPreview: false },
          { title: 'Next.js Fundamentals Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
        ],
      },
    ],
    [courses[2].id]: [ // Python for Data Science
      {
        title: 'Python Basics',
        lessons: [
          { title: 'Getting Started with Python', type: 'VIDEO', duration: 18, content: 'https://example.com/videos/python-intro.mp4', isPreview: true },
          { title: 'Data Types and Structures', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/python-types.mp4', isPreview: true },
          { title: 'Functions and Modules', type: 'VIDEO', duration: 20, content: 'https://example.com/videos/python-functions.mp4', isPreview: false },
          { title: 'Python Basics Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
        ],
      },
      {
        title: 'Data Analysis with Pandas',
        lessons: [
          { title: 'Introduction to Pandas', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/pandas-intro.mp4', isPreview: true },
          { title: 'Data Cleaning and Preprocessing', type: 'VIDEO', duration: 28, content: 'https://example.com/videos/pandas-cleaning.mp4', isPreview: false },
          { title: 'Data Aggregation and Grouping', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/pandas-agg.mp4', isPreview: false },
        ],
      },
      {
        title: 'Data Visualization',
        lessons: [
          { title: 'Matplotlib Basics', type: 'VIDEO', duration: 20, content: 'https://example.com/videos/matplotlib.mp4', isPreview: false },
          { title: 'Seaborn for Statistical Plots', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/seaborn.mp4', isPreview: false },
          { title: 'Creating Dashboards', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/dashboards.mp4', isPreview: false },
          { title: 'Data Visualization Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
        ],
      },
    ],
    [courses[3].id]: [ // UI/UX Design
      {
        title: 'Design Principles',
        lessons: [
          { title: 'Introduction to UI/UX Design', type: 'VIDEO', duration: 15, content: 'https://example.com/videos/uiux-intro.mp4', isPreview: true },
          { title: 'Visual Hierarchy and Layout', type: 'VIDEO', duration: 20, content: 'https://example.com/videos/visual-hierarchy.mp4', isPreview: true },
          { title: 'Color Theory for Designers', type: 'VIDEO', duration: 18, content: 'https://example.com/videos/color-theory.mp4', isPreview: false },
          { title: 'Typography Fundamentals', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/typography.mp4', isPreview: false },
          { title: 'Design Principles Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
        ],
      },
      {
        title: 'Figma Masterclass',
        lessons: [
          { title: 'Figma Interface and Tools', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/figma-tools.mp4', isPreview: true },
          { title: 'Building a Design System', type: 'VIDEO', duration: 30, content: 'https://example.com/videos/design-system.mp4', isPreview: false },
          { title: 'Prototyping and Interactions', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/prototyping.mp4', isPreview: false },
        ],
      },
      {
        title: 'User Research and Testing',
        lessons: [
          { title: 'User Research Methods', type: 'VIDEO', duration: 20, content: 'https://example.com/videos/user-research.mp4', isPreview: false },
          { title: 'Usability Testing', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/usability-testing.mp4', isPreview: false },
          { title: 'Creating Wireframes and User Flows', type: 'TEXT', duration: 15, content: 'Learn to create wireframes and map out user flows for better product design.', isPreview: false },
        ],
      },
    ],
    [courses[4].id]: [ // React Native
      {
        title: 'React Native Fundamentals',
        lessons: [
          { title: 'Setting Up React Native', type: 'VIDEO', duration: 20, content: 'https://example.com/videos/rn-setup.mp4', isPreview: true },
          { title: 'Core Components', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/rn-components.mp4', isPreview: false },
          { title: 'Styling and Layout', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/rn-styling.mp4', isPreview: false },
          { title: 'React Native Basics Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
        ],
      },
      {
        title: 'Navigation and State',
        lessons: [
          { title: 'React Navigation', type: 'VIDEO', duration: 28, content: 'https://example.com/videos/rn-navigation.mp4', isPreview: false },
          { title: 'State Management Solutions', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/rn-state.mp4', isPreview: false },
          { title: 'API Integration', type: 'VIDEO', duration: 22, content: 'https://example.com/videos/rn-api.mp4', isPreview: false },
        ],
      },
    ],
  }

  // Create sections, lessons, and quizzes for remaining courses with minimal content
  const remainingCourses = courses.slice(5)
  for (const course of remainingCourses) {
    if (!courseSectionsData[course.id]) {
      courseSectionsData[course.id] = [
        {
          title: 'Course Introduction',
          lessons: [
            { title: 'Welcome and Course Overview', type: 'VIDEO', duration: 15, content: 'https://example.com/videos/welcome.mp4', isPreview: true },
            { title: 'Course Setup and Prerequisites', type: 'TEXT', duration: 10, content: 'Set up your development environment and install all required tools and dependencies for this course.', isPreview: true },
            { title: 'Introduction Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
          ],
        },
        {
          title: 'Core Concepts',
          lessons: [
            { title: 'Fundamental Concepts', type: 'VIDEO', duration: 25, content: 'https://example.com/videos/core-concepts.mp4', isPreview: false },
            { title: 'Hands-On Practice', type: 'VIDEO', duration: 30, content: 'https://example.com/videos/practice.mp4', isPreview: false },
            { title: 'Key Takeaways Quiz', type: 'QUIZ', duration: 5, content: '', isPreview: false },
          ],
        },
        {
          title: 'Advanced Topics',
          lessons: [
            { title: 'Advanced Techniques', type: 'VIDEO', duration: 28, content: 'https://example.com/videos/advanced.mp4', isPreview: false },
            { title: 'Real-World Applications', type: 'VIDEO', duration: 32, content: 'https://example.com/videos/real-world.mp4', isPreview: false },
          ],
        },
        {
          title: 'Project and Wrap Up',
          lessons: [
            { title: 'Final Project Walkthrough', type: 'VIDEO', duration: 35, content: 'https://example.com/videos/final-project.mp4', isPreview: false },
            { title: 'Course Review Quiz', type: 'QUIZ', duration: 8, content: '', isPreview: false },
            { title: 'Next Steps and Resources', type: 'TEXT', duration: 10, content: 'Explore advanced resources and continue your learning journey.', isPreview: false },
          ],
        },
      ]
    }
  }

  const allQuizIds: Record<string, string> = {}

  for (const [courseId, sectionsData] of Object.entries(courseSectionsData)) {
    for (let sIdx = 0; sIdx < sectionsData.length; sIdx++) {
      const sectionData = sectionsData[sIdx]
      const section = await db.section.create({
        data: {
          title: sectionData.title,
          order: sIdx,
          courseId,
        },
      })

      for (let lIdx = 0; lIdx < sectionData.lessons.length; lIdx++) {
        const lessonData = sectionData.lessons[lIdx]
        let quizId: string | undefined

        if (lessonData.type === 'QUIZ') {
          // Create quiz
          const quiz = await db.quiz.create({
            data: {
              title: `${sectionData.title} Quiz`,
              passingScore: 60,
              timeLimit: 10,
            },
          })
          quizId = quiz.id
          allQuizIds[lessonData.title] = quiz.id
        }

        await db.lesson.create({
          data: {
            title: lessonData.title,
            type: lessonData.type,
            content: lessonData.content || null,
            duration: lessonData.duration,
            isPreview: lessonData.isPreview,
            isFree: lessonData.isPreview,
            order: lIdx,
            sectionId: section.id,
            courseId,
            quizId,
          },
        })
      }
    }
  }

  console.log('  ✅ Created sections and lessons')

  // ============ QUIZ QUESTIONS ============
  console.log('Creating quiz questions...')

  const quizQuestionsData: Record<string, Array<{ question: string; options: string[]; correctAnswer: number[]; explanation: string }>> = {
    'Web Development Basics Quiz': [
      { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctAnswer: [0], explanation: 'HTML stands for Hyper Text Markup Language, the standard markup language for creating web pages.' },
      { question: 'Which protocol is used to transfer web pages?', options: ['FTP', 'HTTP', 'SMTP', 'TCP'], correctAnswer: [1], explanation: 'HTTP (HyperText Transfer Protocol) is the foundation of data communication on the World Wide Web.' },
      { question: 'What is the correct HTML element for the largest heading?', options: ['<heading>', '<h6>', '<h1>', '<head>'], correctAnswer: [2], explanation: '<h1> defines the largest heading in HTML.' },
      { question: 'Which company developed JavaScript?', options: ['Microsoft', 'Google', 'Netscape', 'Apple'], correctAnswer: [2], explanation: 'JavaScript was developed by Brendan Eich at Netscape Communications.' },
      { question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Creative Style System', 'Cascading Style Sheets', 'Colorful Style Sheets'], correctAnswer: [2], explanation: 'CSS stands for Cascading Style Sheets, used to style and layout web pages.' },
    ],
    'CSS Fundamentals Quiz': [
      { question: 'What is the CSS box model?', options: ['Margin, Border, Padding, Content', 'Width, Height, Depth, Color', 'Top, Right, Bottom, Left', 'Font, Size, Weight, Style'], correctAnswer: [0], explanation: 'The CSS box model consists of: Content, Padding, Border, and Margin.' },
      { question: 'Which CSS property is used to change the text color?', options: ['font-color', 'text-color', 'color', 'foreground-color'], correctAnswer: [2], explanation: 'The CSS "color" property is used to set the color of text content.' },
      { question: 'What does "display: flex" do?', options: ['Makes element invisible', 'Enables flexbox layout', 'Sets element to inline', 'Makes element float'], correctAnswer: [1], explanation: 'display: flex enables the Flexbox layout model for the element.' },
      { question: 'Which unit is relative to the viewport width?', options: ['px', 'em', 'vw', 'rem'], correctAnswer: [2], explanation: 'vw (viewport width) is relative to 1% of the viewport width.' },
      { question: 'How do you make text bold in CSS?', options: ['font-weight: bold', 'text-style: bold', 'font-style: bold', 'text-weight: bold'], correctAnswer: [0], explanation: 'font-weight: bold is the correct CSS property to make text bold.' },
    ],
    'React Fundamentals Quiz': [
      { question: 'What is React primarily used for?', options: ['Database management', 'Building user interfaces', 'Server configuration', 'CSS preprocessing'], correctAnswer: [1], explanation: 'React is a JavaScript library for building user interfaces.' },
      { question: 'What is JSX?', options: ['A CSS framework', 'JavaScript XML syntax extension', 'A database query language', 'A testing framework'], correctAnswer: [1], explanation: 'JSX is a syntax extension for JavaScript that allows writing HTML-like code in React.' },
      { question: 'How do you pass data to a child component?', options: ['State', 'Props', 'Refs', 'Context'], correctAnswer: [1], explanation: 'Props (properties) are used to pass data from parent to child components in React.' },
      { question: 'What hook is used for side effects?', options: ['useState', 'useRef', 'useEffect', 'useMemo'], correctAnswer: [2], explanation: 'useEffect is the React hook designed for handling side effects like data fetching.' },
      { question: 'What is the virtual DOM?', options: ['A copy of the real DOM in memory', 'A CSS preprocessor', 'A JavaScript framework', 'A web browser feature'], correctAnswer: [0], explanation: 'The virtual DOM is a lightweight copy of the actual DOM that React uses for efficient updates.' },
    ],
    'Next.js Fundamentals Quiz': [
      { question: 'What is the App Router in Next.js?', options: ['A hardware router', 'A file-system based routing mechanism', 'A CSS framework', 'A database tool'], correctAnswer: [1], explanation: 'The App Router uses the "app" directory for file-system based routing in Next.js.' },
      { question: 'What are Server Components?', options: ['Components running on client only', 'Components that render on the server', 'Components for server configuration', 'Components for API handling'], correctAnswer: [1], explanation: 'Server Components render on the server and send HTML to the client, improving performance.' },
      { question: 'How do you create dynamic routes?', options: ['Using brackets like [id]', 'Using hash symbols like #id', 'Using curly braces like {id}', 'Using parentheses like (id)'], correctAnswer: [0], explanation: 'Dynamic route segments in Next.js use bracket notation like [id].ts.' },
    ],
    'Python Basics Quiz': [
      { question: 'What is the output of print(type(5))?', options: ["<class 'int'>", "<class 'number'>", "<class 'float'>", "<class 'str'>"], correctAnswer: [0], explanation: '5 is an integer in Python, so type(5) returns <class "int">.' },
      { question: 'Which keyword is used to define a function?', options: ['function', 'func', 'def', 'define'], correctAnswer: [2], explanation: 'The "def" keyword is used to define functions in Python.' },
      { question: 'What is a list comprehension?', options: ['A way to understand lists', 'A concise way to create lists', 'A sorting algorithm', 'A type of variable'], correctAnswer: [1], explanation: 'List comprehensions provide a concise syntax for creating lists in Python.' },
      { question: 'What does len() do?', options: ['Returns the length of an object', 'Returns the last element', 'Converts to lowercase', 'Logs an error'], correctAnswer: [0], explanation: 'len() returns the number of items in an object.' },
      { question: 'Which data structure is immutable?', options: ['list', 'dict', 'set', 'tuple'], correctAnswer: [3], explanation: 'Tuples are immutable sequences in Python.' },
    ],
    'Data Visualization Quiz': [
      { question: 'Which library is commonly used for basic plotting in Python?', options: ['NumPy', 'Matplotlib', 'TensorFlow', 'Flask'], correctAnswer: [1], explanation: 'Matplotlib is the most widely used library for creating plots and visualizations in Python.' },
      { question: 'What is a scatter plot used for?', options: ['Showing trends over time', 'Showing relationships between variables', 'Showing proportions', 'Showing distributions'], correctAnswer: [1], explanation: 'Scatter plots display values for two variables as a collection of points.' },
      { question: 'What does Seaborn provide over Matplotlib?', options: ['Better performance', 'Statistical plotting and beautiful defaults', '3D plotting', 'Audio visualization'], correctAnswer: [1], explanation: 'Seaborn provides a high-level interface for statistical graphics with attractive defaults.' },
    ],
    'Design Principles Quiz': [
      { question: 'What is visual hierarchy?', options: ['The order of CSS properties', 'Arrangement of elements to show importance', 'A type of font', 'A color scheme'], correctAnswer: [1], explanation: 'Visual hierarchy is the arrangement of design elements to show their order of importance.' },
      { question: 'How many main colors should a design typically use?', options: ['1-2', '3-5', '8-10', 'As many as possible'], correctAnswer: [1], explanation: 'A good design typically uses 3-5 main colors for a cohesive look.' },
      { question: 'What is the 60-30-10 rule in design?', options: ['Color distribution rule', 'Layout spacing rule', 'Font size rule', 'Animation timing rule'], correctAnswer: [0], explanation: 'The 60-30-10 rule suggests using 60% dominant, 30% secondary, and 10% accent colors.' },
      { question: 'What is whitespace?', options: ['The color white', 'Empty space around elements', 'A CSS property', 'A design tool'], correctAnswer: [1], explanation: 'Whitespace is the empty space between and around design elements that improves readability.' },
      { question: 'What is a design system?', options: ['An operating system', 'A collection of reusable components and guidelines', 'A file management tool', 'A version control system'], correctAnswer: [1], explanation: 'A design system is a collection of reusable components, patterns, and guidelines.' },
    ],
    'React Native Basics Quiz': [
      { question: 'What is React Native?', options: ['A CSS framework', 'A framework for building native mobile apps', 'A database', 'A server technology'], correctAnswer: [1], explanation: 'React Native is a framework for building native mobile apps using React.' },
      { question: 'What is Expo?', options: ['A conference', 'A toolchain for React Native development', 'A CSS library', 'A state management library'], correctAnswer: [1], explanation: 'Expo is a framework and platform for universal React applications.' },
      { question: 'Which component is used for scrollable lists?', options: ['<div>', '<ScrollView>', '<FlatList>', '<List>'], correctAnswer: [2], explanation: 'FlatList is the most performant component for rendering lists in React Native.' },
    ],
    'Introduction Quiz': [
      { question: 'What will you learn in this course?', options: ['Cooking', 'Programming and Technology', 'Sports', 'Music'], correctAnswer: [1], explanation: 'This course covers programming and technology concepts.' },
      { question: 'How should you approach this course?', options: ['Skip all videos', 'Watch passively', 'Follow along with hands-on practice', 'Read only text lessons'], correctAnswer: [2], explanation: 'The best way to learn is by following along and practicing hands-on.' },
      { question: 'What is required for this course?', options: ['No prerequisites', 'A computer and internet', 'A PhD', 'Expensive software'], correctAnswer: [1], explanation: 'A computer and internet connection are the basic requirements.' },
    ],
    'Key Takeaways Quiz': [
      { question: 'Which concept was covered in this section?', options: ['History of computers', 'Core course concepts', 'Philosophy of programming', 'Mathematical proofs'], correctAnswer: [1], explanation: 'This section covered the core concepts of the course topic.' },
      { question: 'Why is practice important?', options: ['It is not important', 'It reinforces learning', 'It is only for beginners', 'It wastes time'], correctAnswer: [1], explanation: 'Practice reinforces learning and builds muscle memory for skills.' },
      { question: 'What should you do if you get stuck?', options: ['Give up', 'Review the material and try again', 'Skip the topic', 'Blame the instructor'], correctAnswer: [1], explanation: 'Review the material, search for help, and try again. Persistence is key.' },
    ],
    'Course Review Quiz': [
      { question: 'Did you complete all lessons?', options: ['Yes, all of them', 'Most of them', 'Some of them', 'No'], correctAnswer: [0], explanation: 'Completing all lessons ensures comprehensive understanding.' },
      { question: 'What is the best way to continue learning?', options: ['Stop learning', 'Build projects and explore advanced topics', 'Reread everything', 'Watch YouTube only'], correctAnswer: [1], explanation: 'Building real projects and exploring advanced topics is the best way to continue growing.' },
      { question: 'Should you review this course periodically?', options: ['No', 'Yes, to reinforce knowledge', 'Only if forced', 'Never'], correctAnswer: [1], explanation: 'Periodic review helps reinforce and deepen your understanding of the material.' },
    ],
  }

  for (const [quizTitle, questions] of Object.entries(quizQuestionsData)) {
    const quizId = allQuizIds[quizTitle]
    if (!quizId) continue

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      await db.quizQuestion.create({
        data: {
          question: q.question,
          options: JSON.stringify(q.options),
          correctAnswer: JSON.stringify(q.correctAnswer),
          explanation: q.explanation,
          order: i,
          quizId,
        },
      })
    }
  }

  console.log('  ✅ Created quiz questions')

  // ============ ENROLLMENTS ============
  console.log('Creating enrollments...')

  const enrollments = await Promise.all([
    db.enrollment.create({ data: { userId: student1.id, courseId: courses[0].id, status: 'ACTIVE', progress: 65 } }),
    db.enrollment.create({ data: { userId: student1.id, courseId: courses[1].id, status: 'ACTIVE', progress: 30 } }),
    db.enrollment.create({ data: { userId: student1.id, courseId: courses[2].id, status: 'COMPLETED', progress: 100, completedAt: new Date('2024-10-15') } }),
    db.enrollment.create({ data: { userId: student2.id, courseId: courses[2].id, status: 'ACTIVE', progress: 45 } }),
    db.enrollment.create({ data: { userId: student2.id, courseId: courses[5].id, status: 'ACTIVE', progress: 20 } }),
    db.enrollment.create({ data: { userId: student2.id, courseId: courses[3].id, status: 'COMPLETED', progress: 100, completedAt: new Date('2024-11-01') } }),
    db.enrollment.create({ data: { userId: student3.id, courseId: courses[0].id, status: 'COMPLETED', progress: 100, completedAt: new Date('2024-09-20') } }),
    db.enrollment.create({ data: { userId: student3.id, courseId: courses[6].id, status: 'ACTIVE', progress: 55 } }),
    db.enrollment.create({ data: { userId: student3.id, courseId: courses[7].id, status: 'ACTIVE', progress: 40 } }),
    db.enrollment.create({ data: { userId: student3.id, courseId: courses[1].id, status: 'COMPLETED', progress: 100, completedAt: new Date('2024-10-01') } }),
    db.enrollment.create({ data: { userId: student4.id, courseId: courses[4].id, status: 'ACTIVE', progress: 35 } }),
    db.enrollment.create({ data: { userId: student4.id, courseId: courses[10].id, status: 'ACTIVE', progress: 25 } }),
    db.enrollment.create({ data: { userId: student5.id, courseId: courses[6].id, status: 'ACTIVE', progress: 50 } }),
    db.enrollment.create({ data: { userId: student5.id, courseId: courses[7].id, status: 'COMPLETED', progress: 100, completedAt: new Date('2024-11-10') } }),
    db.enrollment.create({ data: { userId: student5.id, courseId: courses[8].id, status: 'ACTIVE', progress: 15 } }),
    db.enrollment.create({ data: { userId: student1.id, courseId: courses[9].id, status: 'COMPLETED', progress: 100, completedAt: new Date('2024-08-01') } }),
  ])

  console.log(`  ✅ Created ${enrollments.length} enrollments`)

  // ============ REVIEWS ============
  console.log('Creating reviews...')

  await Promise.all([
    db.review.create({ data: { userId: student1.id, courseId: courses[0].id, rating: 5, comment: 'Absolutely amazing course! The instructor explains everything clearly and the projects are really practical. Highly recommended for beginners.' } }),
    db.review.create({ data: { userId: student3.id, courseId: courses[0].id, rating: 4, comment: 'Great comprehensive bootcamp. Covers everything from basics to advanced topics. Some sections could be more concise.' } }),
    db.review.create({ data: { userId: student1.id, courseId: courses[1].id, rating: 5, comment: 'Best React/Next.js course I have taken. The server components section is incredibly well explained.' } }),
    db.review.create({ data: { userId: student3.id, courseId: courses[1].id, rating: 5, comment: 'Finally a course that covers Next.js 16 properly. The instructor is very knowledgeable.' } }),
    db.review.create({ data: { userId: student2.id, courseId: courses[2].id, rating: 4, comment: 'Great introduction to Python for data science. The pandas section is excellent. Could use more real-world datasets.' } }),
    db.review.create({ data: { userId: student1.id, courseId: courses[2].id, rating: 4, comment: 'Solid course for learning Python data analysis. Good balance of theory and practice.' } }),
    db.review.create({ data: { userId: student2.id, courseId: courses[3].id, rating: 5, comment: 'Emily is an incredible instructor! The design principles and Figma tutorials are top-notch.' } }),
    db.review.create({ data: { userId: student3.id, courseId: courses[6].id, rating: 4, comment: 'Very thorough Docker and Kubernetes course. The hands-on labs are really helpful.' } }),
    db.review.create({ data: { userId: student5.id, courseId: courses[7].id, rating: 5, comment: 'Passed my AWS Cloud Practitioner exam on the first try thanks to this course!' } }),
    db.review.create({ data: { userId: student4.id, courseId: courses[4].id, rating: 4, comment: 'Good course for learning React Native. The navigation section could use more examples.' } }),
    db.review.create({ data: { userId: student3.id, courseId: courses[7].id, rating: 3, comment: 'Decent course but some content feels outdated. Would like to see more recent AWS updates.' } }),
    db.review.create({ data: { userId: student5.id, courseId: courses[6].id, rating: 4, comment: 'Solid DevOps content. The CI/CD pipeline section is very practical.' } }),
    db.review.create({ data: { userId: student1.id, courseId: courses[9].id, rating: 5, comment: 'Free and incredibly valuable! Best TypeScript course available online.' } }),
    db.review.create({ data: { userId: student2.id, courseId: courses[5].id, rating: 4, comment: 'Comprehensive ML course with TensorFlow. The neural network explanations are very clear.' } }),
    db.review.create({ data: { userId: student4.id, courseId: courses[10].id, rating: 5, comment: 'Great Flutter course! The instructor explains everything clearly.' } }),
    db.review.create({ data: { userId: student5.id, courseId: courses[8].id, rating: 3, comment: 'Interesting content but quite advanced. Good for experienced developers.' } }),
  ])

  console.log('  ✅ Created 16 reviews')

  // ============ COUPONS ============
  console.log('Creating coupons...')

  const now = new Date()
  const threeMonthsFromNow = new Date(now)
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
  const sixMonthsFromNow = new Date(now)
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)

  await Promise.all([
    db.coupon.create({
      data: {
        code: 'LEARN20',
        discount: 20,
        maxUses: 1000,
        usedCount: 15,
        validFrom: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        validUntil: threeMonthsFromNow,
        isActive: true,
      },
    }),
    db.coupon.create({
      data: {
        code: 'WELCOME50',
        discount: 50,
        maxUses: 500,
        usedCount: 8,
        validFrom: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        validUntil: threeMonthsFromNow,
        isActive: true,
      },
    }),
    db.coupon.create({
      data: {
        code: 'SUMMER30',
        discount: 30,
        maxUses: 800,
        usedCount: 0,
        validFrom: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        validUntil: sixMonthsFromNow,
        isActive: true,
      },
    }),
    db.coupon.create({
      data: {
        code: 'FREECOURSE',
        discount: 100,
        maxUses: 50,
        usedCount: 3,
        validFrom: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
        validUntil: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
        isActive: true,
        courseId: courses[9].id,
      },
    }),
  ])

  console.log('  ✅ Created 4 coupons')

  // ============ PAYMENTS ============
  console.log('Creating payments...')

  await Promise.all([
    db.payment.create({ data: { amount: 49.99, currency: 'USD', method: 'STRIPE', status: 'COMPLETED', transactionId: 'txn_001', enrollmentId: enrollments[0].id, userId: student1.id } }),
    db.payment.create({ data: { amount: 44.99, currency: 'USD', method: 'STRIPE', status: 'COMPLETED', transactionId: 'txn_002', enrollmentId: enrollments[1].id, userId: student1.id } }),
    db.payment.create({ data: { amount: 39.99, currency: 'USD', method: 'PAYPAL', status: 'COMPLETED', transactionId: 'txn_003', couponCode: 'LEARN20', enrollmentId: enrollments[2].id, userId: student1.id } }),
    db.payment.create({ data: { amount: 39.99, currency: 'USD', method: 'STRIPE', status: 'COMPLETED', transactionId: 'txn_004', enrollmentId: enrollments[3].id, userId: student2.id } }),
    db.payment.create({ data: { amount: 54.99, currency: 'USD', method: 'STRIPE', status: 'COMPLETED', transactionId: 'txn_005', enrollmentId: enrollments[4].id, userId: student2.id } }),
    db.payment.create({ data: { amount: 34.99, currency: 'USD', method: 'PAYPAL', status: 'COMPLETED', transactionId: 'txn_006', enrollmentId: enrollments[5].id, userId: student2.id } }),
    db.payment.create({ data: { amount: 49.99, currency: 'USD', method: 'STRIPE', status: 'COMPLETED', transactionId: 'txn_007', couponCode: 'LEARN20', enrollmentId: enrollments[6].id, userId: student3.id } }),
    db.payment.create({ data: { amount: 47.99, currency: 'USD', method: 'STRIPE', status: 'COMPLETED', transactionId: 'txn_008', enrollmentId: enrollments[7].id, userId: student3.id } }),
    db.payment.create({ data: { amount: 39.99, currency: 'USD', method: 'STRIPE', status: 'COMPLETED', transactionId: 'txn_009', couponCode: 'WELCOME50', enrollmentId: enrollments[8].id, userId: student3.id } }),
    db.payment.create({ data: { amount: 42.99, currency: 'USD', method: 'PAYPAL', status: 'COMPLETED', transactionId: 'txn_010', enrollmentId: enrollments[10].id, userId: student4.id } }),
    db.payment.create({ data: { amount: 47.99, currency: 'USD', method: 'STRIPE', status: 'COMPLETED', transactionId: 'txn_011', enrollmentId: enrollments[12].id, userId: student5.id } }),
  ])

  console.log('  ✅ Created payments')

  // ============ WISHLIST ============
  console.log('Creating wishlist items...')

  await Promise.all([
    db.wishlist.create({ data: { userId: student1.id, courseId: courses[4].id } }),
    db.wishlist.create({ data: { userId: student1.id, courseId: courses[5].id } }),
    db.wishlist.create({ data: { userId: student2.id, courseId: courses[7].id } }),
    db.wishlist.create({ data: { userId: student3.id, courseId: courses[12].id } }),
    db.wishlist.create({ data: { userId: student4.id, courseId: courses[0].id } }),
    db.wishlist.create({ data: { userId: student5.id, courseId: courses[1].id } }),
  ])

  console.log('  ✅ Created wishlist items')

  // ============ BADGES ============
  console.log('Creating badges...')

  const badges = await Promise.all([
    db.badge.create({ data: { name: 'First Course', description: 'Completed your first course', icon: '🎓', criteria: 'COMPLETE_1_COURSE' } }),
    db.badge.create({ data: { name: 'Quick Learner', description: 'Completed 3 courses', icon: '📚', criteria: 'COMPLETE_3_COURSES' } }),
    db.badge.create({ data: { name: 'Scholar', description: 'Completed 5 courses', icon: '🏆', criteria: 'COMPLETE_5_COURSES' } }),
    db.badge.create({ data: { name: '7-Day Streak', description: 'Maintained a 7-day learning streak', icon: '🔥', criteria: 'STREAK_7' } }),
    db.badge.create({ data: { name: '30-Day Streak', description: 'Maintained a 30-day learning streak', icon: '⚡', criteria: 'STREAK_30' } }),
    db.badge.create({ data: { name: 'Top Reviewer', description: 'Wrote 5+ course reviews', icon: '⭐', criteria: 'WRITE_5_REVIEWS' } }),
    db.badge.create({ data: { name: 'Quiz Master', description: 'Passed 10 quizzes', icon: '🧠', criteria: 'PASS_10_QUIZZES' } }),
    db.badge.create({ data: { name: 'Early Adopter', description: 'Joined during the platform launch', icon: '🚀', criteria: 'EARLY_ADOPTER' } }),
    db.badge.create({ data: { name: 'Helpful Student', description: 'Participated in 10+ discussions', icon: '💬', criteria: 'PARTICIPATE_10_DISCUSSIONS' } }),
    db.badge.create({ data: { name: 'Achiever', description: 'Earned 500+ points', icon: '💎', criteria: 'EARN_500_POINTS' } }),
  ])

  // Award some badges
  await Promise.all([
    db.userBadge.create({ data: { userId: student3.id, badgeId: badges[0].id } }),
    db.userBadge.create({ data: { userId: student3.id, badgeId: badges[7].id } }),
    db.userBadge.create({ data: { userId: student1.id, badgeId: badges[0].id } }),
    db.userBadge.create({ data: { userId: student1.id, badgeId: badges[3].id } }),
    db.userBadge.create({ data: { userId: student2.id, badgeId: badges[0].id } }),
    db.userBadge.create({ data: { userId: student5.id, badgeId: badges[0].id } }),
    db.userBadge.create({ data: { userId: student5.id, badgeId: badges[3].id } }),
  ])

  console.log(`  ✅ Created ${badges.length} badges`)

  // ============ NOTIFICATIONS ============
  console.log('Creating notifications...')

  await Promise.all([
    db.notification.create({ data: { title: 'Welcome to LearnHub!', message: 'Start your learning journey by exploring our course catalog.', type: 'INFO', userId: student1.id } }),
    db.notification.create({ data: { title: 'New Course Available', message: '"Deep Learning with PyTorch" has just been published. Check it out!', type: 'INFO', userId: student1.id } }),
    db.notification.create({ data: { title: 'Course Completed! 🎉', message: 'Congratulations! You completed "Python for Data Science".', type: 'COMPLETION', userId: student1.id, isRead: true } }),
    db.notification.create({ data: { title: 'Welcome to LearnHub!', message: 'Start your learning journey by exploring our course catalog.', type: 'INFO', userId: student2.id } }),
    db.notification.create({ data: { title: 'Achievement Unlocked!', message: 'You earned the "First Course" badge. Keep up the great work!', type: 'SUCCESS', userId: student2.id, isRead: true } }),
    db.notification.create({ data: { title: 'Enrollment Confirmed', message: 'You have been enrolled in "Machine Learning with TensorFlow".', type: 'ENROLLMENT', userId: student2.id } }),
    db.notification.create({ data: { title: 'Welcome to LearnHub!', message: 'Start your learning journey by exploring our course catalog.', type: 'INFO', userId: student3.id } }),
    db.notification.create({ data: { title: 'Weekly Progress Report', message: 'You completed 12 lessons this week. You are on fire!', type: 'INFO', userId: student3.id, isRead: true } }),
    db.notification.create({ data: { title: 'Course Completed! 🎉', message: 'Congratulations! You completed "Complete Web Development Bootcamp".', type: 'COMPLETION', userId: student3.id, isRead: true } }),
    db.notification.create({ data: { title: 'New Enrollment', message: 'David Kim enrolled in your course "React & Next.js Masterclass".', type: 'ENROLLMENT', userId: instructor1.id } }),
    db.notification.create({ data: { title: 'New Review', message: 'Alex Thompson left a 5-star review on "Complete Web Development Bootcamp".', type: 'SUCCESS', userId: instructor1.id, isRead: true } }),
    db.notification.create({ data: { title: 'Platform Statistics', message: 'Your courses now have 50+ active students. Keep creating great content!', type: 'INFO', userId: instructor1.id } }),
    db.notification.create({ data: { title: 'New Review', message: 'Jessica Park left a 4-star review on your course.', type: 'SUCCESS', userId: instructor2.id, isRead: true } }),
  ])

  console.log('  ✅ Created 13 notifications')

  // ============ SUBSCRIPTION PLANS ============
  console.log('Creating subscription plans...')

  await Promise.all([
    db.subscriptionPlan.create({
      data: {
        name: 'Free',
        price: 0,
        interval: 'MONTHLY',
        features: JSON.stringify([
          'Access to free courses',
          'Basic progress tracking',
          'Community access',
          'Course previews',
        ]),
        maxCourses: 3,
        isActive: true,
      },
    }),
    db.subscriptionPlan.create({
      data: {
        name: 'Pro',
        price: 29,
        interval: 'MONTHLY',
        features: JSON.stringify([
          'Access to all courses',
          'Advanced progress tracking',
          'Certificate of completion',
          'Priority support',
          'Downloadable resources',
          'Offline viewing',
        ]),
        isActive: true,
      },
    }),
    db.subscriptionPlan.create({
      data: {
        name: 'Enterprise',
        price: 99,
        interval: 'MONTHLY',
        features: JSON.stringify([
          'Everything in Pro',
          'Team management dashboard',
          'Custom learning paths',
          'Analytics and reports',
          'Dedicated account manager',
          'API access',
          'Custom branding',
        ]),
        isActive: true,
      },
    }),
  ])

  console.log('  ✅ Created 3 subscription plans')

  // ============ BLOG POSTS ============
  console.log('Creating blog posts...')

  await Promise.all([
    db.blogPost.create({
      data: {
        title: '10 Essential Skills Every Web Developer Should Master in 2025',
        slug: '10-essential-skills-web-developer-2025',
        content: `# 10 Essential Skills Every Web Developer Should Master in 2025

The web development landscape is constantly evolving. Whether you are a beginner or an experienced developer, staying up-to-date with the latest skills is crucial. Here are the 10 essential skills you should focus on this year.

## 1. TypeScript
TypeScript has become the standard for large-scale JavaScript applications. With its powerful type system, you can catch errors early and write more maintainable code.

## 2. React Server Components
React Server Components are revolutionizing how we build React applications. They allow you to render components on the server, reducing client-side JavaScript and improving performance.

## 3. CSS Architecture
Master modern CSS techniques including Grid, Flexbox, Container Queries, and CSS-in-JS solutions. Understanding how to build scalable design systems is essential.

## 4. API Design
Learn REST and GraphQL API design principles. Understanding how to design clean, efficient APIs is a must-have skill.

## 5. Testing
Writing tests is no longer optional. Master tools like Jest, React Testing Library, and Playwright for comprehensive test coverage.

## 6. Performance Optimization
Learn Lighthouse, Core Web Vitals, lazy loading, code splitting, and caching strategies to build fast web applications.

## 7. Accessibility (a11y)
Building inclusive web applications is both ethically right and legally required. Learn ARIA, semantic HTML, and screen reader testing.

## 8. DevOps Basics
Understand CI/CD pipelines, Docker, and basic deployment strategies. Even front-end developers benefit from understanding deployment.

## 9. State Management
Master modern state management solutions including Zustand, Jotai, and TanStack Query.

## 10. AI Integration
Learn to integrate AI services into your applications. From chatbots to content generation, AI is becoming a standard feature.

## Conclusion
The key to success in web development is continuous learning. Focus on building projects that use these skills, and you will stay ahead of the curve.`,
        excerpt: 'Stay ahead of the curve with these must-have web development skills for 2025.',
        authorId: instructor1.id,
        status: 'PUBLISHED',
        tags: JSON.stringify(['web-development', 'career', 'tips', '2025']),
      },
    }),
    db.blogPost.create({
      data: {
        title: 'A Beginner\'s Guide to Machine Learning: Everything You Need to Know',
        slug: 'beginners-guide-machine-learning',
        content: `# A Beginner's Guide to Machine Learning

Machine learning is transforming every industry. This guide will help you understand what machine learning is, how it works, and how to get started.

## What is Machine Learning?
Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

## Types of Machine Learning
1. **Supervised Learning** - Learning from labeled data
2. **Unsupervised Learning** - Finding patterns in unlabeled data
3. **Reinforcement Learning** - Learning through trial and error

## Getting Started
Start with Python and libraries like NumPy, Pandas, and Scikit-learn. These provide the foundation for any machine learning project.

## Building Your First Model
Begin with simple linear regression and work your way up to more complex algorithms like random forests and neural networks.

## Conclusion
Machine learning is accessible to everyone. Start small, practice consistently, and build real projects.`,
        excerpt: 'Start your machine learning journey with this comprehensive beginner guide.',
        authorId: instructor2.id,
        status: 'PUBLISHED',
        tags: JSON.stringify(['machine-learning', 'beginners', 'AI', 'data-science']),
      },
    }),
    db.blogPost.create({
      data: {
        title: 'The Complete Guide to UX Research Methods',
        slug: 'complete-guide-ux-research-methods',
        content: `# The Complete Guide to UX Research Methods

Great design starts with understanding your users. UX research is the systematic study of target users and their requirements.

## Why UX Research Matters
UX research helps you create products that people actually want to use. It reduces risk and increases the chances of product success.

## Key Research Methods

### Qualitative Methods
- **User Interviews** - One-on-one conversations
- **Focus Groups** - Group discussions
- **Usability Testing** - Observing users interact with your product
- **Contextual Inquiry** - Studying users in their natural environment

### Quantitative Methods
- **Surveys** - Gathering data at scale
- **A/B Testing** - Comparing two versions
- **Analytics** - Understanding user behavior through data
- **Card Sorting** - Understanding information architecture

## When to Use Each Method
Different research questions require different methods. Always start with a clear research objective.

## Building a Research Practice
Even small teams can incorporate UX research. Start with simple methods and scale as your team grows.`,
        excerpt: 'Learn the most effective UX research methods to build better products.',
        authorId: instructor3.id,
        status: 'PUBLISHED',
        tags: JSON.stringify(['ux-design', 'research', 'user-experience', 'design']),
      },
    }),
    db.blogPost.create({
      data: {
        title: 'Docker vs Kubernetes: When to Use What',
        slug: 'docker-vs-kubernetes-when-to-use',
        content: `# Docker vs Kubernetes: When to Use What

Containerization has revolutionized deployment, but choosing between Docker and Kubernetes can be confusing. Let us break it down.

## Docker: Container Runtime
Docker packages your application and its dependencies into a container that runs consistently across environments.

## Kubernetes: Container Orchestration
Kubernetes (K8s) manages containers at scale, handling deployment, scaling, networking, and monitoring.

## When to Use Docker Alone
- Small projects or single applications
- Development environments
- When you need simple containerization
- For teams just getting started with containers

## When to Use Kubernetes
- Multiple services or microservices
- High-availability requirements
- Auto-scaling needs
- Production workloads at scale

## They Work Together
Docker and Kubernetes are not competitors. Docker creates containers, and Kubernetes manages them. Most production environments use both.

## Getting Started
Start with Docker, then add Kubernetes when your deployment needs become more complex.`,
        excerpt: 'Understand the key differences between Docker and Kubernetes for your projects.',
        authorId: instructor1.id,
        status: 'PUBLISHED',
        tags: JSON.stringify(['devops', 'docker', 'kubernetes', 'containers']),
      },
    }),
    db.blogPost.create({
      data: {
        title: 'How to Build a Successful Career in Tech: Tips from Industry Experts',
        slug: 'how-to-build-successful-career-tech',
        content: `# How to Build a Successful Career in Tech

The tech industry offers incredible opportunities, but navigating it requires strategy. Here are tips from industry experts.

## 1. Build Real Projects
Nothing beats hands-on experience. Build projects that solve real problems and showcase your skills.

## 2. Learn to Communicate
Technical skills alone are not enough. The ability to explain complex concepts to non-technical stakeholders is invaluable.

## 3. Specialize, Then Diversify
Start with a specialization, then broaden your skills. A T-shaped skill profile is highly valued.

## 4. Network Actively
Attend meetups, conferences, and engage online. Many job opportunities come through connections.

## 5. Never Stop Learning
Technology changes fast. Dedicate time each week to learning new tools and concepts.

## 6. Contribute to Open Source
Contributing to open source projects demonstrates your skills and helps you collaborate with developers worldwide.

## 7. Build Your Personal Brand
Share your knowledge through blog posts, talks, and social media. It opens doors you did not know existed.

## Conclusion
A successful tech career is built on continuous learning, real projects, and strong relationships.`,
        excerpt: 'Practical advice from industry experts on building a thriving tech career.',
        authorId: admin.id,
        status: 'PUBLISHED',
        tags: JSON.stringify(['career', 'tech', 'advice', 'growth']),
      },
    }),
    db.blogPost.create({
      data: {
        title: 'The Future of Cloud Computing: Trends to Watch in 2025',
        slug: 'future-of-cloud-computing-2025',
        content: `# The Future of Cloud Computing: Trends to Watch

Cloud computing continues to evolve rapidly. Here are the key trends shaping its future.

## 1. Serverless Computing
Serverless architectures are becoming the default for new applications, abstracting away infrastructure management.

## 2. Edge Computing
Processing data closer to users reduces latency and improves performance for real-time applications.

## 3. AI/ML in the Cloud
Cloud providers are integrating AI and ML services, making it easier for developers to add intelligence to applications.

## 4. Multi-Cloud Strategies
Organizations are increasingly using multiple cloud providers to avoid vendor lock-in and optimize costs.

## 5. Cloud Security
As cloud adoption grows, so do security concerns. Zero-trust architectures and advanced encryption are becoming standard.

## Conclusion
The cloud is becoming more powerful, more accessible, and more intelligent. Stay current with these trends to remain competitive.`,
        excerpt: 'Discover the cloud computing trends that will define 2025 and beyond.',
        authorId: instructor1.id,
        status: 'PUBLISHED',
        tags: JSON.stringify(['cloud-computing', 'trends', '2025', 'technology']),
      },
    })
  ])

  console.log('  ✅ Created 6 blog posts')

  // ============ AFFILIATES ============
  console.log('Creating affiliate programs...')

  await Promise.all([
    db.affiliate.create({
      data: {
        code: 'SARAH20',
        userId: instructor1.id,
        commission: 20,
        totalEarnings: 1500,
        totalReferrals: 45,
      },
    }),
    db.affiliate.create({
      data: {
        code: 'MIKE15',
        userId: instructor2.id,
        commission: 15,
        totalEarnings: 800,
        totalReferrals: 28,
      },
    }),
  ])

  console.log('  ✅ Created affiliate programs')

  console.log('\n✅ Seeding completed successfully!')
  console.log('=============================================')
  console.log('Summary:')
  console.log(`  Users: 9 (1 admin, 3 instructors, 5 students)`)
  console.log(`  Categories: 8`)
  console.log(`  Courses: 13`)
  console.log(`  Enrollments: 16`)
  console.log(`  Reviews: 16`)
  console.log(`  Badges: 10`)
  console.log(`  Notifications: 13`)
  console.log(`  Coupons: 4`)
  console.log(`  Subscription Plans: 3`)
  console.log(`  Blog Posts: 6`)
  console.log(`  Payments: 11`)
  console.log('=============================================')
  console.log('\nTest accounts:')
  console.log('  Admin: admin@lms.com / admin123')
  console.log('  Instructor: instructor1@lms.com / instructor123')
  console.log('  Student: student1@lms.com / student123')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
