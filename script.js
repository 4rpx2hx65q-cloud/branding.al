// Selected Work: shfaqja një nga një kur bën scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.remove('pre');
    e.target.classList.add('in');
    io.unobserve(e.target);
  }
}),{threshold:.15});
document.querySelectorAll('.project').forEach((el,i)=>{
  el.style.setProperty('--d',(i*.15)+'s');
  el.classList.add('pre');
  io.observe(el);
});

// Lëvizje e lehtë me scroll (vetëm në kompjuter)
const steps=document.querySelectorAll('.step');
const speeds=[0,-.04,-.08,-.12];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let ticking=false;
function parallax(){
  ticking=false;
  if(innerWidth<=900||calm){steps.forEach(s=>s.style.removeProperty('--py'));return;}
  const mid=innerHeight/2;
  steps.forEach((s,i)=>{
    const r=s.getBoundingClientRect();
    if(r.bottom<-200||r.top>innerHeight+200)return;
    s.style.setProperty('--py',((r.top+r.height/2-mid)*speeds[i]).toFixed(1)+'px');
  });
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(parallax);}},{passive:true});
addEventListener('resize',parallax);
parallax();

// Hamburger menu
const menuBtn=document.getElementById('menuBtn');
const menuOverlay=document.getElementById('menuOverlay');
const menuClose=document.getElementById('menuClose');
function setMenu(open){
  menuOverlay.classList.toggle('open',open);
  menuOverlay.setAttribute('aria-hidden',open?'false':'true');
  menuBtn.setAttribute('aria-expanded',open?'true':'false');
  document.body.classList.toggle('menu-open',open);
}
menuBtn.addEventListener('click',()=>setMenu(true));
menuBtn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setMenu(true);}});
menuClose.addEventListener('click',()=>setMenu(false));
menuOverlay.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);});