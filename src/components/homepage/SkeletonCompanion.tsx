import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SkeletonPlaceholder, type SkeletonViewProps } from "./SkeletonPlaceholder";

const CompanionCanvas = lazy(() => import("./CompanionCanvas"));

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override componentDidCatch() { this.props.onFailure(); }
  override render() { return this.state.failed ? null : this.props.children; }
}

/** Keep the original illustration until an actual frame has rendered. */
export function SkeletonCompanion(props: SkeletonViewProps) {
  const [available, setAvailable] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const readyRef = useRef(false);
  const onReady = useCallback(() => { readyRef.current = true; setReady(true); }, []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    if (context) {
      setAvailable(true);
      context.getExtension("WEBGL_lose_context")?.loseContext();
    }
    const timeout = window.setTimeout(() => { if (!readyRef.current) onFailure(); }, 25000);
    return () => { preference.removeEventListener("change", update); window.clearTimeout(timeout); };
  }, [onFailure]);

  const visible = ready && !failed;
  return (
    <div className="absolute inset-0" data-scene-ready={visible ? "1" : undefined} data-scene-state={failed || !available ? "fallback" : visible ? "3d" : "loading"}>
      <div className={visible ? "invisible" : "visible"}><SkeletonPlaceholder {...props} /></div>
      {available && !failed && (
        <div className={`absolute inset-0 ${visible ? "opacity-100" : "opacity-0"}`} role="img" aria-label="An ivory skeleton rests beside a small campfire, gently swaying with a wooden stick in its hand." aria-hidden={!visible}>
          <SceneBoundary onFailure={onFailure}>
            <Suspense fallback={null}>
              <CompanionCanvas {...props} reducedMotion={reducedMotion} onReady={onReady} onFailure={onFailure} />
            </Suspense>
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}