const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduced) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);} }), {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
  const back=button.dataset.view==='back';
  document.getElementById('bottle-view').classList.toggle('back',back);
  document.getElementById('bottle-image').alt='龙马精神酒瓶'+(back?'背面':'正面');
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
}));
const packageImages={open:['c00fba54-9ccd-49f6-b05d-e1967ee4f367.png','龙马精神酒外盒开启状态'],closed:['54c34e99-ef74-4be6-98c6-7a563f48d035.png','龙马精神酒瓶与外盒组合'],side:['99a8477a-dd90-49f1-8fa1-0d68f8274031.png','龙马精神外盒侧面实拍']};
document.querySelectorAll('[data-package]').forEach(button=>button.addEventListener('click',()=>{
  const [file,alt]=packageImages[button.dataset.package];
  const img=document.getElementById('package-image');img.src='assets/'+file;img.alt=alt;
  document.querySelectorAll('[data-package]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
}));
const dialog=document.getElementById('lightbox');
document.querySelectorAll('[data-enlarge]').forEach(button=>button.addEventListener('click',()=>{
  const img=document.getElementById('lightbox-image');img.src=button.dataset.enlarge;img.alt=button.dataset.caption;
  document.getElementById('lightbox-caption').textContent=button.dataset.caption;
  dialog.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
