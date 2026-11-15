# Asset provenance

Every image and clip on the page comes from the SPARK+ paper or from renders of the same SPARK+ results that the paper's figures show. Nothing is generated, retouched or composited beyond cropping, scaling, placing on white and re-encoding (which also drops all image metadata). Object names follow the paper.

## Paper figures (`assets/figures/`)

| File | Paper figure |
|---|---|
| `teaser.jpg` | Fig. 1, teaser: mantel clock, desk lamp, sunflower chest, balance scale, folding fan |
| `overview.jpg` | Fig. 2, overview of the pipeline, rasterized from the vector figure |
| `seams.jpg` | Fig. 4, outline guide, rasterized from the vector figure |
| `cad_agent.jpg` | Fig. 5, CAD agent, rasterized from the vector figure |
| `joint_search.jpg` | Fig. 6, hinge search, rasterized from the vector figure |
| `car_tasks.jpg` | Fig. 3, one image, three tasks |
| `microwave_tasks.jpg` | Fig. 11, one shell, different tasks (App. B.8) |
| `qual_gt.jpg` | Fig. 7, qualitative results on ground-truth objects of ArticulateArena |
| `helical.jpg` | Fig. 10, helical joint on a light bulb (App. A.8) |
| `mujoco_manip.jpg` | Fig. 14, a fingertip operating joints in MuJoCo (App. C.4) |

## Results section (`assets/examples/<object>/`)

Objects: wardrobe, chest of drawers, highboy, microwave, triptych, desk lamp, wheelchair, motorbike. These are the objects without ground truth of the paper's qualitative figures (Fig. 8, and Figs. 12 and 13 in the appendix).

- `input.jpg`: the input image of the SPARK+ run, cropped as in the paper figure where the paper crops it (highboy).
- `procedura.jpg`, `articraft.jpg`: the Procedura and Articraft results drawn in the paper's qualitative figures, the same renders (same runs, poses and cameras), placed on white. They are the only results of these methods on these images; none was chosen over another.

Task sentences shown with each object are the English task sentences of the runs, written in lower case as in the paper figures.

## Motion clips (`assets/clips/`)

Each clip renders the URDF that SPARK+ delivered for the object at a sequence of joint values, with the paper's Blender figure renderer and studio lighting, the camera of the object in the paper's qualitative figure, and one fixed framing for all frames. Hinged and sliding parts move from rest to the goal of the task and back; continuous joints turn a full turn per loop. The desk lamp, highboy and triptych stop at the same fraction of the way to the goal as in the paper figure. The `.jpg` next to each clip is its last frame (the poster).

| Clip | Object | Joint type |
|---|---|---|
| `wardrobe` | wardrobe | revolute |
| `chest` | chest of drawers | prismatic |
| `highboy` | highboy | prismatic |
| `microwave` | microwave | revolute |
| `triptych` | triptych | revolute |
| `lamp` | desk lamp | revolute (two joints) |
| `wheelchair` | wheelchair | continuous |
| `motorbike` | motorbike | continuous |
| `sunflower` | sunflower chest | prismatic |
| `clock` | mantel clock | continuous |

Clips are H.264, yuv420p, silent, 24 fps (continuous joints 12 fps, two turns per loop).

## Numbers on the page

| Number | Source in the paper |
|---|---|
| 100 objects with ground truth | Sec. 4, Data |
| 13 buttons, each on its own prismatic joint (image alternative of the microwave figure) | Sec. 3.1 and App. B.8 |
| 3.6 mm per turn, three turns; 0 / 5.4 / 10.8 mm rise (in the helical figure) | App. A.8, Fig. 10 |
| 3.6 to 0.8 mm largest detachment | Fig. 6 caption |
| 26 components (image alternative of the overview figure) | Fig. 2 |
| 108 / 108 load in PyBullet; 109 / 113 joints driven through at least 90% of their range in MuJoCo | Sec. 5 and App. C.4 |

## Other files

`favicon.svg` is a typographic S+ mark.
