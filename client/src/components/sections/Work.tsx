import { motion } from "framer-motion";

export function Work() {
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            src="https://vimeo.com/showcase/12101927/embed"
            className="w-full aspect-video rounded-xl shadow-2xl border border-gray-800/50"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title="Hassan Yehia Visuals — Vimeo Showcase"
            loading="lazy"
          />
        </motion.div>

      </div>
    </section>
  );
}
