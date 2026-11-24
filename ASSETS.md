# Asset provenance

Every image and clip on the page comes from the SPARK+ paper or from renders of the same SPARK+ results that the paper's figures show. Nothing is generated, retouched or composited beyond cropping, scaling, placing on white and re-encoding (which also drops all image metadata). Object names follow the paper.

## Paper figures (`assets/figures/`)

| File | Paper figure |
|---|---|
| `teaser.jpg` | Fig. 1, teaser: mantel clock, desk lamp, sunflower chest, balance scale, folding fan |
| `overview.jpg` | Fig. 2, overview of the pipeline, rasterized from the vector figure |

## Results section (`assets/examples/<object>/`)

Objects: wardrobe, chest of drawers, highboy, microwave, triptych, desk lamp, wheelchair. These objects without ground truth are selected from the paper's qualitative figures (Fig. 8, and Figs. 12 and 13 in the appendix).

- `input.jpg`: the input image of the SPARK+ run, cropped as in the paper figure where the paper crops it (highboy).

Task sentences shown with each object are the English task sentences of the runs, written in lower case as in the paper figures.

## Motion clips

Every clip renders the result that the corresponding paper figure draws (same run, same placement, same camera), with the paper's Blender figure renderer and studio lighting and one fixed framing for all frames of a clip. A model moves from its rest pose (every joint at zero) to the pose shown in the paper figure and back; a continuous joint turns one full turn instead of the quarter turn of a still figure. Nothing is chosen frame by frame. The `.jpg` next to each clip is its poster: the pose of the paper figure (for clips that only turn, the rest pose).

`assets/clips/`

| Clip | Content | Paper figure |
|---|---|---|
| `wardrobe`, `chest`, `highboy`, `microwave`, `triptych`, `lamp`, `wheelchair` | SPARK+, rest to the goal of its task (lamp to the same fraction of the way as the paper figure; highboy to its limit; triptych to nine tenths of the way, with the poster at half way) | Figs. 8, 12, 13 |
| `<object>_procedura` | Procedura's model, rest to the open end of every joint as drawn in the paper (same per-object fractions and limits); its continuous joints one full turn | Figs. 8, 12, 13 |
| `<object>_articraft` | Articraft's model along its own exported animation, from q = 0 to its open pose; its poster is the pose of the paper figure (q = 0 for the triptych) | Figs. 8, 12, 13 |
| `car_wheels`, `car_hood`, `car_door` | one car, one run per task sentence, cameras of the paper figure, one scale for the three clips | Fig. 3 |
| `mw_door`, `mw_knob`, `mw_doorknob`, `mw_keys` | one microwave shell, one run per task sentence, one camera and crop for the four clips; the buttons travel 2 mm | Fig. 11 |
| `bulb` | helical joint on a SPARK+ result made from a photo of a light bulb in its socket (Wikimedia Commons, "00102 Lampada a incandescenza", CC BY 4.0, rotated upright): three turns and a 10.8 mm rise, textured as generated, same studio as the other clips | |
| `sunflower`, `clock` | SPARK+ (joint types) | |

`car_input.jpg` and `mw_input.jpg` are the input images, cropped as in the paper figures.

`assets/qual/`: the qualitative comparison on ground-truth objects (paper Fig. 7): rows laptop, oven, box, ceiling light, microwave, toilet; for every row the input render (`<row>_input.jpg`, the benchmark's front render) and one clip per method (`gt`, `URDFormer`, `SPARK`, `articraft`, `procedura`, `Ditto`, `ours`), each placed by its best-fit registration and painted by link as in the paper. Each model moves from q = 0 to the pose of the paper cell (ground truth: its first movable joint to its open end; other methods: their joint closest to the ground-truth joint to its far end; SPARK+: the goal of its task). The joint error printed under each cell is the paper's best-fit value, taken from the same evaluation records the paper figure reads.

`assets/sim/`: the four joints of paper Fig. 14 (door, lid, drawer, knob), re-run with the MuJoCo protocol of the paper unchanged (same scene, contact setting, fingertip and contact point; the re-run reaches the same joint travel as the recorded result), with a picture every 84 simulation steps from the approach to the watch after letting go, played at about twice real time. The yellow translucent ball marks the fingertip.

Clips are H.264, yuv420p, silent; 24 fps (clips that only turn: 12 fps, two turns per loop).

## Numbers on the page

| Number | Source in the paper |
|---|---|
| 100 objects with ground truth | Sec. 4, Data |
| 13 buttons, each on its own prismatic joint (image alternative of the microwave figure) | Sec. 3.1 and App. B.8 |
| 3.6 mm per turn, three turns, 10.8 mm rise | App. A.8, Fig. 10 |
| 26 components (image alternative of the overview figure) | Fig. 2 |
| 108 / 108 load in PyBullet; 109 / 113 joints driven through at least 90% of their range in MuJoCo | Sec. 5 and App. C.4 |

## Other files

`video.mp4` (repository root) is the supplementary video (1920x1080, 30 fps, synthesised narration, burned-in captions), assembled from the clips and paper figures listed above; `assets/video_poster.jpg` is its title card at 2 s, without the caption.

`favicon.svg` is the supplied SVG: an S assembled from five coloured parts, with a plus at the upper right and a transparent background.

Typography uses the device's installed Georgia and Avenir Next fonts, with system fallbacks. No font files are bundled or downloaded.
