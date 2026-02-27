import { motion } from "framer-motion";
import { useProfile } from "@/hooks/use-portfolio";
import { Code, Cpu, Film, Sparkles } from "lucide-react";

const skills = [
  { icon: Film, title: "Video Direction", desc: "Cinematic composition and storytelling" },
  { icon: Cpu, title: "AI Generation", desc: "Midjourney, Runway, Stable Video" },
  { icon: Sparkles, title: "VFX & Motion", desc: "After Effects & Nuke integration" },
  { icon: Code, title: "Prompt Engineering", desc: "Advanced parameter tuning for consistency" },
];

export function About() {
  const { data: profile } = useProfile();

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">ABOUT ME</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">
              Merging human creativity with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">machine intelligence.</span>
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {profile?.summary || "I am a digital artist specializing in AI-driven video production. By combining traditional filmmaking principles with the latest generative models, I create visually stunning narratives that were previously impossible to produce. My workflow bridges the gap between imagination and the screen instantly."}
            </p>
            
            <div className="pt-6 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-3xl font-bold font-display text-foreground">50+</h4>
                <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-display text-foreground">4</h4>
                <p className="text-sm text-muted-foreground mt-1">Years in Gen-AI</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="glass-panel p-6 rounded-2xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold mb-2">{skill.title}</h4>
                <p className="text-sm text-muted-foreground">{skill.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
