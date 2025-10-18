"use client";

import { useState, useEffect } from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/registry/magicui/terminal";
import { useRouter } from "next/navigation";

export function PortfolioTerminalDemo() {
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        router.push("/main");
      }, 2000); // Redirect after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isComplete, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Terminal>
          {/* Simulate the create-next-app command */}
          <TypingAnimation>
            &gt; npx create-next-app@latest paritosh-portfolio --typescript --tailwind --eslint
          </TypingAnimation>

          <AnimatedSpan className="text-green-500" delay={1000}>
            ✔ Creating project directory...
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500" delay={1500}>
            ✔ Installing Next.js, React, TypeScript...
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500" delay={2000}>
            ✔ Installing Tailwind CSS...
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500" delay={2500}>
            ✔ Installing ESLint...
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500" delay={3000}>
            ✔ Configuring project files...
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500" delay={3500}>
            ✔ Initializing Git repository...
          </AnimatedSpan>

          {/* Keep success messages */}
          <TypingAnimation className="text-muted-foreground" delay={4000}>
            Success! Project setup completed.
          </TypingAnimation>

          <TypingAnimation className="text-muted-foreground" delay={4500}>
            You can now navigate to your project: cd paritosh-portfolio
          </TypingAnimation>
        </Terminal>

        {isComplete && (
          <div className="mt-6 text-center text-green-500">
            Redirecting to portfolio...
          </div>
        )}
      </div>
    </div>
  );
}