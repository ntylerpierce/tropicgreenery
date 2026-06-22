# Tropic Greenery Lawn & Landscape

## Project Overview
Tropic Greenery Lawn and Landscape — a multi-page static HTML/CSS/JS website for a family-owned landscaping company based in Melbourne, FL. Founded 1981. Serves all of Brevard County.

## Project Structure
```
/tropic-greenery
  /css
    style.css        ← all global styles, mobile-first
    mobile.css       ← imported at bottom of style.css
  /js
    main.js          ← vanilla JS only, no libraries
  /images            ← placeholder references only
  /pages
    services.html
    landscape-design.html
    lawn-maintenance.html
    fertilization-ipm.html
    about.html
    gallery.html
    service-areas.html
    contact.html
    blog.html
  index.html
  sitemap.xml
  robots.txt
  README.md
```

## CSS Architecture
- All CSS is written mobile-first
- Base styles apply at all screen sizes
- Desktop enhancements use min-width media queries only — never max-width overrides
- All layout rules live in style.css
- mobile.css is reserved for viewport-specific adjustments only
- No CSS frameworks — all styles written from scratch
- CSS custom properties (variables) defined in :root in style.css control all colors and fonts

## Known Fixes Applied
- footer-grid changed from flex-direction: row base to flex-direction: column base with min-width: 768px override for row layout — fixes mobile overflow
- All padding-inline and margin-inline logical properties replaced with physical equivalents — fixes silent failure on older Android and iOS Safari

## Deployment
- Hosted on Vercel
- Connected to GitHub — push to main branch triggers automatic redeploy
- No build step required — pure static HTML/CSS/JS
- Formspree used for form submissions — replace REPLACE_WITH_FORM_ID in all form action attributes before going live

## CSS Rules & Known Compatibility Fixes

### Never Use CSS Logical Properties

Never use CSS logical properties anywhere in this codebase. This means:

Do not use:
- padding-inline
- padding-block
- margin-inline
- margin-block
- inset-inline
- inset-block
- border-inline
- border-block

Always use the physical equivalents instead:
- padding-left / padding-right
- padding-top / padding-bottom
- margin-left / margin-right
- margin-top / margin-bottom
- left / right / top / bottom
- border-left / border-right etc.

**Reason:** CSS logical properties are not supported in older Android browsers and some iOS Safari versions. They silently fail with no error, making bugs extremely hard to diagnose. Physical properties have universal browser support and are required for this project.

If you find any existing logical properties in style.css, mobile.css, or any other CSS file while working on a task, replace them with physical equivalents as part of that task without being asked.
