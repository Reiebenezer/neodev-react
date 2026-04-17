# Development Notes

## Current Operational Dependencies

Two panels rely on external services:

- `AiInsights.tsx` posts preview HTML to `http://127.0.0.1:5000/predict`
- `CodePreview.tsx` posts HTML to `https://neodev-transpiler.onrender.com/transpile`

This means local development of the full experience may require:

- a locally running prediction API on port `5000`
- network access to the transpiler service

## Persistence Behavior

The playground is stateful across reloads because frame and preview data are stored in `localStorage`.

Relevant keys include:

- `frame-data`
- `preview-frame-data`
- `preview-frame-name`
- `preview-html`
- `zoom`
- `canvas-offset`
- `output-framework`

Resetting the playground clears the important stored workspace keys and reloads the page.

## Import Safety

Frame import options are filtered to prevent circular references. This protection is implemented in the frame context-menu flow before a frame instance block is added.

## Template Frame Behavior

Template blocks behave differently from regular blocks:

- they are intended as source items
- dragging them produces usable blocks in other frames
- the template frame is protected from destructive behavior used by normal frames

## Preview Behavior

The preview route reconstructs UI from serialized block data. Style blocks are not rendered as standalone elements there; instead, they are merged into the previous content or frame instance block before rendering.

## Known Gaps and Risks

- There is no automated test suite configured in `package.json` yet
- AI and code-export features can fail when their backing services are unavailable
- Some user-facing docs still exist inside the app separately under `app/routes/docs/*`, so future updates should keep the two documentation sources aligned
- `AiInsights.tsx` currently contains a hardcoded API key in source, which should be replaced with environment-based configuration before wider deployment

## Suggested Next Documentation Tasks

- add screenshots for the main workflow
- document deployment assumptions and environment variables
- document the expected request and response formats for the prediction and transpiler services
- consolidate duplicated documentation between `README.md`, `doc/`, and `app/routes/docs/`
