import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/use-portfolio";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const defaultTestimonials = [
  {
    id: 1,
    author: "Sarah Jenkins",
    role: "Creative Director, Nexus Media",
    content: "The way Hassan blends AI tools to create final compositions is mind-blowing. Delivered our campaign 3x faster than traditional pipelines."
  },
  {
    id: 2,
    author: "David Chen",
    role: "Founder, FutureTech",
    content: "Hassan is a true visionary. The aesthetic choices and prompt precision resulted in a visual identity we couldn't have imagined ourselves."
  }
];

export function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials();
  const displayData = testimonials?.length ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">TESTIMONIALS</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Feedback</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl bg-white/5" />
            ))
          ) : (
            displayData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-colors duration-300"
              >
                <Quote className="absolute top-6 right-6 w-24 h-24 text-white/5 -rotate-12 group-hover:text-primary/10 transition-colors duration-500" />

                <div className="relative z-10">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 italic">
                    "{item.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground">{item.author}</h5>
                      <p className="text-sm text-primary">{item.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
