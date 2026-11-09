import scene from "@/assets/bonfire-skeleton.jpg";
import type { GameId } from "@/types/game";

export interface SkeletonViewProps {
  /** Reserved for the future weapon swap; unused by this still illustration. */
  hoveredGame: GameId | null;
  /** Reserved for the future stand-and-swing sequence. */
  selectedGame: GameId | null;
}

/**
 * Original still illustration, retained as the loading and graphics-failure
 * fallback for the 3D companion. Both views keep the same journey prop contract.
 */
export function SkeletonPlaceholder(_props: SkeletonViewProps) {
  return (
    <img
      src={scene}
      width={1536}
      height={1024}
      alt="A small ivory skeleton sits on a log beside a quiet campfire, holding a wooden stick."
      className="block h-auto w-full select-none"
      draggable={false}
    />
  );
}
