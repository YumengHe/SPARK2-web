# SPARK+ website template

A clean, figure-led academic website for **SPARK+: A Task-Driven Agentic Pipeline for Simulation-Ready Articulated Objects from a Single Image**. The repository keeps its `SPARK2-web` name.

This is a template, not a final research release. All displayed example images are explicitly labeled placeholders cropped from the supplied draft paper. Switching objects and poses changes static images; it does not run reconstruction or simulation. There are no final experimental claims, external page links, or runtime API calls.

## Preview locally

Requires Python 3; no build or package installation is needed:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

Open `http://127.0.0.1:8767/`. The same files work with GitHub Pages from `main` at the repository root, including a project subpath.

## Page structure

1. Figure-led title and introduction.
2. What's new: an exploded-assembly concept diagram, task-guided input, shell plus agent-written CAD, and geometry-guided motion.
3. SPARK versus SPARK+ method comparison.
4. Method overview with CAD, seam, hinge, and verification details.
5. Selected examples with object and static-pose controls.
6. Revolute, prismatic, and continuous motion placeholders.

Evaluation and Discussion sections, unavailable resource buttons, external links, and footer labels are intentionally omitted. Verification is a description of the method, not a claim that any example passed all checks.

## Edit the template

- `index.html`: content, section order, image alternatives, and initial example.
- `styles.css`: the supplied accent palette, spacious layout, and mobile adaptations.
- `app.js`: example selection, static-pose selection, and method-detail controls.
- `assets/paper-placeholders/`: 30 cropped image cells from draft Figure 6. See `ASSETS.md` for provenance.
- `assets/spark-plus-concept.svg`: the geometric shell-and-CAD illustration selected for the main concept section; a conceptual placeholder, not a reconstruction output.

The page uses system fonts and local images. Its initial images remain visible without JavaScript. Method controls support mouse, touch, keyboard activation, arrow keys, Home, and End.

Only the current template's assets are included. Unused legacy media, configuration, and bundled fonts have been removed.

## Before a final release

Replace the low-resolution paper crops with approved original renders or motion clips, confirm the paper text, and add authors and resources only when supplied. Keep placeholder disclosures until their corresponding content is final. No benchmark numbers are included. The `noindex, nofollow` metadata is retained while the page is a template; it is not access control, and the GitHub repository and Pages site are public.
