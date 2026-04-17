# Disclaimer

NeoDev is an educational, visual web development tool intended primarily for learning, demonstrations, and introductory experimentation. It is not presented as a production-grade website builder, secure code generator, or full replacement for manual frontend development workflows.

## Educational Use

- NeoDev is designed to help beginners understand page structure, reusable sections, styling, and the relationship between visual editing and generated code.
- Generated outputs such as HTML, React, and Svelte previews should be treated as learning aids and starting points, not as guaranteed production-ready code.
- Users are responsible for reviewing, testing, and validating any generated output before using it in real projects.

## Feature and Service Limitations

- Some features depend on external or separately running services.
- `AI Insights` currently relies on a prediction endpoint running at `http://127.0.0.1:5000/predict`.
- `Code Preview` requests React and Svelte transpilation from `https://neodev-transpiler.onrender.com/transpile`.
- If those services are unavailable, related features may fail, return incomplete results, or stop working entirely.

## Data and Privacy

- NeoDev stores workspace and preview state in the browser through `localStorage`.
- This may include frame data, preview HTML, zoom state, selected output format, and tutorial progress.
- The project does not currently present itself as a privacy-hardened or compliance-certified platform.

## Safety and External Content

- Previewed links may point to external websites.
- Although the app shows a warning before opening links from the preview, users should still exercise caution and only open destinations they trust.
- Any AI-generated tips, rendered previews, or exported code may contain mistakes, omissions, or misleading suggestions.

## Deployment and Security Notice

- The current codebase includes development-oriented assumptions and documented gaps that should be addressed before wider deployment.
- In particular, secrets, API configuration, third-party service usage, and operational safeguards should be reviewed and moved to environment-based configuration where appropriate.
- No warranty is made that the current repository state is secure, complete, error-free, or suitable for public production deployment without additional hardening.

## No Warranty

This project is provided for academic, instructional, and development purposes on an "as is" basis, without guarantees of accuracy, reliability, fitness for a particular purpose, or uninterrupted availability.
