# Project Overview

## What NeoDev Is

NeoDev is a visual web development learning environment. Instead of writing HTML and CSS directly, users build pages by dragging blocks into frames, editing properties, and viewing the result in a live preview.

The project is positioned as an educational tool for beginner web developers who need a more visual introduction to page structure, reusable sections, and styling concepts.

## Core Learning Model

NeoDev teaches web development through direct manipulation:

- `Frames` act as containers for groups of blocks
- `Blocks` represent content such as headings, paragraphs, links, and images
- `Style blocks` apply presentation rules to the block above them
- `Frame instances` allow one frame to be reused inside another
- `Preview` shows the rendered result
- `Code Preview` shows generated HTML, React, and Svelte output

This lets learners connect visual edits to code-oriented mental models without starting from raw source files.

## Main Features

- Infinite playground with draggable frames
- Copyable template frame containing starter content and style blocks
- Properties panel for editing text, image, and style values
- Live preview rendered from the currently focused frame
- Generated code preview for HTML, React, and Svelte
- Built-in tutorial and docs route inside the app
- Keyboard shortcuts for zoom, panel toggles, and tool switching
- Local persistence using `localStorage`

## Primary Routes

- `/` home page
- `/playground` main authoring environment
- `/docs` in-app help pages
- `/preview` rendered preview surface used by the playground iframe

## Technology Stack

- React 19
- React Router 7
- TypeScript
- Vite
- PrimeReact
- `@dnd-kit` for drag-and-drop
- `react-zoom-pan-pinch` for canvas movement and zoom
- `interactjs` for frame dragging
- `highlight.js` for code highlighting

## Intended Use

NeoDev is best suited for:

- classroom demos
- introductory web development exercises
- visual explanation of layout and reusable UI composition
- showing how visual structure maps to generated frontend code
