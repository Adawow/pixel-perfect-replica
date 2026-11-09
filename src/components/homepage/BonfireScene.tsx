import { motion } from "framer-motion";
import { useJourney } from "@/context/journey";
import { SkeletonCompanion } from "./SkeletonCompanion";
import { FireEffects } from "./FireEffects";

export function BonfireScene() {
  const { hoveredGame, selectedGame } = useJourney();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, delay: 0.2 }}
      className="relative mx-auto -mt-6 w-full max-w-4xl"
    >
      <div className="relative aspect-[3/2]">
        <SkeletonCompanion hoveredGame={hoveredGame} selectedGame={selectedGame} />
        <FireEffects />
        <div aria-hidden className="scene-vignette pointer-events-none absolute inset-0" />
      </div>
    </motion.div>
  );
}
