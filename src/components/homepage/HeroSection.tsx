import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pt-10 text-center md:px-10 md:pt-16">
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="font-display text-5xl font-light leading-[0.95] tracking-[0.04em] text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
      >
        Every journey
        <br />
        <span className="italic text-muted-foreground">needs a light.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5 }}
        className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
      >
        Rest for a moment. Gather your thoughts. Then face what waits beyond the flame.
      </motion.p>
    </section>
  );
}
