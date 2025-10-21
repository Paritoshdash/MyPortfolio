import { projects, getProjectBySlug } from '@/lib/projectsData'; // Adjust path if needed
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This function tells Next.js which slugs (project URLs) to pre-render at build time
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Define props type including params
type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // If project data isn't found for the slug, show a 404 page
  if (!project) {
    notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-screen pt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link href="/main#projects" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Portfolio
        </Link>

        {/* Project Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
        
        {/* Live Project Button - Added */}
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mb-8 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              View Live Project
            </div>
          </a>
        )}
        
        {/* Project Image */}
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8 border border-border">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            priority // Load image faster as it's the main content
          />
        </div>

        {/* Project Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Main Description (Left Column) */}
          <div className="md:col-span-2 bg-card text-card-foreground p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-3">About the Project</h2>
            {/* Split description into paragraphs for better readability */}
            {project.longDescription.split('\n').map((paragraph, index) => (
              <p key={index} className="text-card-foreground/80 mb-4 last:mb-0">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Sidebar (Right Column) */}
          <div className="space-y-6">
             {/* Tech Stack */}
            <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="skill-badge"> {/* Reusing skill badge style */}
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-3">Links</h3>
              <div className="space-y-2">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    {/* Simple GitHub Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.54 2.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    View Code on GitHub
                  </a>
                )}  {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    {/* Simple GitHub Icon */}
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
  <circle cx="12" cy="12" r="3" />
</svg>

                    View Demo Or Preview
                  </a>
                )}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}