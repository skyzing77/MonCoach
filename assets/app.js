/* Moteur commun des programmes de sport (Axel, Coralie). Données : programmes/*.js et exercices.js */
const C=window.PROGRAMS[document.documentElement.dataset.prog],LIB=window.LIB,DG=Math.PI/180,CYC=4600;
const ease=x=>(1-Math.cos(Math.PI*x))/2,f1=n=>n.toFixed(1),pt=q=>f1(q[0])+','+f1(q[1]);
const P2=(o,a,l)=>[o[0]+Math.cos(a*DG)*l,o[1]+Math.sin(a*DG)*l];
const pl=(...q)=>'<polyline points="'+q.map(pt).join(' ')+'"/>';
const mix=(E,t)=>E.a.map((v,i)=>{const w=E.b[i];return v==null||w==null?(v==null?w:v):v+(w-v)*t});
const GA='fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.5"';
function sideFig(E,p,op){
  const hx=p[7]==null?50:p[7],hy=p[8]==null?88-20*Math.sin(p[3]*DG)-20*Math.sin(p[4]*DG):p[8],hip=[hx,hy],nk=P2(hip,p[0],26),hd=P2(nk,p[0],8);
  const e1=P2(nk,p[1],13),h1=P2(e1,p[2],12),e2=P2(nk,p[9]==null?p[1]:p[9],13),h2=P2(e2,p[10]==null?p[2]:p[10],12);
  const k1=P2(hip,p[3],20),a1=P2(k1,p[4],20),t1=P2(a1,p[4]-90+(p[11]||0),6),k2=P2(hip,p[5],20),a2=P2(k2,p[6],20),t2=P2(a2,p[6]-90+(p[12]||0),6);
  const hl=E.hl,cL=hl==='legs'?'var(--acc)':'var(--ink)',cA=hl==='arm'?'var(--acc)':'var(--ink)',cT=hl==='core'?'var(--acc)':'var(--ink)';
  return `<g opacity="${op}" ${GA}><g stroke="var(--mute)">${pl(hip,k2,a2,t2)}${pl(nk,e2,h2)}</g><g stroke="${cT}">${p[13]?'<path d="M'+pt(hip)+'Q'+pt(P2(P2(hip,p[0],13),p[0]-90,2*p[13]))+' '+pt(nk)+'"/>':pl(hip,nk)}</g><g stroke="${cL}">${pl(hip,k1,a1,t1)}</g><g stroke="${cA}">${pl(nk,e1,h1)}</g></g><circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="5.5" fill="var(--ink)" opacity="${op}"/>`+(E.db?`<circle cx="${f1(h1[0])}" cy="${f1(h1[1])}" r="3.6" fill="var(--acc)" stroke="var(--ink)" stroke-width="1" opacity="${op}"/>`:'')}
function frontFig(E,p,ph){const L=(a,l)=>[Math.sin(a*DG)*l,Math.cos(a*DG)*l],hy=88-40*Math.cos(p[2]*DG),ny=hy-26,sy=ny+3,mr=q=>[100-q[0],q[1]],O=E.orb,an=O?ph*2*Math.PI*O.n:0,o=O?[Math.cos(an)*O.r,Math.sin(an)*O.r]:[0,0];
  const s=[57,sy];let e=[s[0]+L(p[0],13)[0],s[1]+L(p[0],13)[1]];if(O&&O.j==='e')e=[e[0]+o[0],e[1]+o[1]];
  let h=[e[0]+L(p[1],12)[0],e[1]+L(p[1],12)[1]];if(O&&O.j==='h')h=[h[0]+o[0],h[1]+o[1]];
  const hp=[54,hy],f=[hp[0]+L(p[2],40)[0],hp[1]+L(p[2],40)[1]];
  return `<g ${GA}><g stroke="var(--ink)">${pl([50,hy],[50,ny])}${pl([43,sy],[57,sy])}${pl(mr(hp),[50,hy],hp)}${pl(hp,f)}${pl(mr(hp),mr(f))}</g><g stroke="var(--acc)">${pl(s,e,h)}${pl(mr(s),mr(e),mr(h))}</g></g><circle cx="50" cy="${f1(ny-8)}" r="5.5" fill="var(--ink)"/>`}
