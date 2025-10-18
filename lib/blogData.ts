export type Post = {
  slug: string; // URL-friendly identifier
  title: string;
  date: string; // e.g., "October 17, 2025"
  excerpt: string; // Short summary for the list page
  content: string; // Full blog post content (can be simple text or Markdown later)
};

export const posts: Post[] = [
  {
    slug: 'getting-started-gsap-nextjs',
    title: 'Getting Started with GSAP ScrollTrigger in Next.js',
    date: 'October 17, 2025',
    excerpt: 'A quick guide on integrating GreenSock\'s powerful scroll animation library into your Next.js project...',
    content: `GSAP (GreenSock Animation Platform) is a powerful JavaScript library for creating high-performance animations. Its ScrollTrigger plugin makes it easy to create scroll-based animations.

Here's a basic setup in a Next.js component using \`useLayoutEffect\`:

\`\`\`jsx
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function MyComponent() {
  const compRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".myElement", {
        x: 500,
        scrollTrigger: {
          trigger: ".myElement",
          start: "top center",
          end: "bottom top",
          scrub: true,
        }
      });
    }, compRef);
    return () => ctx.revert();
  }, []);
  return <div ref={compRef}><div className="myElement">Animate me</div></div>;
}
\`\`\`

Remember to install GSAP (\`npm install gsap\`) and handle cleanup properly!`
  },
  {
    slug: 'react-native-vs-flutter-athletex',
    title: 'Choosing Between React Native and Flutter for AthleteX',
    date: 'October 10, 2025',
    excerpt: 'Exploring the pros and cons of different mobile frameworks for our sports assessment app...',
    content: `When building the AthleteX mobile app, we considered both React Native and Flutter. 

**React Native Pros:** Leverages existing React knowledge, large community, faster iteration with web developers.
**React Native Cons:** Can sometimes require native module bridging, performance might lag behind Flutter in complex UI scenarios.

**Flutter Pros:** Excellent performance, beautiful UI widgets out-of-the-box, single codebase for iOS and Android.
**Flutter Cons:** Requires learning Dart, smaller community compared to React Native.

Ultimately, the choice depends on team expertise, performance requirements, and desired UI consistency.`
  },
  {
    slug: 'tips-web3forms',
    title: 'Tips for Setting Up a Contact Form with Web3Forms',
    date: 'September 28, 2025',
    excerpt: 'Lessons learned while implementing a simple and free contact form solution for a portfolio website...',
    content: `Web3Forms is a great free service for handling static form submissions. Here are some tips:

1.  **Get Your Access Key:** Sign up on their website and activate your key via email.
2.  **Use \`react-hook-form\`:** It simplifies validation and submission state management.
3.  **Include a Honeypot:** Add a hidden field (\`botcheck\`) to deter simple bots.
4.  **Provide Feedback:** Show clear success and error messages to the user.
5.  **Check Your Email:** Remember that submissions arrive directly in your inbox!`
  }
];

// Helper function to get a post by its slug
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}