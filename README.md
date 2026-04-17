# NeoDev Technical User Manual

Project is deployed at: [https://neodev-cict.vercel.app](https://neodev-cict.vercel.app)

## 1. Introduction

NeoDev is a web development learning environment designed to help students construct web pages visually without writing code directly. Instead of manually authoring HTML and CSS, the user builds an interface by manipulating visual elements called blocks inside draggable containers called frames. The system then renders the output in a live preview and can also present the equivalent source code representation.

This manual describes the intended use of the application based on the implemented tutorial and related interface panels. It may be included as part of a thesis appendix or system documentation to explain the operational workflow of the software.

## 2. General Purpose of the Application

The application is intended to support introductory web development learning by providing:

- A visual playground for arranging interface elements
- A live preview of the generated webpage
- A properties editor for modifying content and styling
- An AI-assisted insights panel for contextual tips
- A code preview panel for viewing generated HTML, React, and Svelte output

The overall objective is to help learners understand website composition, layout, reusable structures, and styling concepts through direct manipulation.

## 3. Main Interface Components

When the application starts, the user is presented with a multi-panel workspace. The major interface components are described below.

### 3.1 Playground

The playground is the main canvas located on the left side of the interface. It functions as a free-form infinite workspace where frames can be positioned and rearranged. A frame contains one or more blocks.

Two frames are provided by default:

- `Template Frame`: contains reusable block templates such as paragraph text, headings, links, images, and style blocks
- `Main Frame`: contains the blocks currently used to generate the visible webpage output

Additional frames can also be created by dragging a block into an empty area of the playground.

### 3.2 Frames

A frame is a vertical container that groups related blocks. Frames can be dragged around the playground using the colored vertical handle on the left side of the frame.

Frames support the following actions:

- Selection and focus
- Renaming through the `Edit Frame Label` option
- Importing into another frame through the `Import to frame...` option

The template frame is a source frame only and is used for copying available content and style blocks into user-created frames.

### 3.3 Blocks

A block is the smallest editable unit inside a frame. Blocks represent webpage content or styling. The implemented block categories include:

- Text blocks such as paragraph text and headings
- Link blocks
- Image blocks
- Style blocks such as background color, text color, alignment, spacing, width, and height
- Frame instance blocks used to reference another frame

Text-based blocks display editable content, while style blocks extend the presentation of another block or imported frame.

### 3.4 Preview Panel

The Preview Panel displays the current rendered webpage generated from the focused frame arrangement. This panel allows the user to immediately observe how changes in content, structure, and styling affect the final output.

If a hyperlink is clicked in the preview, the application displays a warning before opening the destination in a new tab. This is a safety measure intended to reduce the risk of visiting unknown external links accidentally.

### 3.5 Info Panel

The Info Panel contains several subpanels that support editing and inspection:

- `Properties`: displays editable attributes of the currently selected block
- `AI Insights`: shows a short AI-generated learning tip related to the detected user interface component
- `Code Preview`: presents the corresponding generated source code
- `Tutorial`: provides built-in instructional guidance for first-time users

### 3.6 Toolbar

The Toolbar is positioned at the bottom center of the interface. It contains controls for:

- Switching between move mode and hand mode
- Resetting the playground transform
- Adjusting zoom level with a slider
- Showing or hiding the Preview Panel
- Showing or hiding the Info Panel

## 4. Basic Operating Procedure

The recommended procedure for using NeoDev is as follows.

### 4.1 Explore the Initial Workspace

Upon opening the application, the user should first inspect the Template Frame, Main Frame, Preview Panel, Info Panel, and Toolbar. This provides an overview of the available controls and editing areas before constructing a webpage.

### 4.2 Add Content to the Main Frame

To create or extend a webpage:

1. Locate a desired block inside the `Template Frame`.
2. Drag the block into the `Main Frame`.
3. Place the block at the desired position within the frame.

For example, the user may drag the `Paragraph Text` block into the Main Frame to insert a new paragraph element into the webpage.

### 4.3 Edit Block Properties

After selecting a block, the user may open the `Properties` subpanel and modify its attributes. The available fields depend on the block type.

Examples include:

- Text content for paragraph and heading blocks
- Hyperlink target for link blocks
- Image source and alternate text for image blocks
- Style values such as font size, font family, width, margin, padding, text alignment, and colors

Changes made in the Properties panel are reflected in the live preview.

### 4.4 Create New Frames

The user may create additional frames by dragging a block into an empty area of the playground away from existing frames. This enables the user to organize page sections into reusable or modular structures.

### 4.5 Rename Frames

To rename a frame:

1. Right-click the vertical handle of the frame.
2. Select `Edit Frame Label`.
3. Enter a unique frame name.
4. Confirm the modification.

Frame labels must remain unique to prevent ambiguity when importing and referencing frames.

### 4.6 Import Frames into Other Frames

NeoDev supports a modular composition feature through frame imports. This allows one frame to be inserted into another as an instance, similar to reusable components in modern web development.

To import a frame:

1. Right-click the source frame handle.
2. Select `Import to frame...`.
3. Choose a target frame from the list.

After importing, the target frame receives a frame instance block that references the original frame.

### 4.7 Apply Style Blocks

Style blocks may be dragged beneath a regular block or frame instance to modify its appearance or layout behavior. These blocks provide visual customization without requiring the user to write CSS manually.

Common style blocks include:

- Background color
- Text color
- Line spacing
- Text alignment
- Width and height
- Margin and padding
- Alignment using flex or grid-related properties

After placing a style block, its values can be adjusted through the Properties panel.

## 5. Reusability and Import Rules

One of the key learning concepts supported by NeoDev is reuse through frame importing. This encourages students to think in terms of modular design rather than duplication.

However, the system prevents circular imports. A circular import occurs when two or more frames reference one another in a recursive loop. Such a condition can cause infinite recursion during rendering and may degrade performance or freeze the application. To prevent this, NeoDev filters invalid import targets and disallows circular frame relationships.

## 6. Information and Assistance Features

### 6.1 Properties Panel

The Properties panel is the primary editing interface for selected blocks. It dynamically displays property groups such as:

- `Text Properties`
- `Image Properties`
- `Style Properties`

Depending on the selected block, the user may interact with text fields, numeric inputs, dropdown choices, and color pickers.

### 6.2 AI Insights Panel

The AI Insights panel analyzes the current preview content and provides a short educational note in a `Did You Know?` format. Its purpose is to supply contextual explanations about interface elements encountered in the user’s design process.

This feature supports conceptual learning by linking a visible UI component with a brief description and practical use case.

### 6.3 Code Preview Panel

The Code Preview panel displays the generated code representation of the user’s webpage. The panel can cycle through three output formats:

- HTML
- React
- Svelte

This feature is especially useful in an educational setting because it helps learners associate visual editing actions with their corresponding code structures.

### 6.4 Tutorial Panel

The Tutorial panel provides step-by-step introductory guidance embedded directly in the application. It includes explanations of the interface, block editing, frame imports, style blocks, and keyboard shortcuts.

## 7. Keyboard Shortcuts

The application implements several keyboard shortcuts to improve usability and navigation efficiency:

- `Ctrl + (+/-)`: zoom in or out
- `Ctrl + 0`: reset both zoom level and playground position
- `Ctrl + P`: show or hide the Preview Panel
- `Ctrl + I`: show or hide the Info Panel
- `Ctrl + Q`: reset the playground
- `V`: switch to default move mode
- `H`: switch to pan and zoom mode

These shortcuts allow faster interaction for users who prefer keyboard-assisted operation.

## 8. Typical User Workflow

A typical usage scenario for NeoDev may be summarized as follows:

1. Open the application and inspect the default interface.
2. Drag content blocks from the Template Frame into the Main Frame.
3. Select each block and edit its content in the Properties panel.
4. Add style blocks to modify layout and appearance.
5. Create additional frames for reusable sections if needed.
6. Import frames into other frames to model modular webpage design.
7. Observe the output in the live Preview Panel.
8. Review the generated implementation in the Code Preview panel.
9. Consult AI Insights and Tutorial tabs for additional guidance.

## 9. Educational Significance

NeoDev is not merely a page builder. It is an instructional development environment that introduces learners to several foundational web development concepts, including:

- Page structure through content blocks
- Presentation through style properties
- Component reuse through frame imports
- Immediate rendering feedback through live preview
- Code awareness through generated source representations

By lowering the initial barrier to entry, the application allows students to focus first on structure, layout, and composition before transitioning into direct coding practices.

## 10. Conclusion

NeoDev provides a visual, beginner-oriented approach to web development learning. Through frames, blocks, live preview, editable properties, AI-generated tips, and code previews, the application helps users understand how webpages are built and organized. Its design makes it suitable for academic use, especially in contexts where the objective is to teach web development concepts progressively through interactive manipulation instead of immediate manual programming.