function drawFig(svg,ph){const E=LIB[svg.dataset.k];if(!E)return;const c=ph%1,cap=svg.dataset.cap;let t,lab;
  if(c<.12){t=0;lab='Départ'}else if(c<.5){t=ease((c-.12)/.38);lab=E.ph[0]}else if(c<.62){t=1;lab='Pause'}else{t=1-ease((c-.62)/.38);lab=E.ph[1]}
  if(E.orb)lab=E.ph[0];
  const p=mix(E,t),g=E.front?frontFig(E,p,ph):(cap?sideFig(E,E.a,.13)+sideFig(E,E.b,.13):'')+sideFig(E,p,1);
  const sc=`<g stroke="var(--line)" stroke-width="6" stroke-linecap="round">${(E.bench||[]).map(l=>`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}"/>`).join('')}</g>${g}`;
  svg.innerHTML=`<line x1="4" y1="89" x2="96" y2="89" stroke="var(--line)" stroke-width="2" stroke-linecap="round"/>`+(E.z?`<g transform="translate(50 89) scale(${E.z}) translate(-50 -89)">${sc}</g>`:sc)+(cap?`<text x="50" y="98" text-anchor="middle" font-size="6.5" font-weight="700" fill="var(--acc)">${esc(lab)}</text>`:'')}
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;let lt=0;
function paint(){document.querySelectorAll('.fig').forEach(s=>drawFig(s,s.dataset.cap?0:.3))}
function loop(ts){if(ts-lt>33){lt=ts;const f=document.querySelectorAll('.fig[data-cap]');if(f.length){const ph=(ts%CYC)/CYC;f.forEach(s=>drawFig(s,ph))}}requestAnimationFrame(loop)}

const KEY='sport:'+C.key,circ=C.mode==='circuit',$=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const DATE_RE=/^\d{4}-\d\d-\d\d$/;
const cap1=s=>s.charAt(0).toUpperCase()+s.slice(1);
const nz=v=>{const x=parseFloat(String(v).replace(',','.'));return isNaN(x)?0:x};
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'),today=()=>ymd(new Date());
const fmt=d=>new Date(d+'T12:00').toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'}),mmss=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const figEl=(k,c)=>`<svg class="fig" viewBox="0 0 100 100" data-k="${k}"${c?' data-cap="1"':''} aria-hidden="true"></svg>`;
/* état (même format que l'ancienne version : l'historique existant est conservé) */
let S={history:[],drafts:{},rides:[],cur:C.seances[0].id},tab='seance',tm=null;
try{const o=JSON.parse(localStorage.getItem(KEY)||'{}');if(o&&typeof o==='object')S=Object.assign(S,o)}catch(e){}
S.history=(Array.isArray(S.history)?S.history:[]).filter(h=>h&&h.date&&Array.isArray(h.rows));
S.rides=Array.isArray(S.rides)?S.rides:[];S.drafts=S.drafts&&typeof S.drafts==='object'?S.drafts:{};
const flush=()=>{clearTimeout(tm);try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}},save=()=>{clearTimeout(tm);tm=setTimeout(flush,300)};
const cur=()=>C.seances.find(s=>s.id===S.cur)||C.seances[0];
function draft(){const id=cur().id;return S.drafts[id]=S.drafts[id]||{date:today(),tours:circ?defTours():0,sets:{},note:''}}
const defTours=()=>new Set(S.history.map(h=>wkStart(h.date))).size>=2?3:C.params.tours;
const nSets=ex=>circ?draft().tours:ex.sets;
function getSet(x,i){const a=draft().sets[x]=draft().sets[x]||[];return a[i]=a[i]||{r:'',k:'',d:false}}
const hist=()=>S.history.slice().sort((a,b)=>a.date===b.date?(a.id<b.id?1:-1):(a.date<b.date?1:-1));
const lastOf=n=>{for(const h of hist()){const r=h.rows.find(x=>x.ex===n);if(r)return r}return null};
const countDone=(x,n)=>{let c=0;for(let i=0;i<n;i++)if(getSet(x,i).d)c++;return c};
function hint(ex){const l=lastOf(ex.n);if(!l)return'';const kg=Math.max(0,...l.sets.map(s=>nz(s.k)));
  const m=!circ&&ex.reps&&!/\d\s*s\b/.test(ex.reps)&&ex.reps.match(/\d+/g),top=m?+(m[1]||m[0]):0,up=top&&kg&&l.sets.length>=ex.sets&&l.sets.every(s=>nz(s.r)>=top);
  return '<p class="hint">Dernière fois : '+(kg?kg+' kg · ':'')+esc(l.sets.map(s=>s.r||'–').join(' / '))+(up?' — fourchette haute atteinte : essaie plus lourd.':'')+'</p>'}
/* semaine */
const wkStart=s=>{const x=new Date(s+'T12:00');x.setDate(x.getDate()-((x.getDay()+6)%7));return ymd(x)};
function weekStats(){const c={};S.history.forEach(h=>{const w=wkStart(h.date);c[w]=(c[w]||0)+1});const cw=wkStart(today());let streak=0,first=true,x=new Date(cw+'T12:00');
  for(let i=0;i<520;i++){if((c[ymd(x)]||0)>=C.goal)streak++;else if(!first)break;first=false;x.setDate(x.getDate()-7)}return{n:c[cw]||0,streak}}
