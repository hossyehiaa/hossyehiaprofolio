import { motion } from "framer-motion";
import { useProjects } from "@/hooks/use-portfolio";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback data if DB is empty
const defaultProjects = [
  {
    id: 1,
    title: "Neon Dreams",
    description: "Cyberpunk short film generated entirely with AI models.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80"
  },
  {
    id: 2,
    title: "Synthetic Nature",
    description: "Exploring impossible biological structures.",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
  },
  {
    id: 3,
    title: "Echoes of Time",
    description: "Historical reconstruction using guided diffusion.",
    thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80"
  }
];

export function Work() {
  const { data: projects, isLoading } = useProjects();

  const displayProjects = projects?.length ? projects : defaultProjects;

  return (
    <section id="work" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">SELECTED WORKS</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projects</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-2xl bg-white/5" />
            ))
          ) : (
            displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-card border border-white/5"
              >
                {/* project thumbnail */}
                <img 
                  src={project.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50 text-primary">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-2xl font-bold font-display text-white mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
