import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-2xl font-bold font-display tracking-tight text-muted-foreground">
          AI<span className="text-primary">.Creator</span>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} AI Video Creator. All rights reserved.
        </p>

        <button 
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

      </div>
    </footer>
  );
}