function vWeek(){const ws=wkStart(today()),t=today(),st=weekStats(),R=S.rides.slice().sort(),l=R[R.length-1],gap=l?Math.round((new Date(t+'T12:00')-new Date(l+'T12:00'))/864e5):null;
  const cells=[...Array(7)].map((_,i)=>{const x=new Date(ws+'T12:00');x.setDate(x.getDate()+i);const d=ymd(x),s=S.history.some(h=>h.date===d),r=R.includes(d);return `<div role="img" aria-label="${x.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})} : ${s?'séance faite':r?'sortie VTT':'rien'}${d===t?' (aujourd’hui)':''}" class="${s?'s':r?'r':''} ${d===t?'t':''}">${'LMMJVSD'[i]}<b>${x.getDate()}</b></div>`}).join('');
  return `<div class="card"><div class="row"><b>Cette semaine</b><span class="mute">${st.n}/${C.goal} séance${C.goal>1?'s':''}${st.streak?' · '+st.streak+' sem. de suite':''}</span></div><div class="wk" role="group" aria-label="Semaine en cours">${cells}</div><p class="mute" style="margin-top:10px">Rempli : séance · cerclé : sortie VTT</p>${gap!=null&&gap<2?'<p class="hint">Sortie VTT récente : si les jambes sont lourdes, baisse la charge d’un cran.</p>':''}<button class="btn ghost" data-a="ride">${R.includes(t)?'Retirer la sortie VTT d’aujourd’hui':'J’ai fait du VTT aujourd’hui'}</button></div>`}
function nextHint(){const H=hist();if(!H.length)return'';const i=C.seances.findIndex(s=>s.short===H[0].short);return i<0?'':'<p class="mute">Prochaine séance conseillée : <b>'+esc(C.seances[(i+1)%C.seances.length].short)+'</b></p>'}
/* vues */
function vToday(){const se=cur(),d=draft(),n=se.exos.length;
  if(!Object.values(d.sets).some(a=>a.some(s=>s.d||s.r||s.k)))d.date=today();
  const tot=circ?n*d.tours:se.exos.reduce((a,e)=>a+e.sets,0),P=C.params,est=circ?Math.round((d.tours*n*(P.work+P.rest)+(d.tours-1)*P.restTour)/60):se.dur;
  let h=vWeek();
  if(C.seances.length>1)h+='<div class="seg">'+C.seances.map(s=>`<button data-a="sid" data-v="${s.id}" class="${s.id===S.cur?'on':''}">${esc(s.short)}</button>`).join('')+'</div>'+nextHint();
  h+=`<section class="hero"><span class="initial" aria-hidden="true">${esc(C.key[0].toUpperCase())}</span><h2>${esc(se.title)}</h2><p class="mute">${esc(se.sub)}</p><div class="chips"><span class="chip"><b>${n}</b> exercices</span><span class="chip"><b>${tot}</b> ${circ?'passages':'séries'}</span><span class="chip">≈ <b>${est}</b> min</span></div><button class="btn" data-a="run">Commencer la séance guidée</button></section>`;
  h+=`<div class="fields"><label>Date<input type="date" data-f="date" value="${esc(d.date)}"></label>`+(circ?`<label>Nombre de séries<select data-f="tours">${[2,3].map(k=>`<option ${k===d.tours?'selected':''}>${k}</option>`).join('')}</select></label>`:'')+'</div>';
  const W=se.warm;h+=`<details class="card"><summary><b>Échauffement · ${W.min} min · ${W.steps.length} exercices</b></summary>${W.steps.map(w=>`<div class="nx" style="margin:10px 0"><div class="th">${figEl(w.k)}</div><div><b>${esc(w.n)}</b> · ${esc(w.dose)}<div class="mute">${esc(w.how)}</div></div></div>`).join('')}</details>`;
  h+=`<h3 style="margin:20px 0 4px">Exercices</h3><p class="mute">${circ?'Remplis après chaque passage, ou lance la séance guidée.':'Ouvre un exercice pour saisir tes séries : le repos démarre quand tu coches.'}</p>`;
  h+=se.exos.map((ex,x)=>{const k=nSets(ex);let r='';for(let i=0;i<k;i++){const s=getSet(x,i);r+=`<div class="set ${s.d?'done':''}"><span class="no">${i+1}</span><input inputmode="decimal" aria-label="${esc(ex.n)} · reps ou durée, série ${i+1}" placeholder="${circ?'reps / s':ex.reps.includes(' s')?'durée (s)':'reps'}" data-x="${x}" data-i="${i}" data-f="r" value="${esc(s.r)}"><input inputmode="decimal" aria-label="${esc(ex.n)} · charge en kg, série ${i+1}" placeholder="kg" data-x="${x}" data-i="${i}" data-f="k" value="${esc(s.k)}"><button data-a="chk" data-x="${x}" data-i="${i}" aria-label="${esc(ex.n)} · valider la série ${i+1}" aria-pressed="${s.d}">✓</button></div>`}
    return `<details class="card"><summary><div class="th">${figEl(ex.k)}</div><div class="grow"><h3>${esc(ex.n)}</h3><div class="mute">${circ?esc(ex.note):k+' × '+esc(ex.reps)+' · repos '+esc(ex.rest)}</div><div class="prog" data-p="${x}">${countDone(x,k)}/${k} faites</div></div></summary>${hint(ex)}<button class="btn ghost" data-a="info" data-x="${x}">Voir la technique</button>${r}</details>`}).join('');
  if(C.finisher)h+=`<details class="card"><summary><b>Finisher (optionnel)</b></summary><p>${esc(C.finisher)}</p></details>`;
  return h+`<label style="margin-top:14px">Notes<textarea rows="2" data-f="note" placeholder="Sensations, douleurs, ajustements…">${esc(d.note)}</textarea></label><button class="btn" data-a="finish">Terminer et enregistrer la séance</button><button class="btn ghost" data-a="reset">Vider la saisie en cours</button>`}
