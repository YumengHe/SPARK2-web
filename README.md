# SPARK+ project page

Project page for **SPARK+: A Task-Driven Agentic Pipeline for Articulated Objects from a Single Image**. The repository keeps its `SPARK2-web` name.

The page is static: `index.html`, `styles.css`, `app.js` and `assets/`. It uses one serif typeface throughout (Georgia, falling back to Times New Roman) from the device's installed fonts, with no font downloads. The background is white; sections are separated by spacing, a thin rule and a short gradient bar in the colours of the SPARK+ name. All files are local, with no external scripts or analytics. All paths are relative, so it works from the repository root on GitHub Pages, including under a project subpath. The `noindex, nofollow` metadata is kept while the paper is under review; it is not access control, and the repository and its Pages site are public.

## Preview locally

Requires Python 3; nothing to build or install:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

Open `http://127.0.0.1:8767/`.

## Page structure

1. Bold title beginning with SPARK+, followed by an anonymous author line.
2. Gallery: SPARK+ motion clips, each with its task sentence.
3. Overview: the paper's teaser figure, a shortened abstract and the three-minute video (with sound, played on request).
4. Method: the overview figure and four stages.
5. Results on objects without ground truth: input image and motion clips of Procedura, Articraft and SPARK+, all seven objects shown together.
6. Task as input: one car and one microwave, one motion clip per task sentence.
7. Joint types: revolute, prismatic, continuous and helical motion clips.
8. Evaluation: the qualitative comparison on ground-truth objects, one motion clip per method and object, with its joint error.
9. Simulation: PyBullet loading and four MuJoCo clips of a fingertip operating a joint.

Without JavaScript the clips play from their `autoplay` attributes; with JavaScript a clip plays only while it is on screen. With JavaScript, content also fades in as it reaches the screen, and the gallery becomes a slowly drifting loop with arrow buttons. With reduced motion requested, clips stay on their poster frame and nothing fades.

## Gallery

Each gallery entry is one `<figure>` line inside `<div class="sc-showcase">` in `index.html`. To add one, put the clip and its poster in `assets/clips/` (`g_<object>.mp4` and `g_<object>.jpg`), copy an existing line and change the file names, the `aria-label` and the task sentence. To remove one, delete its line. The lines show in file order; any number of entries works and nothing else needs to change.

With JavaScript the row is an endless loop: `app.js` adds hidden copies of the entries on both sides and wraps the position by one full set, so the last card is followed by the first. The row drifts slowly to the left (`SPEED` in `app.js`, px per second) and stops while the mouse is over it, while it is being dragged, while the keyboard is in it and while it is off screen or the tab is hidden. It stops at once under the mouse and goes on at once when the mouse leaves; after a drag, an arrow or the keyboard it starts again 1.5 s later (`RESUME_MS`). The arrow buttons and arrow keys move one card; touch, mouse drag and sideways trackpad scrolling move it freely. With reduced motion requested it does not drift. Without JavaScript the row is a plain sideways-scrolling strip.

## Files

- `index.html`: content, section order and image alternatives.
- `styles.css`: palette, layout and mobile adaptations.
- `app.js`: plays each clip only while it is on screen, fades content in as it appears, and respects reduced motion.
- `assets/figures/`: paper figures as JPEG.
- `assets/examples/<object>/`: input image of each object in the results section.
- `assets/clips/`: H.264 clips (silent, looping) and their poster frames: SPARK+, Procedura and Articraft results, the task rows and the helical joint.
- `assets/qual/`: clips and input renders of the evaluation grid.
- `assets/sim/`: MuJoCo clips.

`ASSETS.md` lists where every asset comes from.
