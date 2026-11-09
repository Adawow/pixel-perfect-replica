<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Architecture
- Game metadata lives in `src/data/games.ts`; UI never hardcodes game lists — one source to extend.
- Selected/hovered game state lives in `src/context/journey.tsx` — single source of truth for future skeleton reactions.
- The companion renders through a component taking `{hoveredGame, selectedGame}` (`SkeletonPlaceholder`); a future 3D model must keep that prop contract so the page needn't change.
- The 3D companion is dynamically imported after a WebGL capability check; keep the original illustration visible until a real frame renders, and restore it on load or context failure.
- Companion idle mathematics live in a renderer-independent module and respect reduced motion; per-frame transforms use refs rather than React state.
- All 3D material and lighting colors are read from semantic `--scene-*` CSS tokens; model license/source records live next to the asset pointers.
