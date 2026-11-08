import scene from "@/assets/bonfire-skeleton.jpg";
import type { GameId } from "@/types/game";

export interface SkeletonViewProps {
  /** Reserved for the future weapon swap; unused by this still illustration. */
  hoveredGame: GameId | null;
  /** Reserved for the future stand-and-swing sequence. */
  selectedGame: GameId | null;
}

/**
 * Temporary still illustration of the companion. A future 3D model component
 * should accept the same props and replace this one inside BonfireScene.
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
