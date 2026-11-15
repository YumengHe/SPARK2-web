# SPARK+ project page

Project page for **SPARK+: A Task-Driven Agentic Pipeline for Articulated Objects from a Single Image**. The repository keeps its `SPARK2-web` name.

The page is static: `index.html`, `styles.css`, `app.js` and `assets/`. It uses system fonts and local files only, with no external scripts, analytics or runtime requests. All paths are relative, so it works from the repository root on GitHub Pages, including under a project subpath. The `noindex, nofollow` metadata is kept while the paper is under review; it is not access control, and the repository and its Pages site are public.

## Preview locally

Requires Python 3; nothing to build or install:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

Open `http://127.0.0.1:8767/`.

## Page structure

1. Title with four looping results, anonymous author line, and resource labels (paper and code coming soon).
2. Overview: the paper's teaser figure, a shortened abstract and the three contributions.
3. How SPARK+ differs from image-to-3D generators and agentic CAD methods.
4. Method: the overview figure, four stages, and tabs for the outline guide, the CAD agent and the hinge search, each with its paper figure.
5. Results on objects without ground truth: input image and motion clips of Procedura, Articraft and SPARK+, all eight objects shown together.
6. Task as input: one car and one microwave, one motion clip per task sentence.
7. Joint types: revolute, prismatic, continuous and helical motion clips.
8. Evaluation: the qualitative comparison on ground-truth objects, one motion clip per method and object, with its joint error.
9. Simulation: PyBullet loading and four MuJoCo clips of a fingertip operating a joint.

Without JavaScript the method panel shows the outline-guide tab and the clips play from their `autoplay` attributes; with JavaScript a clip plays only while it is on screen. With reduced motion requested, clips stay on their poster frame.

## Files

- `index.html`: content, section order and image alternatives.
- `styles.css`: palette, layout and mobile adaptations.
- `app.js`: plays each clip only while it is on screen; the method-detail tabs (click, arrow keys, Home, End).
- `assets/figures/`: paper figures as JPEG.
- `assets/examples/<object>/`: input image of each object in the results section.
- `assets/clips/`: H.264 clips (silent, looping) and their poster frames: SPARK+, Procedura and Articraft results, the task rows and the helical joint.
- `assets/qual/`: clips and input renders of the evaluation grid.
- `assets/sim/`: MuJoCo clips.

`ASSETS.md` lists where every asset comes from.
