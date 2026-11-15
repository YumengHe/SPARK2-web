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
5. Results on objects without ground truth: input image, Procedura, Articraft and a SPARK+ motion clip, switchable by object.
6. Task as input: one car and one microwave under different task sentences.
7. Joint types: revolute, prismatic, continuous and helical motion clips.
8. Evaluation: the qualitative comparison on ground-truth objects.
9. Simulation: PyBullet loading and MuJoCo end-effector operation.
10. Limitations and BibTeX.

Without JavaScript every section shows its first state (the wardrobe example and the outline-guide tab), and the clips play from their `autoplay` attributes. With reduced motion requested, clips stay on their poster frame.

## Files

- `index.html`: content, section order and image alternatives.
- `styles.css`: palette, layout and mobile adaptations.
- `app.js`: object switching in the results section and the method-detail tabs (click, arrow keys, Home, End).
- `assets/figures/`: paper figures as JPEG.
- `assets/examples/<object>/`: input image and comparison renders of each object in the results section.
- `assets/clips/`: H.264 clips (silent, looping) and their poster frames.

`ASSETS.md` lists where every asset comes from.
