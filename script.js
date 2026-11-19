/* ========= YAHAN APNI SETTINGS BADLO ========= */
const CONFIG = {
  creator: "Shivanshu",
  music: "music/birthday.mp3",
  images: [
    "images/dii1.png","images/dii2.png","images/dii3.png",
    "images/dii4.png","images/dii5.png","images/dii6.png"
  ],
  captions: ["Pyaari Muskaan","Sunhari Yaadein","Royal Moment","Masti Wale Din","Hamesha Saath","Meri Princess"]
};
/* ============================================ */

// document.getElementById('creator').textContent = CONFIG.creator;
// const audio = document.getElementById('audio');
// audio.src = CONFIG.music;
// const playBtn = document.getElementById('playBtn');
// const musicBox = document.getElementById('music');
// const playMusicBtn = document.getElementById('playMusicBtn');

const bgMusic = document.getElementById('bgMusic');
bgMusic.src = CONFIG.music;
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const playMusicBtn = document.getElementById('playMusicBtn');
let isPlaying = false;

/* ---------- Gallery ---------- */
const grid = document.getElementById('grid');
const ph = n => 'data:image/svg+xml;utf8,' + encodeURIComponent(
 `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="100%" height="100%" fill="#4a2090"/><text x="50%" y="46%" fill="#f6c453" font-size="60" text-anchor="middle">👑</text><text x="50%" y="58%" fill="#ffe9a8" font-size="22" text-anchor="middle" font-family="sans-serif">Photo ${n} yahan lagao</text></svg>`);
CONFIG.images.slice(0,6).forEach((src,i)=>{
  const c = document.createElement('div'); c.className='card observe';
  const img = new Image(); img.src = src; img.alt = CONFIG.captions[i]; img.loading = 'lazy';
  img.onerror = () => { img.onerror=null; img.src = ph(i+1); };
  const tip = document.createElement('span'); tip.className='tip'; tip.textContent = CONFIG.captions[i];
  c.append(img,tip); grid.appendChild(c);
});

