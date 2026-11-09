/** Quiet, deterministic motions; no renderer or browser dependencies. */
export function companionIdle(time: number, reducedMotion: boolean) {
  if (reducedMotion) return { body: 0, head: 0, hand: 0, fire: 1 };
  return {
    body: Math.sin(time * 1.15) * 0.018,
    head: Math.sin(time * 0.46) * 0.07,
    hand: Math.sin(time * 0.72) * 0.025,
    fire: 1 + Math.sin(time * 7.3) * 0.08 + Math.sin(time * 11.7) * 0.04,
  };
}