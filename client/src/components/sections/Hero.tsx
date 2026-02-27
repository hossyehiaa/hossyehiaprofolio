import { motion } from "framer-motion";
import { useProfile } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { data: profile, isLoading } = useProfile();

  const handleScrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel w-fit border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-sm font-medium text-primary">Available for new projects</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-[1.1]">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI-Powered</span> <br/>
              Visual Stories.
            </h1>
            <div className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
              {isLoading ? (
                <Skeleton className="h-20 w-full bg-white/5" />
              ) : profile?.title ? (
                <p>{profile.title}</p>
              ) : (
                <p>Transforming concepts into cinematic reality using cutting-edge generative AI and advanced video production techniques.</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={handleScrollToWork}
              className="rounded-full px-8 h-14 text-base bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all group"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-8 h-14 text-base border-white/10 hover:bg-white/5 hover:text-foreground transition-all group"
            >
              <PlayCircle className="mr-2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              Showreel
            </Button>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative lg:ml-auto w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent z-10" />
          
          {isLoading ? (
            <Skeleton className="w-full h-full bg-white/5" />
          ) : (
            <>
              {/* landing page hero AI avatar profile */}
              <img 
                src={profile?.pictureUrl || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"} 
                alt={profile?.name || "AI Creator"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20 glass-panel p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-foreground">
                  {profile?.name || "Alex Vision"}
                </h3>
                <p className="text-sm text-primary mt-1">Lead AI Video Director</p>
              </div>
            </>
          )}
        </motion.div>

      </div>
    </section>
  );
}
