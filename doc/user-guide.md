# User Guide

## Workspace Overview

The NeoDev playground is the main working environment. It is composed of four major areas:

- the playground canvas, where frames live
- the preview panel, which renders the selected frame
- the info panel, which shows docs, properties, and code preview
- the toolbar, which controls movement, zoom, and panel visibility

## Key Concepts

### Frames

Frames are vertical containers that hold blocks. They can be moved around the canvas by dragging their colored handle.

Two important frames appear by default:

- `Template Frame`: source of reusable starter blocks
- `Main Frame`: the default frame used to build the visible page

### Blocks

Blocks are the smallest editable units in the app. Examples include:

- paragraph text
- headings
- links
- images
- style blocks
- frame instances

### Style Blocks

Style blocks apply visual rules to the block directly above them. Common styles include:

- background color
- text color
- line spacing
- text alignment
- width and height
- margin and padding
- alignment with flex or grid settings

### Frame Instances

A frame instance inserts one frame inside another. This is NeoDev's reusable composition mechanism and is meant to introduce learners to modular UI structure.

## Common Tasks

### Add Content

1. Open the `Template Frame`.
2. Drag a content block into the destination frame.
3. Drop it where you want it to appear.

### Edit Content or Styling

1. Click a block.
2. Open the `Properties` tab in the info panel.
3. Update available text, image, or style fields.

Changes are reflected in the live preview.

### Create a New Frame

1. Drag a block away from existing frames.
2. Drop it onto an empty area of the canvas.

NeoDev creates a new frame from that dropped block.

### Rename a Frame

1. Right-click the colored frame handle.
2. Choose `Edit Frame Label`.
3. Enter a unique label.
4. Confirm the change.

### Import One Frame Into Another

1. Right-click the source frame handle.
2. Choose `Import to frame...`.
3. Select the destination frame.

NeoDev adds a frame instance block to the destination frame.

## Preview and Code Output

### Preview Panel

The preview panel renders the currently focused frame. Clicking a link inside the preview triggers a warning before the URL is opened in a new tab.

### Code Preview Panel

The code preview can cycle between:

- HTML
- React
- Svelte

This helps learners compare the visual structure they built with equivalent code-oriented output.

## Keyboard Shortcuts

- `Ctrl + +` or `Ctrl + -`: zoom in or out
- `Ctrl + 0`: reset zoom and position
- `Ctrl + P`: toggle the preview panel
- `Ctrl + I`: toggle the info panel
- `Ctrl + Q`: reset the playground
- `V`: switch to move mode
- `H`: switch to hand mode

## Important Rules

- Frame labels should remain unique
- Circular frame imports are blocked
- The template frame is copy-oriented and acts as the source of starter blocks
- An empty frame is removed automatically from the stored frame list
