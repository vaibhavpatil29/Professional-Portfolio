Live : https://vaibhavpatil29.github.io/Professional-Portfolio/

# Professional Portfolio - Vaibhav Patil

A high-performance, single-page professional portfolio website developed for **Vaibhav Patil (Backend Developer & Python Engineer)**. Built using modern semantic HTML5, custom vanilla CSS variables, and native JavaScript.

## Features

- **Tech Aesthetic UI**: Dark mode by default with glowing gradients, clean layout cards, and glassmorphic navigation overlays.
- **Theme Switcher**: Dynamically toggles between Dark and Light modes, persisting your preference via `localStorage`.
- **Typing Animation Carousel**: Highlights key skill areas in the hero subtitle using custom typewriter logic.
- **Case Study Modals**: Renders interactive, multi-section details for featured projects (*UrbanCool* and *ChatApp*) including text highlights and ASCII architecture flowcharts.
- **Scroll Reveals & Navigation Highlighting**: Uses `IntersectionObserver` to trigger fade-up elements on scroll and highlight the currently active section link in the header nav.
- **Contact Form Validation**: Validates client-side inputs (e.g. email regex and fields presence), manages spinner button load states, logs messages locally, and triggers toast notifications.
- **2-Page Printable Resume**: Features print-media overrides (`@media print`). Clicking the **"Resume"** button at the header automatically reformats the portfolio layout into a clean, print-ready black-and-white resume suitable for physical printing or exporting to PDF.

## File Structure

```text
├── index.html       # Layout structure, meta descriptions, and semantic sections
├── style.css        # Core styling, responsive query breakpoints, and print adjustments
├── script.js        # Theme transitions, scroll observers, modals, and form validation
└── README.md        # Project guide and overview
```

## How to Run

Since the application is built entirely using standard web APIs and assets without dependencies, you can open it directly in any browser:

1. **Option A (Direct Open)**: Double-click `index.html` to load the site in your default browser.
2. **Option B (Local Server)**: Run a local static server inside the directory (e.g., using Python: `python -m http.server 8000` or Node.js: `npx serve`) and navigate to `http://localhost:8000`.

## Customization

To modify the details on the website:
- **Bio & Experiences**: Edit the markup content directly inside `index.html` or adjust the project specifications inside the `projectData` object in `script.js`.
- **Visual Palette**: Tweak root variables at the top of `style.css` to change accent colors, backgrounds, or glow gradients.
