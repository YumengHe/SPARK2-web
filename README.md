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
2. Overview: the paper's teaser figure, a shortened abstract and the three-minute video (with sound, played on request).
3. Method: the overview figure and four stages.
4. Results on objects without ground truth: input image and motion clips of Procedura, Articraft and SPARK+, all seven objects shown together.
5. Task as input: one car and one microwave, one motion clip per task sentence.
6. Joint types: revolute, prismatic, continuous and helical motion clips.
7. Evaluation: the qualitative comparison on ground-truth objects, one motion clip per method and object, with its joint error.
8. Simulation: PyBullet loading and four MuJoCo clips of a fingertip operating a joint.

Without JavaScript the clips play from their `autoplay` attributes; with JavaScript a clip plays only while it is on screen. With JavaScript, content also fades in as it reaches the screen. With reduced motion requested, clips stay on their poster frame and nothing fades.

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
