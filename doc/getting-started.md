# Getting Started

## Prerequisites

- Node.js or Bun installed locally
- A package manager such as `npm`, `pnpm`, or `bun`

The repository includes a `bun.lock`, but the scripts in `package.json` are standard enough to run with other package managers as well.

## Install Dependencies

Choose one:

```bash
npm install
```

```bash
pnpm install
```

```bash
bun install
```

## Run the App

Use one of the following:

```bash
npm run dev
```

```bash
pnpm dev
```

```bash
bun run dev
```

By default, this starts the React Router development server for the NeoDev application.

## Build for Production

```bash
npm run build
```

## Start the Production Server

```bash
npm run start
```

## Type Checking

```bash
npm run typecheck
```

## Available Scripts

- `dev`: start the development server
- `build`: build the application
- `start`: serve the production build
- `typecheck`: generate router types and run TypeScript checks

## First Run Expectations

When the app opens:

- the home page links to the playground and the in-app docs
- the playground loads a `Template Frame` and a main working frame
- the preview and info panel are visible by default
- tutorial progress, frame data, zoom, and preview state are stored in `localStorage`

## External and Local Service Dependencies

Some features depend on services outside the main frontend app:

- `AI Insights` currently sends preview HTML to `http://127.0.0.1:5000/predict`
- `Code Preview` requests React and Svelte conversions from `https://neodev-transpiler.onrender.com/transpile`

If those services are unavailable, the core playground still works, but those specific panels may not behave as expected.
