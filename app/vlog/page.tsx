"use client";

import Link from "next/link";
import { posts } from "@/lib/blogData";
import { projects } from "@/lib/projectsData";

export default function VlogPage() {
  // Create a mapping of skills to related blog posts
  const skillToBlogMapping = {
    "GSAP": ["getting-started-gsap-nextjs"],
    "React Native": ["react-native-vs-flutter-athletex"],
    "Flutter": ["react-native-vs-flutter-athletex"],
    "Web3Forms": ["tips-web3forms"],
    "AI/ML": [],
    "Python": ["react-native-vs-flutter-athletex"],
    "JavaScript": ["getting-started-gsap-nextjs"],
    "React.js": ["getting-started-gsap-nextjs", "tips-web3forms"],
    "Node.js": ["tips-web3forms"],
    "TensorFlow": [],
    "OpenCV": [],
    "MongoDB": ["tips-web3forms"],
    "SQL": [],
    "Java": [],
    "Spring Boot": [],
    "Docker": [],
    "Git": [],
  };

  // Create a mapping of projects to related blog posts
  const projectToBlogMapping = {
    "ai-sports-platform": ["react-native-vs-flutter-athletex"],
    "swasth-ai": ["tips-web3forms"],
    "predictive-health-monitoring": ["getting-started-gsap-nextjs"],
  };

  // Get all unique blog slugs that are related to skills or projects
  const relatedBlogSlugs = new Set([
    ...Object.values(skillToBlogMapping).flat(),
    ...Object.values(projectToBlogMapping).flat()
  ]);

  // Filter posts to only show related ones
  const relatedPosts = posts.filter(post => relatedBlogSlugs.has(post.slug));

  // External articles related to skills and experiences
  const externalArticles = [
    {
      title: "Building AI-Powered Applications with Python",
      date: "September 15, 2025",
      excerpt: "Exploring the intersection of AI and web development using Python frameworks.",
      url: "https://towardsdatascience.com/building-ai-powered-applications-with-python-1234567890ab",
      category: "AI/ML"
    },
    {
      title: "Optimizing React Applications for Performance",
      date: "August 22, 2025",
      excerpt: "Techniques and best practices for creating high-performance React applications.",
      url: "https://dev.to/paritoshdash/optimizing-react-applications-for-performance-1234",
      category: "React.js"
    },
    {
      title: "The Future of Mobile Development: React Native vs Flutter",
      date: "July 10, 2025",
      excerpt: "A comprehensive comparison of the two leading cross-platform mobile frameworks.",
      url: "https://medium.com/@paritoshdash/the-future-of-mobile-development-react-native-vs-flutter-1234567890ab",
      category: "React Native"
    },
    {
      title: "Implementing Secure Authentication in Web Applications",
      date: "June 5, 2025",
      excerpt: "Best practices for implementing JWT-based authentication in modern web apps.",
      url: "https://hackernoon.com/implementing-secure-authentication-in-web-applications-1234567890ab",
      category: "Node.js"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/main#articles" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            Vlog & Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sharing insights, tutorials, and thoughts on technology, development, and my experiences in the tech industry.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {Object.keys(skillToBlogMapping).map((skill) => (
              <div 
                key={skill} 
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Blog Posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Blog Posts</h2>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-card-foreground/80 text-sm mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="text-primary font-semibold text-sm group-hover:underline">
                      Read More &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No related blog posts found.</p>
            </div>
          )}
        </div>

        {/* External Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">External Articles & Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {externalArticles.map((article, index) => (
              <a 
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-sm text-muted-foreground">{article.date}</p>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-card-foreground/80 text-sm mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:underline">
                    Read on external site
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Project Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const relatedBlogs = projectToBlogMapping[project.slug as keyof typeof projectToBlogMapping] || [];
              const projectPosts = posts.filter(post => relatedBlogs.includes(post.slug));
              
              return (
                <div 
                  key={project.slug} 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-card-foreground/80 text-sm mb-4">
                      {project.shortDescription}
                    </p>
                    
                    {projectPosts.length > 0 ? (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Related Articles:</h4>
                        <ul className="space-y-2">
                          {projectPosts.map(post => (
                            <li key={post.slug}>
                              <Link 
                                href={`/blog/${post.slug}`}
                                className="text-primary text-sm hover:underline flex items-start"
                              >
                                <svg 
                                  className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                  />
                                </svg>
                                {post.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm mt-4">
                        No related articles available.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}