function vHisto(){const H=hist(),unsaved=S.history.length-(S.expN||0);
  if(!H.length)return '<p class="mute" style="padding:24px 0">Aucune séance enregistrée pour l’instant. Termine une séance pour la retrouver ici.</p>';
  const mo=H.filter(h=>h.date.startsWith(today().slice(0,7))).length,rec={};
  H.forEach(x=>x.rows.forEach(r=>r.sets.forEach(s=>{const k=nz(s.k);if(k>(rec[r.ex]||0))rec[r.ex]=k})));
  let h=((unsaved>=3||(unsaved>0&&daysSinceExp()>=21))?`<div class="card"><b>Pense à sauvegarder</b><p class="mute">${unsaved} séance${unsaved>1?'s ne sont':' n’est'} pas encore dans un fichier${S.exp?' (dernière sauvegarde il y a '+daysSinceExp()+' jours)':''}. Sans sauvegarde, l’historique peut être perdu si le navigateur efface ses données.</p><button class="btn ghost" data-a="go">Ouvrir la sauvegarde</button></div>`:'')+`<div class="tiles"><div><b>${H.length}</b><span class="mute">séances</span></div><div><b>${mo}</b><span class="mute">ce mois-ci</span></div><div><b>${weekStats().streak}</b><span class="mute">sem. de suite</span></div></div><h3>Séances</h3>`;
  h+=H.map(x=>`<details class="card"><summary><div class="grow">${esc(fmt(x.date))} · ${esc(x.short||x.title)} <span class="mute">${+x.vol?'· '+Math.round(+x.vol)+' kg':''}${+x.dur?' · '+Math.round(+x.dur)+' min':''}</span></div></summary>${x.rows.map(r=>`<p><b>${esc(r.ex)}</b><br><span class="mute">${r.sets.map(s=>esc(s.r||'–')+(s.k!==''&&s.k!=null?' × '+esc(s.k)+' kg':'')).join(' · ')}</span></p>`).join('')}${x.note?`<p class="mute">Note : ${esc(x.note)}</p>`:''}<button class="btn ghost" data-a="del" data-v="${esc(x.id)}">Supprimer cette séance</button></details>`).join('');
  const rr=Object.entries(rec).filter(e=>e[1]>0);
  return h+(rr.length?'<h3 style="margin-top:20px">Records de charge</h3><div class="card">'+rr.map(([n,k])=>`<div class="lg"><span>${esc(n)}</span><b>${k} kg</b></div>`).join('')+'</div>':'')}
