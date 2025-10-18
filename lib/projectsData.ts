export type Project = {
  slug: string; // URL-friendly identifier
  title: string;
  shortDescription: string; // The one shown on the homepage
  longDescription: string; // More detailed description
  imageUrl: string; // Path to image in /public
  techStack: string[];
  githubUrl?: string; // Optional link to GitHub
  liveUrl?: string; // Optional link to live demo
};

export const projects: Project[] = [
  {
    slug: 'ai-sports-platform',
    title: 'AI-Powered Mobile Platform for Sports Talent Assessment',
    shortDescription: 'Developed a mobile-first platform using AI to evaluate athletic performance from video and biometric data.',
    longDescription: `This project aimed to democratize sports talent assessment by leveraging AI. 
      Built using Python and TensorFlow for the core AI engine, and React Native for the mobile application. 
      The platform analyzes athlete movements and biometric data captured via video, providing objective performance metrics. 
      Key challenges included handling diverse video quality and accurately tracking complex movements across different sports. 
      Achieved an 84% improvement in assessment accuracy compared to traditional methods in pilot tests.`,
    imageUrl: '/img/image.png', // Assuming your first project image is here
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'React Native', 'MySQL', 'Node.js'],
    githubUrl: 'https://github.com/Paritoshdash/Sankalp.git',
  },
  {
    slug: 'swasth-ai',
    title: 'SwasthAI - AI-Powered Maternal & Child Health Platform',
    shortDescription: 'Built an AI-powered web platform to enhance healthcare accessibility, featuring a multilingual chatbot and secure telemedicine.',
    longDescription: `SwasthAI addresses challenges in maternal and child healthcare accessibility in remote areas. 
      The platform provides 24/7 support via a multilingual chatbot (powered by Gemini API) and facilitates secure video consultations using WebRTC. 
      The backend, built with Node.js/Express and MongoDB, manages user data and appointment scheduling. 
      Optimized API response times resulted in a 30% latency reduction during peak usage.`,
    imageUrl: '/img/Screenshot 2025-10-17 102437.png', // Assuming your second project image is here
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Gemini API', 'Flask', 'WebRTC'],
    githubUrl: 'https://github.com/Paritoshdash/SwasthAI.git',
  },
  {
    slug: 'predictive-health-monitoring',
    title: 'Predictive Health Monitoring Platform',
    shortDescription: 'Developed a real-time health monitoring system with AI predictions for improved patient care, featuring secure JWT authentication.',
    longDescription: `This platform provides real-time health monitoring dashboards for different user roles (students, faculty). 
      It incorporates predictive models (though simplified for this version) to flag potential health concerns based on reported data. 
      Secure user authentication is handled via JWT. The frontend uses Framer Motion for smooth UI interactions. 
      Focused on creating an efficient and secure system for managing health-related information within an educational institution.`,
    imageUrl: '/img/image.png', // Using existing image as placeholder
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'JWT'],
    githubUrl: 'https://github.com', // Replace with actual link if available
  },
];

// Helper function to get a project by its slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}