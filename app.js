(()=>{
 const root=document.getElementById('spark-clean');
 const cropPaths={
  "58 66 112 122": "assets/paper-placeholders/wardrobe-input.png",
  "58 192 112 124": "assets/paper-placeholders/wardrobe-shell.png",
  "58 320 112 124": "assets/paper-placeholders/wardrobe-procedura.png",
  "58 451 112 124": "assets/paper-placeholders/wardrobe-closed.png",
  "58 580 112 124": "assets/paper-placeholders/wardrobe-opened.png",
  "173 66 112 122": "assets/paper-placeholders/drawers-input.png",
  "173 192 112 124": "assets/paper-placeholders/drawers-shell.png",
  "173 320 112 124": "assets/paper-placeholders/drawers-procedura.png",
  "173 451 112 124": "assets/paper-placeholders/drawers-closed.png",
  "173 580 112 124": "assets/paper-placeholders/drawers-opened.png",
  "518 66 112 122": "assets/paper-placeholders/microwave-input.png",
  "518 192 112 124": "assets/paper-placeholders/microwave-shell.png",
  "518 320 112 124": "assets/paper-placeholders/microwave-procedura.png",
  "518 451 112 124": "assets/paper-placeholders/microwave-closed.png",
  "518 580 112 124": "assets/paper-placeholders/microwave-opened.png",
  "634 66 108 122": "assets/paper-placeholders/lamp-input.png",
  "634 192 108 124": "assets/paper-placeholders/lamp-shell.png",
  "634 320 108 124": "assets/paper-placeholders/lamp-procedura.png",
  "634 451 108 124": "assets/paper-placeholders/lamp-closed.png",
  "634 580 108 124": "assets/paper-placeholders/lamp-opened.png",
  "746 66 112 122": "assets/paper-placeholders/wheelchair-input.png",
  "746 192 112 124": "assets/paper-placeholders/wheelchair-shell.png",
  "746 320 112 124": "assets/paper-placeholders/wheelchair-procedura.png",
  "746 451 112 124": "assets/paper-placeholders/wheelchair-closed.png",
  "746 580 112 124": "assets/paper-placeholders/wheelchair-opened.png",
  "861 66 115 122": "assets/paper-placeholders/motorbike-input.png",
  "861 192 115 124": "assets/paper-placeholders/motorbike-shell.png",
  "861 320 115 124": "assets/paper-placeholders/motorbike-procedura.png",
  "861 451 115 124": "assets/paper-placeholders/motorbike-closed.png",
  "861 580 115 124": "assets/paper-placeholders/motorbike-opened.png"
};
 function setCrop(image,box){image.src=cropPaths[box];}
 root.querySelectorAll('[data-crop]').forEach(svg=>setCrop(svg,svg.dataset.crop));
 const cases={wardrobe:{x:58,w:112,task:'Open both doors.'},drawers:{x:173,w:112,task:'Open one drawer.'},microwave:{x:518,w:112,task:'Open the microwave door.'},lamp:{x:634,w:108,task:'Raise the arm and turn the shade.'},wheelchair:{x:746,w:112,task:'Turn the wheels.'},motorbike:{x:861,w:115,task:'Turn the front and rear wheels.'}};
 const view={object:'wardrobe',pose:'opened'};
 function renderGallery(){
  const item=cases[view.object];
  [['sc-input',66,122],['sc-shell',192,124],['sc-procedura',320,124],['sc-final',view.pose==='opened'?580:451,124]].forEach(([id,y,h])=>{const svg=root.querySelector('#'+id);setCrop(svg,`${item.x} ${y} ${item.w} ${h}`);svg.setAttribute('alt',`Placeholder paper image: ${view.object}, ${id==='sc-final'?view.pose:id.slice(3)}`);});
  root.querySelector('#sc-task').textContent=item.task;
  root.querySelector('#sc-final-caption').textContent='SPARK+ · '+(view.pose==='opened'?'task pose':'rest pose');
  root.querySelectorAll('[data-case]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.case===view.object)));
  root.querySelectorAll('[data-pose]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.pose===view.pose)));
  root.querySelector('#sc-gallery-note').textContent='Placeholder · static crops from draft Figure 6. '+(['wheelchair','motorbike'].includes(view.object)?'The paper shows wheels a quarter turn on; a motion clip is still needed.':'These controls switch paper images; they do not run a reconstruction or simulation.');
 }
 root.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{view.object=button.dataset.case;renderGallery();}));
 root.querySelectorAll('[data-pose]').forEach(button=>button.addEventListener('click',()=>{view.pose=button.dataset.pose;renderGallery();}));
 const methods={agent:{title:'Plan, build, and repair.',copy:'The CAD agent plans components, writes them in parallel, clips them against the shell, and repairs the components responsible for failed checks.',media:'Figure 4 · CAD agent sequence'},seams:{title:'Find the boundary. Keep the detail.',copy:'Part outlines are refined to nearby shell creases. The shell is cut along these seams, and hidden CAD geometry completes each visual link.',media:'Figure 3 · outline & seam close-up'},hinges:{title:'A small shift can change the motion.',copy:'Candidate hinge pivots are scored on the hybrid model for penetration and detachment across opening poses. Contact and usual opening behavior help determine motion limits.',media:'Figure 5 · hinge search & motion curves'},verification:{title:'Check the asset, not just the image.',copy:'The pipeline checks link geometry, shell coverage, task joints, and motion sweeps before loading the final URDF in PyBullet. A check is not shown as passed until its result is available.',media:'Simulation playback & verification report'}};
 function setMethod(key){const item=methods[key];root.querySelector('#sc-method-title').textContent=item.title;root.querySelector('#sc-method-copy').textContent=item.copy;root.querySelector('#sc-method-media').textContent=item.media;root.querySelector('#sc-method-panel').setAttribute('aria-labelledby','sc-tab-'+key);root.querySelectorAll('[data-method]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.method===key)));}
 const methodButtons=[...root.querySelectorAll('[data-method]')];
 methodButtons.forEach((button,index)=>{
  button.addEventListener('click',()=>setMethod(button.dataset.method));
  button.addEventListener('keydown',event=>{
   let next;
   if(event.key==='ArrowRight')next=(index+1)%methodButtons.length;
   if(event.key==='ArrowLeft')next=(index+methodButtons.length-1)%methodButtons.length;
   if(event.key==='Home')next=0;
   if(event.key==='End')next=methodButtons.length-1;
   if(next===undefined)return;
   event.preventDefault();methodButtons[next].focus();setMethod(methodButtons[next].dataset.method);
  });
 });


})();