function vProg(){const n=S.history.length;return C.info.map(b=>`<h3 style="margin:20px 0 6px">${esc(b.h)}</h3><ul>${b.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`).join('')+`<h3 style="margin:24px 0 6px">Tes données</h3><p class="mute">${n} séance${n>1?'s':''} · dernière sauvegarde : ${S.exp?esc(fmt(S.exp)):'jamais'}</p><button class="btn" data-a="exp">Exporter en fichier</button><button class="btn ghost" data-a="copy">Copier les données</button><label style="margin-top:14px">Importer un fichier<input type="file" id="imp" accept=".json,application/json"></label><label style="margin-top:10px">… ou coller les données<textarea id="impt" rows="3"></textarea></label><button class="btn ghost" data-a="imptxt">Importer le texte collé</button><h3 style="margin:24px 0 6px">Réglages</h3><button class="btn ghost" data-a="mute">Son et vibrations : ${S.mute?'désactivés':'activés'}</button>`}
function render(){$('#app').innerHTML=tab==='seance'?vToday():tab==='histo'?vHisto():vProg();document.querySelectorAll('nav button').forEach(b=>{b.classList.toggle('on',b.dataset.t===tab);b.setAttribute('aria-current',b.dataset.t===tab?'page':'false')});paint()}
/* données */
const payload=()=>JSON.stringify({app:C.key,v:1,at:today(),data:S});
/* jours depuis la dernière sauvegarde (ou, à défaut, depuis la première séance enregistrée) */
const daysSinceExp=()=>{const ref=S.exp||S.history.map(h=>h.date).filter(d=>DATE_RE.test(d)).sort()[0];return ref?Math.max(0,Math.round((new Date(today()+'T12:00')-new Date(ref+'T12:00'))/864e5)):0};
function marked(){S.exp=today();S.expN=S.history.length;flush()}
function announce(t){const e=$('#sr');e.textContent='';setTimeout(()=>{e.textContent=t},50)}
function toast(t){const e=$('#toast');announce(t);e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>e.hidden=true,2800)}
function arm(b,fn,l){if(b.dataset.armed){fn();return}b.dataset.armed=1;const o=b.textContent;b.textContent=l;announce(l);setTimeout(()=>{delete b.dataset.armed;b.textContent=o},3000)}
function importText(t){try{const j=JSON.parse(t),d=j.data||j;if(j.app&&j.app!==C.key)return toast('Ces données appartiennent à un autre programme.');if(!d||!Array.isArray(d.history))return toast('Données non reconnues.');
  const ids=new Set(S.history.map(h=>String(h.id))),add=d.history.filter(h=>h&&h.id!=null&&DATE_RE.test(String(h.date))&&Array.isArray(h.rows)&&!ids.has(String(h.id))).map(h=>Object.assign({},h,{id:String(h.id),vol:+h.vol||0,dur:+h.dur||0}));
  S.history=S.history.concat(add);S.rides=[...new Set([...S.rides,...(Array.isArray(d.rides)?d.rides.filter(r=>DATE_RE.test(String(r))):[])])].sort();flush();render();toast(add.length+' séance(s) ajoutée(s).')}catch(e){toast('Données non reconnues.')}}
function finish(){const se=cur(),d=draft(),rows=se.exos.map((ex,x)=>({ex:ex.n,sets:(d.sets[x]||[]).slice(0,nSets(ex)).filter(s=>s&&(s.r!==''||s.k!==''||s.d)).map(s=>({r:s.r,k:s.k}))})).filter(r=>r.sets.length);
  if(!rows.length)return toast('Rien à enregistrer : renseigne au moins une série.');
  const vol=rows.reduce((a,r)=>a+r.sets.reduce((b,s)=>b+nz(s.r)*nz(s.k),0),0),m=d.t0?Math.round((Date.now()-d.t0)/60000):0;
  S.history.push({id:Date.now().toString(36),date:DATE_RE.test(d.date)?d.date:today(),short:se.short,title:se.title,tours:circ?d.tours:0,rows,note:d.note,vol,dur:m>0&&m<=300?m:0});
  delete S.drafts[se.id];tab='histo';flush();render();window.scrollTo(0,0);toast('Séance enregistrée.')}
const A={
  sid(b){S.cur=b.dataset.v;save();render()},
  chk(b){const x=+b.dataset.x,s=getSet(x,+b.dataset.i),ex=cur().exos[x];s.d=!s.d;b.parentElement.classList.toggle('done',s.d);b.setAttribute('aria-pressed',s.d);announce('Série '+(+b.dataset.i+1)+(s.d?' validée':' retirée'));const p=document.querySelector('[data-p="'+x+'"]'),k=nSets(ex);if(p)p.textContent=countDone(x,k)+'/'+k+' faites';save();if(s.d&&!circ&&ex.restS){audio();T={end:Date.now()+ex.restS*1000,l:'Repos · '+ex.n,done:false}}},
  run:()=>gStart(),info(b){openSheet(cur().exos[+b.dataset.x])},finish,
  ride(){const d=today();S.rides=S.rides.includes(d)?S.rides.filter(x=>x!==d):S.rides.concat(d);save();render()},
  go(){tab='prog';render();window.scrollTo(0,0)},
  mute(){S.mute=!S.mute;save();render()},
  exp(){try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([payload()],{type:'application/json'}));a.download='sport-'+C.key+'-'+today()+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000);marked();render();toast('Fichier exporté.')}catch(e){toast('Export impossible ici : utilise « Copier les données ».')}},
  copy(){try{navigator.clipboard.writeText(payload()).then(()=>{marked();render();toast('Données copiées : colle-les dans une note.')},()=>toast('Copie impossible ici.'))}catch(e){toast('Copie impossible ici.')}},
  imptxt(){importText($('#impt').value)},
  reset(b){arm(b,()=>{delete S.drafts[cur().id];flush();render()},'Confirmer : tout vider ?')},
  del(b){arm(b,()=>{S.history=S.history.filter(h=>String(h.id)!==b.dataset.v);flush();render()},'Confirmer la suppression ?')}};
