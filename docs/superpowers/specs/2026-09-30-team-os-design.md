# TEAM_OS design

An entirely Ukrainian, live team presentation for Neoversity AI & Machine Learning students. Use fictional sample profiles with no invented metrics or responsibilities. All presentation content lives in src/data/team.ts.

Visual design: near-black background, bold sans-serif headings, cyan primary accent, purple ambient light, subtle grid, abstract avatar placeholders, generous spacing. A persistent restrained header and bottom navigation frame the changing full-screen content.

Flow: intro with an immediately available entry button and a boot sequence under two seconds; member selector; each member's opening slide followed by seven answer slides; team summary; final with restart. The slide sequence is generated from the member array. Clicking a card starts that member's sequence; Escape returns to overview.

Navigation: Right/Space advance, Left goes back, Home returns to intro, End opens final. Space on interactive elements preserves native behavior. Mouse buttons, section selectors, overview shortcut, and optional browser fullscreen are available. Focus follows the main heading on slide change. Reduced motion is respected.

Responsive: fit a projector at 1920x1080 and laptops at 1280x720 without scrolling; responsive card grid and profile layout for tablets and phones. Use compact copy, responsive type sizing, and device-dependent layout.

Architecture: React + TypeScript + Vite, Framer Motion, plain CSS, Lucide icons. No router, backend, auth, API, or runtime asset requests. Each member has an optional local photo, accessible alt text, and a deterministic placeholder fallback.

Verification: Playwright covers a complete keyboard journey, card selection, Escape/Home/End/Left, native Space activation, and viewport overflow. Production build includes strict TypeScript checking.

## Revision: short live introductions

User supplied a screenshot requesting all profile information on one screen because approximately ten members share ten minutes. This supersedes progressive answers and individual profile opening slides: each member now has exactly one slide with identity and all seven answers. Left/Right navigate between members. The overview supports ten members; total slide count is member count + 4. Compact two-column answers preserve the current data fields, and the JSON accent is only visible on larger displays.
