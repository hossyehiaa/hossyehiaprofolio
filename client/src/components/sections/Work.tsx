import { motion } from "framer-motion";
import { useProjects } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";

// All 10 videos from the Vimeo showcase
const defaultProjects = [
  {
    id: 1,
    title: "Event Editing",
    description: "Professional event editing showcase.",
    videoUrl: "https://player.vimeo.com/video/1163552396?h=0f54a2566f",
  },
  {
    id: 2,
    title: "BOHUB Cafe AI - AD",
    description: "AI-powered cafe advertisement.",
    videoUrl: "https://player.vimeo.com/video/1163554262?h=9eaaf267a6",
  },
  {
    id: 3,
    title: "Let\u2019s Go AI - AD",
    description: "AI advertisement project.",
    videoUrl: "https://player.vimeo.com/video/1163554803?h=90f1eaa2e6",
  },
  {
    id: 4,
    title: "3D Animation AD",
    description: "3D animation advertisement.",
    videoUrl: "https://player.vimeo.com/video/1163735699?h=1e834c2f69",
  },
  {
    id: 5,
    title: "Video Editing",
    description: "Professional video editing reel.",
    videoUrl: "https://player.vimeo.com/video/1163557036?h=5a143c1b2a",
  },
  {
    id: 6,
    title: "Comma Agency - AD",
    description: "Agency advertisement project.",
    videoUrl: "https://player.vimeo.com/video/1163558059?h=4081288853",
  },
  {
    id: 7,
    title: "Notion Project",
    description: "Notion product showcase.",
    videoUrl: "https://player.vimeo.com/video/1163563239?h=9c8d1b3eaf",
  },
  {
    id: 8,
    title: "ClickUp - Personal AD",
    description: "ClickUp personal advertisement.",
    videoUrl: "https://player.vimeo.com/video/1163564687?h=6ee0d592ae",
  },
  {
    id: 9,
    title: "Ya Habibi Motion",
    description: "Motion graphics project.",
    videoUrl: "https://player.vimeo.com/video/1163565403?h=c00b04a8d9",
  },
  {
    id: 10,
    title: "Careless Whisper Motion",
    description: "Motion graphics project.",
    videoUrl: "https://player.vimeo.com/video/1163565919?h=72d860f4c4",
  },
];

function getVimeoEmbedUrl(videoUrl: string | null | undefined): string | null {
  if (!videoUrl) return null;
  // If it's already a player.vimeo.com embed URL, use it directly
  if (videoUrl.startsWith("https://player.vimeo.com/")) {
    return videoUrl;
  }
  // Try to extract a video ID from a regular vimeo.com URL
  const match = videoUrl.match(/vimeo\.com\/(\d+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return null;
}

export function Work() {
  const { data: projects, isLoading } = useProjects();

  // Use DB projects if available, otherwise fallback to default showcase videos
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
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-2xl bg-white/5" />
            ))
          ) : (
            displayProjects.map((project, index) => {
              const embedUrl = getVimeoEmbedUrl(
                "videoUrl" in project ? (project as any).videoUrl : null
              );

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-primary/30 transition-colors duration-300"
                >
                  {/* Vimeo Video Embed */}
                  <div className="relative aspect-video w-full">
                    {embedUrl ? (
                      <iframe
                        src={`${embedUrl}&badge=0&autopause=0&player_id=0&app_id=58479&transparent=1`}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        allowFullScreen
                        title={project.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                        <span className="text-muted-foreground text-sm">Video unavailable</span>
                      </div>
                    )}
                  </div>

                  {/* Title bar */}
                  <div className="px-5 py-4 bg-card/80 backdrop-blur-sm border-t border-white/5">
                    <h4 className="text-base font-bold font-display text-foreground truncate">
                      {project.title}
                    </h4>
                    {"description" in project && project.description && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {project.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
