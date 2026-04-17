# Architecture

## High-Level Structure

The application is a React Router project with the main behavior split across routes, playground state management, block/frame rendering, and utility panels.

## Top-Level Routes

- `app/routes/home.tsx`: landing page
- `app/routes/playground.tsx`: main authoring UI
- `app/routes/preview.tsx`: rendered output used inside the preview iframe
- `app/routes/docs/*`: built-in application docs pages

Route definitions are centralized in `app/routes.ts`.

## Main Runtime Flow

### 1. Playground Bootstrap

`app/routes/playground.tsx` wraps the workspace in:

- modal context
- context menu context
- `PlaygroundContext`
- zoom/transform rendering through `TransformComponent`

The actual frames are rendered from state provided by `PlaygroundContext`.

### 2. Shared Application State

`app/lib/playground/PlaygroundContext.tsx` is the central coordinator for:

- frame state
- selected block state
- focused frame state
- active tool state
- drag state
- preview/info panel visibility
- zoom scale and canvas offset
- tutorial completion state

It also persists several values to `localStorage`, including frame data and preview metadata.

### 3. Frames and Blocks

`Frame.tsx` renders draggable frame containers and provides the context menu for:

- renaming a frame
- importing a frame into another frame

`Block.tsx` renders block cards in the editor and defines block factory helpers such as:

- `createBlock`
- `createTemplateBlock`
- `createStyleBlock`
- `createFrameInstanceBlock`

## Data Model

The core types live in `app/lib/playground/context/types.ts`.

### FrameData

Each frame contains:

- `id`
- `label`
- `blocks`
- `position`

### BlockData

Each block contains:

- `id`
- `label`
- `represents`
- `properties`
- `type`

Supported block types:

- `tag`
- `template`
- `frame-instance`
- `style`

### Block Properties

Properties are grouped into:

- `text`
- `image`
- `style`
- `referencedFrame`

## Rendering Pipeline

### Editor View

The editor displays blocks as sortable cards inside frames. Drag-and-drop between frames is handled with `@dnd-kit`, while frame movement is handled with `interactjs`.

### Preview View

The preview route reads serialized frame data from `localStorage`, condenses trailing style blocks onto the preceding content block, and recursively renders frame instances.

Important preview behavior:

- the currently focused frame is stored under `preview-frame-data`
- rendered HTML is written back to `localStorage` as `preview-html`
- font choices are loaded dynamically in the preview route

### Code Generation

`CodePreview.tsx` uses the preview HTML as input:

- HTML output is formatted locally with `js-beautify`
- React and Svelte output are requested from an external transpiler service

## Default Content

`app/lib/playground/template.ts` defines the default startup frames:

- the `Template Frame` with starter content and style blocks
- the initial main frame with sample heading and paragraph content

## Built-In Learning Support

NeoDev includes:

- a tutorial panel rendered by `Tutorial.tsx`
- guided onboarding through `react-joyride`
- an AI insights panel that reacts to the preview HTML

## Persistence Model

The app currently uses browser `localStorage` instead of a backend database. Key stored items include:

- frame data
- preview frame data
- preview frame name
- preview HTML
- zoom level
- canvas offset
- selected output framework
- tutorial completion flag