$('#app').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b&&A[b.dataset.a])A[b.dataset.a](b)});
$('#app').addEventListener('input',e=>{const t=e.target,f=t.dataset.f;if(!f)return;if(t.dataset.x!==undefined)getSet(+t.dataset.x,+t.dataset.i)[f]=t.value;else{draft()[f]=f==='tours'?+t.value:t.value;if(f==='tours')render()}save()});
$('#app').addEventListener('change',e=>{if(e.target.id==='imp'){const f=e.target.files[0];if(f)f.text().then(importText)}});
document.querySelector('nav').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;tab=b.dataset.t;render();window.scrollTo(0,0);announce('Onglet '+b.lastChild.textContent)});
/* sons, minuteur */
let T=null,G=null,ac=null,wl=null;
function audio(){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();ac.resume&&ac.resume()}catch(e){}}
function beep(f,d){try{if(!ac||S.mute)return;const o=ac.createOscillator(),v=ac.createGain(),t=ac.currentTime;o.frequency.value=f;v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(.1,t+.015);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v);v.connect(ac.destination);o.start(t);o.stop(t+d+.05)}catch(e){}}
function snd(k){if(S.mute)return;if(k==='go'){beep(660,.2);setTimeout(()=>beep(880,.3),130)}else if(k==='rest'){beep(587,.25);setTimeout(()=>beep(440,.4),150)}else if(k==='end')[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.7),i*160));else beep(880,.12);try{navigator.vibrate&&navigator.vibrate(k==='end'?[80,60,80,60,200]:40)}catch(e){}}
$('#tplus').onclick=()=>{if(T&&!T.done)T.end+=15000};$('#tx').onclick=()=>{T=null};
let opener=null,sop=null;
function setInert(){const g=!$('#guide').hidden,s=!$('#sheet').hidden;['.skip','main','nav','#tbar'].forEach(q=>{const e=$(q);if(e)e.inert=g||s});$('#guide').inert=s}
function restoreFocus(){const e=opener&&opener.isConnected?opener:$('#main');opener=null;try{e.focus({preventScroll:true})}catch(x){}}
/* séance guidée */
const defV=(ex,x,i,f)=>{const c=getSet(x,i)[f];if(c!=='')return c;if(i>0&&getSet(x,i-1)[f]!=='')return getSet(x,i-1)[f];const l=lastOf(ex.n);if(!l)return'';if(f==='r')return l.sets[i]?l.sets[i].r:'';const ks=l.sets.map(z=>z.k).filter(z=>z!==''&&z!=null);return ks.length?ks[ks.length-1]:''};
function gStart(){audio();const se=cur(),P=C.params,d=draft(),L=se.exos.length,st=se.warm.steps.map((w,j)=>({k:'warm',w:j,s:w.s||0}));
  if(circ){st.push({k:'ready'});for(let t=0;t<d.tours;t++)se.exos.forEach((ex,x)=>{st.push({k:'work',x,i:t,s:P.work});const last=x===L-1;if(!(last&&t===d.tours-1))st.push({k:'rest',s:last?P.restTour:P.rest})})}
  else se.exos.forEach((ex,x)=>{for(let i=0;i<ex.sets;i++){st.push({k:'set',x,i});if(!(x===L-1&&i===ex.sets-1))st.push({k:'rest',s:ex.restS})}});
  st.push({k:'end'});let i0=st.findIndex(z=>z.x!=null&&!getSet(z.x,z.i).d);if(i0<0)i0=st.length-1;else if(i0===se.warm.steps.length+(circ?1:0))i0=0;
  d.t0=d.t0||Date.now();G={st,i:i0,p:0,end:0,tot:0,cnt:st.filter(z=>z.x!=null).length};T=null;opener=document.activeElement;$('#guide').hidden=false;document.body.classList.add('guided');setInert();wake();gEnter()}