/* ---------- Sky: stars + lanterns ---------- */
const sky = document.getElementById('sky');
for(let i=0;i<70;i++){
  const s=document.createElement('div'); s.className='star';
  const z=Math.random()*3+1;
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${z}px;height:${z}px;animation-delay:${Math.random()*3}s`;
  sky.appendChild(s);
}
function lantern(){
  if (document.hidden) return;
  const l=document.createElement('div'); l.className='lantern';
  const d=8+Math.random()*10;
  l.style.cssText=`left:${Math.random()*100}%;animation-duration:${d}s;transform:scale(${.6+Math.random()*.9})`;
  sky.appendChild(l); setTimeout(()=>l.remove(),d*1000);
}
setInterval(lantern,900); for(let i=0;i<8;i++) setTimeout(lantern,i*250);

/* ---------- Music ---------- */
/* ---------- Music ---------- */
function setIcon(){
  musicBtn.classList.toggle('playing', isPlaying);
  musicIcon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-music';
  const i = playMusicBtn.querySelector('i');
  if (i) i.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
}
function toggleMusic(){
  if (!isPlaying){
    bgMusic.play().then(()=>{ isPlaying = true; setIcon(); }).catch(()=>{});
  } else {
    bgMusic.pause(); isPlaying = false; setIcon();
  }
}
musicBtn.addEventListener('click', toggleMusic);
playMusicBtn.addEventListener('click', toggleMusic);



/* ---------- Confetti ---------- */
function boom(n=90){
  const colors=['#f6c453','#ff9ecb','#ffe9a8','#b58cff','#fff'];
  for(let i=0;i<n;i++){
    const c=document.createElement('div'); c.className='confetti';
    const d=2+Math.random()*3;
    c.style.cssText=`left:${Math.random()*100}vw;width:${6+Math.random()*8}px;height:${10+Math.random()*10}px;background:${colors[i%5]};animation-duration:${d}s;border-radius:${Math.random()>.5?'50%':'2px'}`;
    document.body.appendChild(c); setTimeout(()=>c.remove(),d*1000);
  }
}

/* ---------- Intro open ---------- */
// document.getElementById('openBtn').onclick = () => {
//   document.getElementById('intro').classList.add('hide');
//   audio.play().catch(()=>{}); setIcon(); boom();
// };

document.getElementById('openBtn').onclick = () => {
  document.getElementById('intro').classList.add('hide');
  bgMusic.play().then(()=>{ isPlaying = true; setIcon(); }).catch(()=>{});
  boom();
};

/* ---------- Hero buttons + popup ---------- */
document.getElementById('viewMemoriesBtn').onclick = () =>
  document.getElementById('gallery').scrollIntoView({behavior:'smooth'});
const popup = document.getElementById('popupOverlay');
document.getElementById('surpriseBtn').onclick = () => { popup.classList.add('show'); boom(120); };
document.getElementById('popupClose').onclick = () => popup.classList.remove('show');
popup.onclick = e => { if (e.target === popup) popup.classList.remove('show'); };

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in-view'); io.unobserve(en.target); } });
}, { threshold: .15 });
document.querySelectorAll('.timeline-item').forEach(el => el.classList.add('observe'));
document.querySelectorAll('.observe').forEach((el,i) => { el.style.transitionDelay = (i%3)*0.1+'s'; io.observe(el); });

/* ---------- Rail dot nav ---------- */
const dots = document.querySelectorAll('.rail-dot');
const targets = Array.from(dots).map(d => document.getElementById(d.dataset.target));
function updateRail(){
  let cur = 0;
  targets.forEach((s,i) => { if (s && s.getBoundingClientRect().top <= innerHeight*.5) cur = i; });
  dots.forEach((d,i) => d.classList.toggle('active', i===cur));
}
addEventListener('scroll', updateRail, {passive:true}); updateRail();
dots.forEach(d => d.onclick = () => document.getElementById(d.dataset.target).scrollIntoView({behavior:'smooth'}));

/* ---------- Gold sparkle on click / touch ---------- */
const cv = document.getElementById('sparkCanvas'), cx = cv.getContext('2d');
function fit(){ cv.width = innerWidth; cv.height = innerHeight; }
fit(); addEventListener('resize', fit);
let sparks = [], running = false;
function sparkle(x,y){
  for(let i=0;i<14;i++){
    const a = Math.PI*2*i/14, v = 2+Math.random()*2.5;
    sparks.push({x,y,r:Math.random()*2+1,life:1,vx:Math.cos(a)*v,vy:Math.sin(a)*v});
  }
  if(!running){ running = true; requestAnimationFrame(tick); }
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  sparks = sparks.filter(p => (p.life -= .03) > 0);
  sparks.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vx *= .96; p.vy *= .96;
    cx.beginPath(); cx.fillStyle = `rgba(255,233,168,${p.life})`;
    cx.shadowColor = 'rgba(246,196,83,.9)'; cx.shadowBlur = 8;
    cx.arc(p.x,p.y,p.r,0,Math.PI*2); cx.fill();
  });
  if (sparks.length) requestAnimationFrame(tick); else { running = false; cx.clearRect(0,0,cv.width,cv.height); }
}
document.addEventListener('click', e => sparkle(e.clientX, e.clientY));
document.addEventListener('touchstart', e => { const t = e.touches[0]; if (t) sparkle(t.clientX, t.clientY); }, {passive:true});

/* ---------- Lightbox ---------- */
(function(){
  const items = Array.from(document.querySelectorAll('.card'));
  const lb = document.createElement('div');
  lb.className = 'lightbox'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-label','Photo viewer');
  lb.innerHTML = `
    <button class="lb-btn lb-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <button class="lb-btn lb-prev" aria-label="Previous photo"><i class="fa-solid fa-chevron-left"></i></button>
    <img class="lb-img" alt="">
    <button class="lb-btn lb-next" aria-label="Next photo"><i class="fa-solid fa-chevron-right"></i></button>
    <div class="lb-count"></div>`;
  document.body.appendChild(lb);
  const img = lb.querySelector('.lb-img'), count = lb.querySelector('.lb-count');
  let idx = 0;
  const show = i => {
    idx = (i + items.length) % items.length;
    const s = items[idx].querySelector('img');
    img.src = s.currentSrc || s.src; img.alt = s.alt;
    count.textContent = (idx+1) + ' of ' + items.length;
  };
  const open = i => { show(i); lb.classList.add('show'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('show'); document.body.style.overflow = ''; };
  items.forEach((c,i) => c.addEventListener('click', () => open(i)));
  lb.querySelector('.lb-close').onclick = close;
  lb.querySelector('.lb-prev').onclick = e => { e.stopPropagation(); show(idx-1); };
  lb.querySelector('.lb-next').onclick = e => { e.stopPropagation(); show(idx+1); };
  lb.onclick = e => { if (e.target === lb) close(); };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { popup.classList.remove('show'); close(); }
    if (!lb.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') show(idx-1);
    if (e.key === 'ArrowRight') show(idx+1);
  });
  let sx = 0;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, {passive:true});
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  });
})();
