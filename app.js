(() => {
'use strict';
const works = window.WORKS;
const $ = s => document.querySelector(s);
const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2,'0');
const asset = (p,n) => works[p].frames[Math.min(n,works[p].frames.length-1)].src;
// Editorial selection. The full archive below retains all projects.

$('#index-open span').textContent=`[ ${works.length} ]`;$('.selected-title .count').textContent=`( ${works.length} )`;$('.archive-foot span').textContent=`${works.length} PROJECTS`;$('#index-dialog .dialog-nav span').textContent=`INDEX / ${works.length} WORKS`;
const features = [{id:0,hero:3,second:4},{id:1,hero:1,second:2},{id:5,hero:1,second:8},{id:6,hero:0,second:8},{id:3,hero:2,second:3},{id:8,hero:2,second:6}];
$('#features').innerHTML=features.map((f)=>{const p=works[f.id];return `<article class="feature reveal"><div class="feature-head"><span class="number">[ ${pad(p.id+1)} / ${works.length} ]</span><h3>${escape(p.title)}</h3>${p.english?`<p class="en">${escape(p.english)}</p>`:''}<p class="feature-meta">${escape(p.caption)}<br>${escape(p.date || p.year)} / ${p.frames.length} FRAMES</p></div><button class="feature-photo" data-project="${p.id}" data-frame="${f.hero}" aria-label="展开《${escape(p.title)}》"><img src="${asset(p.id,f.hero)}" alt="《${escape(p.title)}》电影静帧" loading="lazy"><span class="photo-open"><span>进入作品 / ENTER PROJECT</span><span>↗</span></span></button><button class="feature-secondary" data-project="${p.id}" data-frame="${f.second}" aria-label="展开《${escape(p.title)}》另一张静帧"><img src="${asset(p.id,f.second)}" alt="《${escape(p.title)}》电影静帧" loading="lazy"></button></article>`}).join('');
$('#archive-list').innerHTML=works.map(p=>`<button class="archive-row" data-project="${p.id}" aria-label="展开《${escape(p.title)}》，${p.frames.length} 张静帧"><span class="num">${pad(p.id+1)}</span><span class="title">${escape(p.title)}${p.english?`<span class="english">${escape(p.english)}</span>`:''}</span><span class="type">${p.type || (p.caption.startsWith('MV')?'MUSIC VIDEO':'SHORT FILM')} / ${escape(p.date || p.year)}</span><span class="arrow">↗</span></button>`).join('');
$('#index-list').innerHTML=works.map(p=>`<button class="index-item" data-project="${p.id}"><span class="num">${pad(p.id+1)}</span><span class="name">${escape(p.title)}${p.english?`<em>${escape(p.english)}</em>`:''}</span><span>↗</span></button>`).join('');
const projectDialog=$('#project-dialog'), indexDialog=$('#index-dialog');
let project=0,frame=0,previousFocus=null;
function lock(){document.body.classList.add('modal-open')}
function unlock(){if(!projectDialog.open&&!indexDialog.open&&!document.querySelector('#photo-dialog')?.open)document.body.classList.remove('modal-open')}
function showFrame(n){
 const p=works[project];frame=(n+p.frames.length)%p.frames.length;
 const f=p.frames[frame],im=$('#viewer-image');im.src=f.src;im.alt=`《${p.title}》第 ${frame+1} 张电影静帧`;im.width=f.width;im.height=f.height;
 $('#viewer-count').textContent=`${pad(frame+1)} / ${pad(p.frames.length)}`;
 $('#viewer-caption').textContent=`${p.title} / SELECTED STILL`;
 document.querySelectorAll('.thumb').forEach((el,i)=>{el.classList.toggle('active',i===frame);el.setAttribute('aria-pressed',i===frame?'true':'false');});
 const thumb=document.querySelectorAll('.thumb')[frame];if(thumb){const rail=$('#thumbnails');rail.scrollTo({left:thumb.offsetLeft-rail.offsetLeft-rail.clientWidth/2+thumb.clientWidth/2,behavior:'smooth'})}
}
function openProject(id,n=0){
 project=Number(id); const p=works[project];if(!projectDialog.open)previousFocus=document.activeElement;
 if(indexDialog.open)indexDialog.close();
 $('#project-title').textContent=p.title;$('#project-title').classList.toggle('long-title',p.title.length>7);$('#project-english').textContent=p.english;$('#project-caption').textContent=p.caption;$('#project-label').textContent=`PROJECT ${pad(p.id+1)} / ${works.length} — ${escape(p.date || p.year)}`;
 $('#project-info').innerHTML=`<dl><dt>ROLE / 负责工种</dt><dd>${p.roles.map(escape).join('<br>')}</dd></dl><dl><dt>YEAR / 年份</dt><dd>${escape(p.date || p.year)}</dd></dl><dl><dt>CAMERA / 摄影机</dt><dd>${escape(p.camera)}</dd></dl><dl><dt>LENS / 镜头</dt><dd>${escape(p.lens)}</dd></dl>`;
 $('#thumbnails').innerHTML=p.frames.map((f,i)=>`<button class="thumb" data-frame="${i}" aria-label="查看第 ${i+1} 张静帧" aria-pressed="false"><img src="${f.src}" alt="" loading="lazy"></button>`).join('');
 if(!projectDialog.open)projectDialog.showModal();lock();projectDialog.scrollTop=0;showFrame(n);
 const next=works[(project+1)%works.length];$('#next-project').textContent=`下一部 / ${next.title} ↗`;
}
function closeProject(){projectDialog.close();unlock();if(previousFocus&&previousFocus.isConnected)previousFocus.focus({preventScroll:true})}
document.addEventListener('click',e=>{const target=e.target.closest('[data-project]');if(target)openProject(target.dataset.project,Number(target.dataset.frame||0));});
$('#index-open').addEventListener('click',()=>{indexDialog.showModal();lock()});$('#index-close').addEventListener('click',()=>indexDialog.close());indexDialog.addEventListener('close',unlock);
$('#project-close').addEventListener('click',closeProject);projectDialog.addEventListener('close',unlock);
$('.prev').addEventListener('click',()=>showFrame(frame-1));$('.next').addEventListener('click',()=>showFrame(frame+1));
$('#thumbnails').addEventListener('click',e=>{const thumb=e.target.closest('[data-frame]');if(thumb)showFrame(Number(thumb.dataset.frame));});
$('#next-project').addEventListener('click',()=>openProject((project+1)%works.length));
projectDialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showFrame(frame-1)}if(e.key==='ArrowRight'){e.preventDefault();showFrame(frame+1)}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const preview=$('.hover-preview'),previewImage=preview.querySelector('img');
if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.archive-row').forEach(row=>{row.addEventListener('mouseenter',()=>{const p=works[Number(row.dataset.project)];previewImage.src=p.frames[Math.min(1,p.frames.length-1)].src;preview.classList.add('active')});row.addEventListener('mouseleave',()=>preview.classList.remove('active'));row.addEventListener('mousemove',e=>{preview.style.left=Math.min(innerWidth-360,e.clientX+30)+'px';preview.style.top=Math.max(20,Math.min(innerHeight-220,e.clientY-130))+'px'});row.addEventListener('click',()=>preview.classList.remove('active'))})}
let ticking=false;window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('.scroll-progress').style.width=(max>0?scrollY/max*100:0)+'%';ticking=false});ticking=true}},{passive:true});
})();