function wake(){try{if(G&&!document.hidden&&navigator.wakeLock&&(!wl||wl.released))navigator.wakeLock.request('screen').then(l=>wl=l).catch(()=>{})}catch(e){}}
function gEnter(){const s=G.st[G.i];G.p=0;if(s.s){G.tot=s.s;G.end=Date.now()+s.s*1000}gDraw()}
function gNext(){G.i++;const k=G.st[G.i].k;snd(k==='end'?'end':k==='rest'?'rest':k==='set'||k==='work'?'go':'ok');gEnter()}
function gDone(){const s=G.st[G.i],r=$('#gr'),k=$('#gk2');if(r&&k&&s.x!=null){const a=getSet(s.x,s.i);a.r=r.value;a.k=k.value;a.d=true;save()}gNext()}
function gQuit(){G=null;$('#guide').hidden=true;document.body.classList.remove('guided');try{wl&&wl.release();wl=null}catch(e){}render();setInert();restoreFocus()}
function gPause(e){const b=e.target;if(G.p){G.end=Date.now()+G.p;G.p=0;b.textContent='Pause'}else{G.p=Math.max(1,G.end-Date.now());b.textContent='Reprendre'}}
const ring=w=>`<div class="ring" style="width:${w}"><svg viewBox="0 0 120 120"><circle class="rb" cx="60" cy="60" r="54"/><circle class="rf" id="gring" cx="60" cy="60" r="54" stroke-dasharray="339.3" stroke-dashoffset="0"/></svg><div class="rn"><b id="gsec"></b></div></div>`;
function gDraw(){const s=G.st[G.i],se=cur(),b=$('#gbody'),L=se.exos.length,ex=s.x!=null?se.exos[s.x]:null;
  $('#gprog i').style.width=Math.round(100*G.st.slice(0,G.i).filter(z=>z.x!=null).length/G.cnt)+'%';
  let rf=s;if(s.k==='rest')for(let j=G.i-1;j>=0;j--)if(G.st[j].x!=null){rf=G.st[j];break}
  $('#gcount').textContent=s.k==='warm'?'Échauffement':s.k==='ready'?'Prêt à démarrer':s.k==='end'?'Séance terminée':(s.k==='rest'?'Repos · ':'')+se.exos[rf.x].n+' · exercice '+(rf.x+1)+' sur '+L+' · série '+(rf.i+1)+' sur '+nSets(se.exos[rf.x]);
  if(s.k==='rest'){const nx=G.st.slice(G.i+1).find(z=>z.x!=null),ne=se.exos[nx.x];
    b.innerHTML=`<div class="k">Repos</div>${ring('min(60vw,230px)')}<div class="k">Ensuite</div><div class="card nx"><div class="th">${figEl(ne.k)}</div><div><b>${esc(ne.n)}</b><div class="mute">Série ${nx.i+1} sur ${nSets(ne)}${circ?'':' · objectif '+esc(ne.reps)}</div></div></div><div class="gbtn"><button class="btn ghost" id="gp15" aria-label="Ajouter 15 secondes">+15 s</button><button class="btn ghost" id="gpause">Pause</button></div><button class="btn" id="gskip">Passer le repos</button>`}
  else if(s.k==='warm'){const W=se.warm,w=W.steps[s.w];b.innerHTML=`<div class="k">Échauffement · ${s.w+1} sur ${W.steps.length}</div><div class="hero-fig">${figEl(w.k,1)}</div><div class="big">${esc(w.n)}</div><div class="big" style="color:var(--acc)">${esc(w.dose)}</div>${w.s?ring('min(46vw,180px)'):''}<p>${esc(w.how)}</p><button class="btn" id="gok">${s.w+1<W.steps.length?'Suivant':'Terminer l’échauffement'}</button>${w.s?'<button class="btn ghost" id="gpause">Pause</button>':''}`}
  else if(s.k==='ready'){const x0=se.exos[0];b.innerHTML=`<div class="k">Premier exercice</div><h2>${esc(x0.n)}</h2><div class="hero-fig">${figEl(x0.k,1)}</div><ol class="gbody-list">${LIB[x0.k].steps.map(z=>`<li>${esc(z)}</li>`).join('')}</ol><p class="mute">${esc(x0.note)} Le chrono de ${C.params.work} s démarre dès que tu appuies.</p><button class="btn" id="gok">Je suis prêt, lancer</button>`}
  else if(s.k==='end'){b.innerHTML=`<div class="big" style="margin-top:40px">Séance terminée</div><p class="mute">${G.st.filter(z=>z.x!=null&&getSet(z.x,z.i).d).length} ${circ?'exercices réalisés':'séries réalisées'} sur ${G.cnt}. Enregistre-la pour l’ajouter à ton historique.</p><button class="btn" id="gsave">Enregistrer la séance</button><button class="btn ghost" id="gback">Revenir à la saisie</button>`}
  else{const n=nSets(ex),dots=Array.from({length:n},(_,j)=>`<i class="${j<s.i?'on':''}"></i>`).join('');
    b.innerHTML=`<div class="k">Exercice ${s.x+1} sur ${L}</div><h2>${esc(ex.n)}</h2><div class="hero-fig">${figEl(ex.k,1)}</div><div class="dots">${dots}</div><div class="big">Série ${s.i+1} sur ${n}</div><div class="mute">${circ?esc(ex.note):'Objectif : '+esc(ex.reps)+' · repos '+esc(ex.rest)}</div>${circ?ring('min(40vw,150px)'):''}<div class="gin"><label>${circ?'Reps / durée':'Reps'}<input id="gr" inputmode="decimal" value="${esc(defV(ex,s.x,s.i,'r'))}"></label><label>Charge (kg)<input id="gk2" inputmode="decimal" value="${esc(defV(ex,s.x,s.i,'k'))}"></label></div>`+(circ?'<div class="gbtn"><button class="btn ghost" id="gpause">Pause</button><button class="btn ghost" id="gskip">Passer</button></div>':'<button class="btn" id="gok">Série terminée ✓</button>')+'<button class="btn ghost" id="ghow">Comment faire cet exercice</button>'}
  const on=(i,f)=>{const e=$(i);if(e)e.onclick=f};
  on('#gok',gDone);on('#gskip',gNext);on('#gp15',()=>{G.end+=15000;G.tot+=15});on('#gpause',gPause);on('#ghow',()=>{if(s.s&&!G.p){G.p=Math.max(1,G.end-Date.now());G.auto=1;const p=$('#gpause');if(p)p.textContent='Reprendre'}openSheet(ex)});on('#gsave',()=>{gQuit();finish()});on('#gback',gQuit);
  paint();gTick(Date.now());const hd=b.querySelector('h2,.big,.k');if(hd){hd.tabIndex=-1;hd.focus({preventScroll:true})}}
