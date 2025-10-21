import { posts, getPostBySlug } from '@/lib/blogData';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This function tells Next.js which slugs (blog URLs) to pre-render at build time
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Define props type including params
type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // If post data isn't found for the slug, show a 404 page
  if (!post) {
    notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-screen pt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link 
          href="/vlog" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
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
          Back to Vlog
        </Link>

        {/* Blog Post Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        {/* Post Date */}
        <p className="text-muted-foreground mb-8">{post.date}</p>

        {/* Post Content */}
        <div className="bg-card text-card-foreground p-6 md:p-8 rounded-lg border border-border prose prose-invert max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => {
            // Check if it's a code block
            if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
              const codeContent = paragraph.slice(3, -3);
              const lines = codeContent.split('\n');
              const language = lines[0] || 'text';
              const code = lines.slice(1).join('\n');
              
              return (
                <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className={`language-${language}`}>{code}</code>
                </pre>
              );
            }
            
            // Regular paragraph
            return (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </main>
  );
}