'use strict';
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const assets=document.body.dataset.assets, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const langTrigger=$('.lang-trigger'),langMenu=$('.lang-menu');
function closeLanguages(restore=false){langMenu.hidden=true;langTrigger.setAttribute('aria-expanded','false');if(restore)langTrigger.focus();syncNavBackdrop()}
function openLanguages(){langMenu.hidden=false;langTrigger.setAttribute('aria-expanded','true');syncNavBackdrop()}
langTrigger.addEventListener('click',()=>{if(langMenu.hidden)openLanguages();else closeLanguages()});
langTrigger.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();openLanguages();const items=$$('a',langMenu);items[e.key==='ArrowDown'?0:items.length-1].focus()}});
langMenu.addEventListener('keydown',e=>{const items=$$('a',langMenu),i=items.indexOf(document.activeElement);if(e.key==='Escape'){e.preventDefault();closeLanguages(true)}else if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?items.length-1:(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items[n].focus()}else if(e.key==='Tab')closeLanguages()});
document.addEventListener('click',e=>{if(!e.target.closest('.lang-switch'))closeLanguages()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!langMenu.hidden)closeLanguages(true)});
const menu=$('.menu-toggle'),links=$('.nav-links');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));links.classList.toggle('open',open);syncNavBackdrop()});
$$('a',links).forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');links.classList.remove('open');syncNavBackdrop()}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('open')){menu.click();menu.focus()}});
let heroIndex=0, heroPaused=reduce;const hero=$('#hero-video'),toggle=$('#hero-toggle');
function syncHeroButton(){if(!toggle)return;toggle.textContent=heroPaused?'▶':'Ⅱ';toggle.setAttribute('aria-label',document.body.dataset[heroPaused?'play':'pause'])}
function heroFilm(i){heroIndex=(i+4)%4;hero.classList.remove('is-playing');hero.src=assets+`film-${heroIndex}.mp4`;hero.poster=assets+`film-${heroIndex}.jpg`;$('.hero-poster').src=hero.poster;$('.hero-count').textContent=`0${heroIndex+1} / 04`;if(!heroPaused)hero.play().catch(()=>{heroPaused=true;syncHeroButton()});syncHeroButton()}
hero.addEventListener('playing',()=>hero.classList.add('is-playing'));
$('#hero-next').addEventListener('click',()=>heroFilm(heroIndex+1));$('#hero-prev').addEventListener('click',()=>heroFilm(heroIndex-1));
toggle?.addEventListener('click',()=>{heroPaused=!heroPaused;if(heroPaused)hero.pause();else if(!hero.getAttribute('src'))heroFilm(heroIndex);else hero.play().catch(()=>{heroPaused=true;syncHeroButton()});syncHeroButton()});
if(!reduce&&!navigator.connection?.saveData)heroFilm(0);else{heroPaused=true;syncHeroButton()}
const coast=$('#coast-video'),coastButton=$('.destination-pause');let coastPaused=reduce;
function syncCoast(){if(!coastButton)return;coastButton.textContent=coastPaused?'▶':'Ⅱ';coastButton.setAttribute('aria-label',document.body.dataset[coastPaused?'play':'pause'])}
coast.addEventListener('playing',()=>coast.classList.add('is-playing'));
coastButton?.addEventListener('click',()=>{coastPaused=!coastPaused;if(coastPaused)coast.pause();else{if(!coast.getAttribute('src'))coast.src=coast.dataset.src;coast.play().catch(()=>{coastPaused=true;syncCoast()})}syncCoast()});syncCoast();
const mediaObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{const v=entry.target;if(!entry.isIntersecting){v.pause();return}if(v===hero&&!heroPaused)hero.play().catch(()=>{});if(v===coast&&!coastPaused&&!navigator.connection?.saveData){if(!v.getAttribute('src'))v.src=v.dataset.src;v.play().catch(()=>{coastPaused=true;syncCoast()})}}),{threshold:.12});mediaObserver.observe(hero);mediaObserver.observe(coast);
const tabs=$$('[role=tab]');function selectTab(t){tabs.forEach(b=>{const yes=b===t;b.setAttribute('aria-selected',String(yes));b.tabIndex=yes?0:-1;$('#'+b.getAttribute('aria-controls')).hidden=!yes})}tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectTab(t));t.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowLeft')next=tabs[(i+1)%2];if(e.key==='Home')next=tabs[0];if(e.key==='End')next=tabs[1];if(next){e.preventDefault();selectTab(next);next.focus()}})});
const lightbox=$('#lightbox'),filmDialog=$('#film-dialog');
$$('.zoom').forEach(b=>b.addEventListener('click',()=>{const content=$('#lightbox-content');content.replaceChildren();if(b.querySelector('.plan-sheet'))content.append(b.querySelector('.plan-sheet').cloneNode(true));else{const image=document.createElement('img');image.id='lightbox-img';image.src=assets+b.dataset.image+'.webp';image.alt=b.dataset.alt;const original=b.querySelector('img');if(original){image.width=original.width;image.height=original.height}content.append(image)};$('#lightbox-caption').textContent=b.dataset.alt;lightbox.showModal();document.body.style.overflow='hidden'}));
$$('.film-card').forEach(b=>b.addEventListener('click',()=>{const v=$('video',filmDialog);hero.pause();coast.pause();v.src=assets+`film-${b.dataset.film}.mp4`;v.poster=assets+`film-${b.dataset.film}.jpg`;filmDialog.showModal();document.body.style.overflow='hidden';v.play().catch(()=>{})}));
$$('dialog').forEach(d=>{$('.dialog-close',d).addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}});d.addEventListener('close',()=>{document.body.style.overflow='';const v=$('video',d);if(v){v.pause();v.removeAttribute('src');v.load()}})});
if(!reduce){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});$$('.three-intro p,.pair article,.spaces-grid figure,.section-heading,.stats-grid>div,.steps li').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
// Official Tally embed: loads near the form and retains the direct-link fallback.
let tallyStarted=false;function loadTally(){if(tallyStarted)return;tallyStarted=true;const d=document,w='https://tally.so/widgets/embed.js',v=()=>{if(typeof Tally!=='undefined')Tally.loadEmbeds();else $$('iframe[data-tally-src]:not([src])').forEach(e=>e.src=e.dataset.tallySrc)};if(typeof Tally!=='undefined')v();else if(!d.querySelector('script[src="'+w+'"]')){const s=d.createElement('script');s.src=w;s.onload=v;s.onerror=v;d.body.appendChild(s)}}
const formObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){loadTally();formObserver.disconnect()}},{rootMargin:'900px'});formObserver.observe($('#contact'));

const navBackdrop=$('.nav-backdrop');
function syncNavBackdrop(){const open=menu.getAttribute('aria-expanded')==='true'||!langMenu.hidden;navBackdrop.hidden=!open;document.body.classList.toggle('navigation-open',open);if(!document.querySelector('dialog[open]'))document.body.style.overflow=open?'hidden':''}
navBackdrop.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');closeLanguages();syncNavBackdrop()});
if(!reduce&&!navigator.connection?.saveData){const ambientObserver=new IntersectionObserver(entries=>entries.forEach(({target:v,isIntersecting})=>{if(isIntersecting){if(!v.getAttribute('src'))v.src=v.dataset.src;v.play().then(()=>v.classList.add('is-playing')).catch(()=>{})}else v.pause()}),{threshold:.15});$$('.ambient-video').forEach(v=>ambientObserver.observe(v))}