function gTick(now){const s=G.st[G.i];if(!s||!s.s||G.p)return;const left=Math.max(0,Math.ceil((G.end-now)/1000)),e=$('#gsec');
  if(e){if(e.textContent!==String(left)&&left>0&&left<=3&&e.textContent!=='')snd('tick');e.textContent=left;const r=$('#gring');if(r)r.style.strokeDashoffset=339.3*(1-left/G.tot)}
  if(now>=G.end){s.k==='work'?gDone():gNext()}}
$('#gq').onclick=gQuit;
function openSheet(ex){const E=LIB[ex.k],q=encodeURIComponent(ex.n.split(' (')[0]+' technique exercice');
  $('#sheet').innerHTML=`<button class="btn ghost" id="sx" style="margin-top:0">‹ Retour</button><h2 style="margin-top:14px">${esc(ex.n)}</h2><div class="mute">Muscles : ${esc(E.mus)}</div><div class="hero-fig"><svg class="fig" viewBox="0 0 100 100" data-k="${ex.k}" data-cap="1" role="img" aria-label="Illustration animée du mouvement"></svg></div><h3>Comment faire</h3><ol>${E.steps.map(z=>`<li>${esc(z)}</li>`).join('')}</ol><div class="card"><b>Conseil</b><p>${esc(E.tip)}</p></div><a class="btn ghost" style="text-align:center;text-decoration:none" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Chercher des vidéos de cet exercice</a>`;
  paint();if($('#sheet').hidden)sop=document.activeElement;$('#sheet').hidden=false;setInert();$('#sheet').scrollTop=0;try{$('#sx').focus({preventScroll:true})}catch(e){}$('#sx').onclick=closeSheet}
function closeSheet(){$('#sheet').hidden=true;setInert();if(sop&&sop.isConnected)try{sop.focus({preventScroll:true})}catch(x){}sop=null;if(G&&G.auto){G.auto=0;if(G.p){G.end=Date.now()+G.p;G.p=0}const p=$('#gpause');if(p)p.textContent='Pause'}}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#sheet').hidden)closeSheet()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)flush();else{wake();try{ac&&ac.state!=='running'&&ac.resume()}catch(e){}}});
addEventListener('pagehide',flush);
setInterval(()=>{const now=Date.now(),tb=$('#tbar');
  if(T){const left=Math.ceil((T.end-now)/1000);if(left<=0&&!T.done){T.done=true;T.hide=now+4000;snd('go')}if(T.done&&now>T.hide){T=null;tb.hidden=true}else{tb.hidden=false;$('#tl').textContent=T.l;$('#tt').textContent=T.done?'Terminé':mmss(left)}}else tb.hidden=true;
  if(G)gTick(now)},250);
$('#today').textContent=cap1(new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'}));
$('#h1').textContent=C.h1.replace('Programme sportif – ','Programme · ');$('#sub').textContent=C.sub;$('#year').textContent=new Date().getFullYear();
render();if(!RM)requestAnimationFrame(loop);
/* Hors ligne : service worker, et demande au navigateur de ne pas effacer l'historique (localStorage) */
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persisted().then(p=>p||navigator.storage.persist()).catch(()=>{})}catch(e){}
