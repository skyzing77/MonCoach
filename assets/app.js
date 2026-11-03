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
/* Figures v2 (programmes avec "ui": 2) : poses par cibles + cinématique inverse, rendu illustré, flèche de mouvement */
const UI2=C.ui>=2&&!!window.FIG2,FIGV2=(C.ui>=2||C.fig>=2)&&!!window.FIG2,GY=91;
const lerp=(a,b,t)=>Array.isArray(a)?a.map((v,i)=>v+((b?b[i]:v)-v)*t):typeof a==='number'?a+((b==null?a:b)-a)*t:a;
function ik(o,tg,l1,l2,s){const dx=tg[0]-o[0],dy=tg[1]-o[1],b=Math.atan2(dy,dx),d=Math.min(Math.max(Math.hypot(dx,dy),Math.abs(l1-l2)+.01),l1+l2-.01),
  a=Math.acos((l1*l1+d*d-l2*l2)/(2*l1*d)),j=[o[0]+Math.cos(b-s*a)*l1,o[1]+Math.sin(b-s*a)*l1],c=Math.atan2(tg[1]-j[1],tg[0]-j[0]);return[j,[j[0]+Math.cos(c)*l2,j[1]+Math.sin(c)*l2]]}
function pose2(E,t){const A=E.a,B=E.b,P={};for(const k in A)P[k]=lerp(A[k],B[k],t);if(E.front)return P;const s=Object.assign({k1:1,k2:1,e1:-1,e2:-1},E.s),R=E.rel||[];
  const hip=P.hip,nk=P2(hip,P.tor,26),hd=P2(nk,P.tor,9),q={hip,nk,hd};
  const limb=(n,o,l1,l2,ang,tg,sg,rel)=>{if(ang){const j=P2(o,ang[0],l1);return[j,P2(j,ang[1],l2)]}const T=rel?[rel[0]+tg[0],rel[1]+tg[1]]:tg;return ik(o,T,l1,l2,sg)};
  [[1,'1'],[2,'2']].forEach(([i,n])=>{[q['k'+n],q['f'+n]]=limb(n,hip,20,20,P['l'+n],P['f'+n],s['k'+n],R.includes('f'+n)?hip:null);q['t'+n]=P2(q['f'+n],P['ft'+n]==null?0:P['ft'+n],6);
    [q['e'+n],q['h'+n]]=limb(n,nk,13,12,P['a'+n],P['h'+n],s['e'+n],R.includes('h'+n)?nk:null)});
  q.cv=P.cv||0;q.ha=P.ha;q.tor=P.tor;q.ar=P.ar;q.el=P.el;return q}
/* Rendu illustré : corps en volume, vêtements, matériel détaillé, muscles travaillés (rouge) et repères de technique (vert) */
const FEM=C.look==='f',SK={skin:'#e7b28c',skinF:'#b78061',shirt:FEM?'#25b3a6':'#5d6fe0',shirtF:FEM?'#1b7f76':'#3d4ca6',short:FEM?'#3b2f4d':'#2a2f45',shortF:FEM?'#2a2238':'#1c2031',shoe:'#eef0f8',shoeF:'#9ea5c2',sole:'#4a5070',hair:FEM?'#5b3420':'#3b2a1f',mus:FEM?'#ffd23f':'#ff6a55',cue:'#7dffb0',pad:'#454d6c',padTop:'#6a7396',metal:'#9aa3c2',plate:'#2b3045'};
const V=(a,b)=>[b[0]-a[0],b[1]-a[1]],U=v=>{const l=Math.hypot(v[0],v[1])||1;return[v[0]/l,v[1]/l]},NR=u=>[-u[1],u[0]],AD=(p,v,k)=>[p[0]+v[0]*k,p[1]+v[1]*k],LP=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
function taper(a,b,wa,wb,fill,x){const n=NR(U(V(a,b))),p1=AD(a,n,wa/2),p2=AD(b,n,wb/2),p3=AD(b,n,-wb/2),p4=AD(a,n,-wa/2);
  return `<path d="M${pt(p1)}L${pt(p2)}A${f1(wb/2)} ${f1(wb/2)} 0 0 0 ${pt(p3)}L${pt(p4)}A${f1(wa/2)} ${f1(wa/2)} 0 0 0 ${pt(p1)}Z" fill="${fill}"${x?' '+x:''}/>`}
const circ3=(c,r,fill,x)=>`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(r)}" fill="${fill}"${x?' '+x:''}/>`;
function torso3(q){const u=U(V(q.hip,q.nk)),n=NR(u),P=(t,o)=>AD(AD(q.hip,u,26*t),n,o+(q.cv||0)*1.5*Math.sin(Math.PI*Math.max(0,Math.min(1,t))));
  const pts=FEM?[P(-.02,-5),P(.4,-3.3),P(.72,-3.9),P(.97,-2.6),P(1,2.1),P(.8,5.4),P(.66,4.4),P(.48,3.2),P(.22,3.9),P(.03,5.1)]:[P(-.02,-4.7),P(.35,-3.9),P(.7,-4.5),P(.97,-3),P(1,2.4),P(.8,5.3),P(.6,4.4),P(.35,4.1),P(.05,4.9)];
  return `<path d="M${pts.map(pt).join('L')}Z" fill="${SK.shirt}" stroke="${SK.shirt}" stroke-width="2.4" stroke-linejoin="round"/>`}
function shoe3(f,t,far){const d=U(V(f,t)),dn=NR(d),h=AD(f,d,-2),toe=AD(f,d,6.6);
  return taper(AD(h,dn,.7),AD(toe,dn,.9),4.2,2.8,far?SK.shoeF:SK.shoe)+taper(AD(h,dn,2.2),AD(toe,dn,2),1.4,1.2,SK.sole)}
function leg3(q,i,far){const H=q.hip,K=q['k'+i],F=q['f'+i],sk=far?SK.skinF:SK.skin;
  const pa=far?SK.shortF:SK.short;if(FEM)return taper(K,F,4.8,3.2,sk)+taper(K,LP(K,F,.86),5.2,3.7,pa)+taper(LP(K,F,.12),LP(K,F,.55),5.4,4.4,pa)+taper(H,K,8,5.4,pa)+shoe3(F,q['t'+i],far);
  return taper(K,F,5.2,3.4,sk)+taper(LP(K,F,.12),LP(K,F,.55),5.6,4.6,sk)+taper(H,K,7.6,5.2,sk)+taper(H,LP(H,K,.5),9.2,7.8,pa)+shoe3(F,q['t'+i],far)}
function arm3(q,i,far){const S=q.nk,E=q['e'+i],Hd=q['h'+i],sk=far?SK.skinF:SK.skin;
  return taper(S,E,FEM?4.2:4.6,3.4,sk)+taper(E,Hd,FEM?3.3:3.6,2.6,sk)+circ3(Hd,2.1,sk)+(FEM?circ3(S,2.9,far?SK.shirtF:SK.shirt):taper(S,LP(S,E,.5),5.8,5,far?SK.shirtF:SK.shirt))}
function head3(q){const u=q.ha!=null?[Math.cos(q.ha*DG),Math.sin(q.ha*DG)]:U(V(q.hip,q.nk)),n=NR(u),c=AD(q.nk,u,8);
  return taper(q.nk,AD(q.nk,u,4.5),3.8,3.6,SK.skin)+(FEM?taper(AD(AD(c,n,-4.6),u,1.6),AD(AD(c,n,-8.6),u,-5),3.8,2,SK.hair)+circ3(AD(AD(c,n,-4.4),u,1.8),1.6,SK.shirt):'')+circ3(AD(AD(c,n,-.9),u,.7),FEM?6.3:6,SK.hair)+circ3(AD(AD(c,n,.7),u,-.5),5.3,SK.skin)+
    `<path d="M${pt(AD(AD(c,n,5.6),u,.6))}L${pt(AD(AD(c,n,7.1),u,-.6))}L${pt(AD(AD(c,n,5.6),u,-1.4))}Z" fill="${SK.skin}"/>`+circ3(AD(c,n,-.4),1.3,SK.skinF)+circ3(AD(AD(c,n,3.3),u,1.4),.65,'#1d1a22')}
function db3(h,e,op){const d=U(V(e,h)),p=NR(d),pl=c=>taper(AD(c,d,-1.3),AD(c,d,1.3),6.2,6.2,SK.plate,`stroke="${SK.metal}" stroke-width=".6"`);
  return `<g opacity="${op}">${taper(AD(h,p,-4.4),AD(h,p,4.4),1.5,1.5,SK.metal)}${pl(AD(h,p,-3.6))}${pl(AD(h,p,3.6))}</g>`}
function props3(L){const leg=(x,y)=>`<rect x="${x-1}" y="${y}" width="2" height="${GY-y}" fill="${SK.metal}"/><rect x="${x-4}" y="${GY-1.6}" width="8" height="1.6" rx=".8" fill="${SK.metal}"/>`,
    pad=(a,b)=>{const n=NR(U(V(a,b)));return taper(a,b,5.4,5.4,SK.pad)+taper(AD(a,n,-1.9),AD(b,n,-1.9),1.2,1.2,SK.padTop)};
  return (L||[]).map(p=>p.t==='bench'?(p.legs||[]).map(x=>leg(x,p.y)).join('')+pad([p.x1+2.4,p.y],[p.x2-2.4,p.y])
    :p.t==='incl'?(p.legs||[]).map(x=>leg(x,p.p[1][1])).join('')+pad(p.p[0],p.p[1])+pad(p.p[1],p.p[2])
    :p.t==='back'?pad([p.x,p.y1+2],[p.x,p.y2-2])
    :p.t==='pole'?`<rect x="${p.x-2}" y="${p.y1}" width="4" height="${GY-p.y1}" fill="#20242f" stroke="#3a4056" stroke-width=".6"/>`
    :p.t==='mat'?`<rect x="${p.x1}" y="${GY-1.8}" width="${p.x2-p.x1}" height="1.8" rx=".9" fill="#3d6b5a"/>`:'').join('')}
/* muscles : [segment, face, début, fin] ; segments thigh/shin/uarm/farm + 1|2, ou torso ; face front|back */
function mus3(q,M){return (M||[]).map(([seg,side,a,b])=>{const i=seg.slice(-1),P=seg==='torso'?[q.hip,q.nk]:seg.startsWith('thigh')?[q.hip,q['k'+i]]:seg.startsWith('shin')?[q['k'+i],q['f'+i]]:seg.startsWith('uarm')?[q.nk,q['e'+i]]:[q['e'+i],q['h'+i]];
  const n=NR(U(V(P[0],P[1]))),sg=(side==='front'?-1:1)*(seg==='torso'?-1:1),w=seg==='torso'?[5,4,3.4]:seg.startsWith('thigh')?[4,2.6,1.6]:seg.startsWith('shin')?[3,2,1.4]:[2.6,2,.9];
  return taper(AD(LP(P[0],P[1],a),n,sg*w[2]),AD(LP(P[0],P[1],b),n,sg*w[2]),w[0],w[1],SK.mus,'opacity=".85"')}).join('')}
/* repères : vert = verticale d'un point jusqu'au sol ; line = ligne entre deux points (décalée de off) */
function cue3(q,L,on){if(!L||on<=0)return'';const lab=(p,t,an)=>`<text x="${f1(p[0])}" y="${f1(p[1])}" font-size="5" font-weight="700" fill="#fff" text-anchor="${an||'middle'}" paint-order="stroke" stroke="#0d1020" stroke-width="1.6">${esc(t)}</text>`,
    ln=(a,b)=>`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${SK.cue}" stroke-width=".9" stroke-dasharray="2 1.6"/>`;
  return `<g opacity="${on.toFixed(2)}">`+L.map(c=>{if(c.t==='vert'){const k=q[c.p];return ln(k,[k[0],GY])+lab([k[0]+(c.dx==null?-2.5:c.dx),(k[1]+GY)/2+1.5+(c.dy||0)],c.l,c.an||'end')}
    const u=U(V(q[c.a],q[c.b])),o=NR(u),a=AD(q[c.a],o,c.off||0),b=AD(q[c.b],o,c.off||0),e=AD(b,u,c.ext==null?4:c.ext);return ln(AD(a,u,-(c.pre||0)),e)+lab([e[0]+(c.dx||0),e[1]+(c.dy==null?-2:c.dy)],c.l,c.an)}).join('')+'</g>'}
/* vue de face (élévations latérales, jumping jacks, cercles de bras) : ar = écart des bras, el = flexion du coude, lg = écart des jambes */
function front3(E,q){const sh=25,hy=50,lg=(q.lg||3)*DG,out=[];
  [-1,1].forEach(sg=>{const H=[50+sg*4.5,hy],F=[H[0]+sg*Math.sin(lg)*38,hy+Math.cos(lg)*38],K=LP(H,F,.5);
    out.push(FEM?taper(K,F,5.2,3.4,SK.skin)+taper(K,LP(K,F,.86),5.4,3.8,SK.short)+taper(H,K,8.4,5.6,SK.short)+`<ellipse cx="${f1(F[0]+sg*1.2)}" cy="${f1(F[1]+1.4)}" rx="3.6" ry="2.1" fill="${SK.shoe}"/>`:taper(K,F,5.6,3.6,SK.skin)+taper(H,K,8,5.8,SK.skin)+taper(H,LP(H,K,.45),10,9,SK.short)+`<ellipse cx="${f1(F[0]+sg*1.2)}" cy="${f1(F[1]+1.4)}" rx="3.6" ry="2.1" fill="${SK.shoe}"/>`)});
  let h=(FEM?`<rect x="43" y="${sh-16}" width="14" height="17" rx="6" fill="${SK.hair}"/>`:'')+out.join('')+`<path d="${FEM?`M41,${sh-1}L59,${sh-1}L58.5,${sh+9}L56,${sh+15}L57.5,${hy+1}L42.5,${hy+1}L44,${sh+15}L41.5,${sh+9}Z`:`M39,${sh-1}L61,${sh-1}L60.5,${sh+8}L57,${hy+1}L43,${hy+1}L39.5,${sh+8}Z`}" fill="${SK.shirt}" stroke="${SK.shirt}" stroke-width="2.4" stroke-linejoin="round"/>`+
    `<rect x="47.6" y="${sh-6}" width="4.8" height="6" fill="${SK.skin}"/>`+circ3([44.5,sh-11.5],1.3,SK.skinF)+circ3([55.5,sh-11.5],1.3,SK.skinF)+circ3([50,sh-12.6],6.3,SK.hair)+circ3([50,sh-11.4],5.5,SK.skin)+circ3([47.9,sh-11.8],.65,'#1d1a22')+circ3([52.1,sh-11.8],.65,'#1d1a22');
  [-1,1].forEach(sg=>{const S=[50+sg*(FEM?8.8:10.5),sh+1.5],a=q.ar*DG,b=(q.ar+q.el)*DG,El=[S[0]+sg*Math.sin(a)*13,S[1]+Math.cos(a)*13],Hd=[El[0]+sg*Math.sin(b)*12,El[1]+Math.cos(b)*12];
    h+=taper(S,El,FEM?4.3:4.8,3.5,SK.skin)+taper(El,Hd,FEM?3.4:3.8,2.7,SK.skin)+circ3(Hd,2.1,SK.skin)+(FEM?'':taper(S,LP(S,El,.45),6,5.4,SK.shirt))+(E.delt?circ3(S,3.2,SK.mus,'opacity=".85"'):'')+(E.db?db3(Hd,El,1):'')});
  return h}
function arrow2(E,t,dir){if(!E.trk||E.static||E.front)return'';const A=pose2(E,0)[E.trk],B=pose2(E,1)[E.trk];if(!A||!B)return'';const [p,r]=dir>0?[A,B]:[B,A],dx=r[0]-p[0],dy=r[1]-p[1],L=Math.hypot(dx,dy);if(L<4)return'';
  const u=[dx/L,dy/L],o=E.ao||[u[1]*-8,u[0]*8],s=[p[0]+o[0]+u[0]*2,p[1]+o[1]+u[1]*2],e=[r[0]+o[0]-u[0]*2,r[1]+o[1]-u[1]*2],w=[e[0]-u[0]*4.5-u[1]*3,e[1]-u[1]*4.5+u[0]*3],w2=[e[0]-u[0]*4.5+u[1]*3,e[1]-u[1]*4.5-u[0]*3];
  return `<g stroke="var(--acc)" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85"><line x1="${f1(s[0])}" y1="${f1(s[1])}" x2="${f1(e[0])}" y2="${f1(e[1])}" stroke-dasharray="2.5 2.5"/><polyline points="${pt(w)} ${pt(e)} ${pt(w2)}"/></g>`}
function drawFig2(svg,E,t,lab,cap,dir){const z=E.z;let sc;
  if(E.front)sc=front3(E,pose2(E,t));
  else{const q=pose2(E,t),fx=(q.f1[0]+q.f2[0])/2;sc=`<ellipse cx="${f1(fx)}" cy="${GY+.6}" rx="18" ry="1.6" fill="#000" opacity=".3"/>`+props3(E.props)+leg3(q,2,1)+arm3(q,2,1)+(E.db>1?db3(q.h2,q.e2,.85):'')+torso3(q)+leg3(q,1,0)+mus3(q,E.mus)+head3(q)+arm3(q,1,0)+(E.db?db3(q.h1,q.e1,1):'')+
    (cap?cue3(q,E.cues,E.static?1:Math.max(0,(t-.7)/.3)):'')+(dir?arrow2(E,t,dir):'')}
  svg.innerHTML=`<rect x="0" y="${GY}" width="100" height="9" fill="rgba(0,0,0,.22)"/><line x1="0" y1="${GY}" x2="100" y2="${GY}" stroke="var(--line)" stroke-width=".8"/>`+(z?`<g transform="translate(50 ${GY}) scale(${z}) translate(-50 -${GY})">${sc}</g>`:sc)+(lab?`<text x="50" y="98.3" text-anchor="middle" font-size="5.6" font-weight="700" fill="var(--acc)">${esc(lab)}</text>`:'')}
function drawFig(svg,ph){const k=svg.dataset.k,F=FIGV2&&window.FIG2[k];if(F){const st=svg.dataset.t;if(st!=null)return drawFig2(svg,F,+st,'',svg.dataset.cue==='1',0);
    const c=ph%1,cap=svg.dataset.cap;let t,lab,dir=0;if(F.static){t=.5+.5*Math.sin(c*2*Math.PI);lab=F.ph[0]}
    else if(c<.12){t=0;lab='Départ'}else if(c<.5){t=ease((c-.12)/.38);lab=F.ph[0];dir=1}else if(c<.62){t=1;lab='Pause'}else{t=1-ease((c-.62)/.38);lab=F.ph[1];dir=-1}
    return drawFig2(svg,F,t,cap?lab:'',cap,cap?dir:0)}
  const E=LIB[k];if(!E)return;const c=ph%1,cap=svg.dataset.cap;let t,lab;
  if(c<.12){t=0;lab='Départ'}else if(c<.5){t=ease((c-.12)/.38);lab=E.ph[0]}else if(c<.62){t=1;lab='Pause'}else{t=1-ease((c-.62)/.38);lab=E.ph[1]}
  if(E.orb)lab=E.ph[0];
  const p=mix(E,t),g=E.front?frontFig(E,p,ph):(cap?sideFig(E,E.a,.13)+sideFig(E,E.b,.13):'')+sideFig(E,p,1);
  const sc=`<g stroke="var(--line)" stroke-width="6" stroke-linecap="round">${(E.bench||[]).map(l=>`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}"/>`).join('')}</g>${g}`;
  svg.innerHTML=`<line x1="4" y1="89" x2="96" y2="89" stroke="var(--line)" stroke-width="2" stroke-linecap="round"/>`+(E.z?`<g transform="translate(50 89) scale(${E.z}) translate(-50 -89)">${sc}</g>`:sc)+(cap?`<text x="50" y="98" text-anchor="middle" font-size="6.5" font-weight="700" fill="var(--acc)">${esc(lab)}</text>`:'')}
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;let lt=0;
function paint(){document.querySelectorAll('.fig').forEach(s=>drawFig(s,s.dataset.cap?0:.3))}
function loop(ts){if(ts-lt>33){lt=ts;const f=document.querySelectorAll('.fig[data-cap]');if(f.length){const ph=(ts%CYC)/CYC;f.forEach(s=>{try{drawFig(s,ph)}catch(e){}})}}requestAnimationFrame(loop)} /* une figure en erreur ne doit pas figer les autres */

const KEY='sport:'+C.key,circ=C.mode==='circuit',$=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const DATE_RE=/^\d{4}-\d\d-\d\d$/;
const cap1=s=>s.charAt(0).toUpperCase()+s.slice(1);
const nz=v=>{const x=parseFloat(String(v).replace(',','.'));return isNaN(x)?0:x};
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'),today=()=>ymd(new Date());
const fmt=d=>new Date(d+'T12:00').toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'}),mmss=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const figT=(k,t,c)=>`<svg class="fig" viewBox="0 0 100 100" data-k="${k}" data-t="${t}"${c?' data-cue="1"':''} aria-hidden="true"></svg>`;
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
  let h=UI2?'':vWeek();
  if(C.seances.length>1)h+='<div class="seg">'+C.seances.map(s=>`<button data-a="sid" data-v="${s.id}" class="${s.id===S.cur?'on':''}">${esc(UI2&&s.tab||s.short)}</button>`).join('')+'</div>'+nextHint();
  h+=`<section class="hero"><span class="initial" aria-hidden="true">${esc(C.key[0].toUpperCase())}</span><h2>${esc(se.title)}</h2><p class="mute">${esc(se.sub)}</p><div class="chips"><span class="chip"><b>${n}</b> exercices</span><span class="chip"><b>${tot}</b> ${circ?'passages':'séries'}</span><span class="chip">≈ <b>${est}</b> min</span></div><button class="btn" data-a="run">Commencer la séance guidée</button></section>`+(UI2?vWeek():'');
  h+=`<div class="fields"><label>Date<input type="date" data-f="date" value="${esc(d.date)}"></label>`+(circ?`<label>Nombre de séries<select data-f="tours">${[2,3].map(k=>`<option ${k===d.tours?'selected':''}>${k}</option>`).join('')}</select></label>`:'')+'</div>';
  const W=se.warm;h+=`<details class="card"><summary><b>Échauffement · ${W.min} min · ${W.steps.length} exercices</b></summary>${W.steps.map(w=>`<div class="nx" style="margin:10px 0"><div class="th">${figEl(w.k)}</div><div><b>${esc(w.n)}</b> · ${esc(w.dose)}<div class="mute">${esc(w.how)}</div></div></div>`).join('')}</details>`;
  h+=`<h3 style="margin:20px 0 4px">Exercices</h3><p class="mute">${circ?'Remplis après chaque passage, ou lance la séance guidée.':'Ouvre un exercice pour saisir tes séries : le repos démarre quand tu coches.'}</p>`;
  h+=se.exos.map((ex,x)=>{const k=nSets(ex);let r='';for(let i=0;i<k;i++){const s=getSet(x,i);r+=`<div class="set ${s.d?'done':''}"><span class="no">${i+1}</span><input inputmode="decimal" aria-label="${esc(ex.n)} · reps ou durée, série ${i+1}" placeholder="${circ?'reps / s':ex.hold||ex.reps.includes(' s')?'durée (s)':'reps'}" data-x="${x}" data-i="${i}" data-f="r" value="${esc(s.r)}">${UI2&&ex.noLoad?'<span></span>':`<input inputmode="decimal" aria-label="${esc(ex.n)} · charge en kg, série ${i+1}" placeholder="kg" data-x="${x}" data-i="${i}" data-f="k" value="${esc(s.k)}">`}<button data-a="chk" data-x="${x}" data-i="${i}" aria-label="${esc(ex.n)} · valider la série ${i+1}" aria-pressed="${s.d}">✓</button></div>`}
    return `<details class="card"><summary><div class="th">${figEl(ex.k)}</div><div class="grow"><h3>${esc(UI2?dn(ex):ex.n)}</h3><div class="mute">${circ?esc(ex.note):k+' × '+esc(ex.hold?ex.hold[0]+'-'+ex.hold[1]+' s':ex.reps)+' · repos '+esc(ex.rest)}</div><div class="prog" data-p="${x}">${countDone(x,k)}/${k} faites</div></div></summary>${hint(ex)}<button class="btn ghost" data-a="info" data-x="${x}">Voir la technique</button>${r}</details>`}).join('');
  if(C.finisher)h+=`<details class="card"><summary><b>Finisher (optionnel)</b></summary><p>${esc(C.finisher)}</p></details>`;
  return h+`<label style="margin-top:14px">Notes<textarea rows="2" data-f="note" placeholder="Sensations, douleurs, ajustements…">${esc(d.note)}</textarea></label><button class="btn" data-a="finish">Terminer et enregistrer la séance</button><button class="btn ghost" data-a="reset">Vider la saisie en cours</button>`}
/* ui 2 : historique visuel, une pastille par série */
const exOf=n=>{for(const se of C.seances){const e=se.exos.find(z=>z.n===n);if(e)return e}return null};
/* nom affiché : nom court du programme ("s") sinon le nom sans sa précision entre parenthèses */
const dn=ex=>ex.s||ex.n.split(' (')[0];
function hRows(x){const ns=x.rows.reduce((a,r)=>a+r.sets.length,0);
  return `<div class="hsum"><div><b>${ns}</b><span>séries</span></div><div><b>${+x.dur?Math.round(+x.dur):'–'}</b><span>minutes</span></div><div><b>${+x.vol?Math.round(+x.vol):'–'}</b><span>kg soulevés</span></div></div>`+x.rows.map(r=>{const e=exOf(r.ex),sec=e&&e.hold||/s$/.test(r.ex)||/planche|gainage/i.test(r.ex),best=Math.max(0,...r.sets.map(z=>nz(z.r)*(nz(z.k)||1)));
    return `<div class="hx"><div class="hxh">${e?`<div class="th">${figT(e.k,1)}</div>`:''}<div><b>${esc(e?dn(e):r.ex.split(' (')[0])}</b>${e&&(e.hold||e.reps)?`<div class="mute">${esc(e.hold?e.hold[0]+'-'+e.hold[1]+' s':e.reps)}</div>`:''}</div></div><div class="hxs">${r.sets.map((z,i)=>{const has=z.r!==''&&z.r!=null,kg=z.k!==''&&z.k!=null&&nz(z.k)>0,top=has&&r.sets.length>1&&nz(z.r)*(nz(z.k)||1)===best&&best>0;
      return `<div class="sc${has?'':' em'}${top?' top':''}"><i>S${i+1}</i><b>${has?esc(z.r):'&nbsp;'}</b><small>${has?(sec?'s':'reps'):'&nbsp;'}</small>${kg?`<em>${esc(z.k)} kg</em>`:''}</div>`}).join('')}</div></div>`}).join('')}
/* ui 2 : courbe de progression par exercice (charge max, sinon durée ou reps max) sur les 12 dernières séances */
function vProgress(H){const seen=new Set(),out=[];C.seances.forEach(se=>se.exos.forEach(e=>{if(seen.has(e.n))return;seen.add(e.n);
    const pts=H.slice().reverse().map(h=>{const r=h.rows.find(z=>z.ex===e.n);return r?bestOf(r,e):null}).filter(Boolean);if(pts.length<2)return;const u=pts[pts.length-1].u,P=pts.filter(z=>z.u===u).slice(-12);if(P.length<2)return;
    const v=P.map(z=>z.v),lo=Math.min(...v),hi=Math.max(...v),sp=hi-lo||1,X=i=>4+i*112/(P.length-1),Y=x=>30-(x-lo)/sp*24,d=v[v.length-1]-v[0];
    out.push(`<div class="pg"><div class="th">${figT(e.k,1)}</div><div class="grow"><b>${esc(dn(e))}</b><div class="mute">${v[0]} → <b>${v[v.length-1]} ${u}</b> <span class="${d>0?'up':d<0?'down':''}">${d>0?'▲ +'+d:d<0?'▼ '+d:'='}</span></div></div><svg viewBox="0 0 120 34" class="spark" aria-hidden="true"><polyline points="${v.map((x,i)=>f1(X(i))+','+f1(Y(x))).join(' ')}"/>${circ3([X(v.length-1),Y(v[v.length-1])],2.6,'var(--acc)')}</svg></div>`)}));
  return out.length?`<h3 style="margin:18px 0 6px">Progression</h3><div class="card">${out.join('')}</div>`:`<p class="mute" style="margin:14px 0">Les courbes de progression apparaîtront après 2 séances.</p>`}
function vHisto(){const H=hist(),unsaved=S.history.length-(S.expN||0);
  if(!H.length)return '<p class="mute" style="padding:24px 0">Aucune séance enregistrée pour l’instant. Termine une séance pour la retrouver ici.</p>';
  const mo=H.filter(h=>h.date.startsWith(today().slice(0,7))).length,rec={};
  H.forEach(x=>x.rows.forEach(r=>r.sets.forEach(s=>{const k=nz(s.k);if(k>(rec[r.ex]||0))rec[r.ex]=k})));
  let h=((unsaved>=3||(unsaved>0&&daysSinceExp()>=21))?`<div class="card"><b>Pense à sauvegarder</b><p class="mute">${unsaved} séance${unsaved>1?'s ne sont':' n’est'} pas encore dans un fichier${S.exp?' (dernière sauvegarde il y a '+daysSinceExp()+' jours)':''}. Sans sauvegarde, l’historique peut être perdu si le navigateur efface ses données.</p><button class="btn ghost" data-a="go">Ouvrir la sauvegarde</button></div>`:'')+`<div class="tiles"><div><b>${H.length}</b><span class="mute">séances</span></div><div><b>${mo}</b><span class="mute">ce mois-ci</span></div><div><b>${weekStats().streak}</b><span class="mute">sem. de suite</span></div></div>${UI2?vProgress(H):''}<h3>Séances</h3>`;
  h+=H.map(x=>`<details class="card"><summary><div class="grow">${esc(fmt(x.date))} · ${esc(x.short||x.title)} <span class="mute">${+x.vol?'· '+Math.round(+x.vol)+' kg':''}${+x.dur?' · '+Math.round(+x.dur)+' min':''}</span></div></summary>${UI2?hRows(x):x.rows.map(r=>`<p><b>${esc(r.ex)}</b><br><span class="mute">${r.sets.map(s=>esc(s.r||'–')+(s.k!==''&&s.k!=null?' × '+esc(s.k)+' kg':'')).join(' · ')}</span></p>`).join('')}${x.note?`<p class="mute">Note : ${esc(x.note)}</p>`:''}<button class="btn ghost" data-a="del" data-v="${esc(x.id)}">Supprimer cette séance</button></details>`).join('');
  const rr=Object.entries(rec).filter(e=>e[1]>0);
  return h+(rr.length?'<h3 style="margin-top:20px">Records de charge</h3><div class="card">'+rr.map(([n,k])=>`<div class="lg"><span>${esc(UI2&&exOf(n)?dn(exOf(n)):n)}</span><b>${k} kg</b></div>`).join('')+'</div>':'')}
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
const rowsOf=(se,d)=>se.exos.map((ex,x)=>({ex:ex.n,sets:(d.sets[x]||[]).slice(0,nSets(ex)).filter(s=>s&&(s.r!==''||s.k!==''||s.d)).map(s=>({r:s.r,k:s.k}))})).filter(r=>r.sets.length);
/* meilleure valeur d'un exercice : charge max, sinon durée max (gainage), sinon reps max */
const bestOf=(r,e)=>{const kg=Math.max(0,...r.sets.map(z=>nz(z.k)));return kg>0?{v:kg,u:'kg'}:{v:Math.max(0,...r.sets.map(z=>nz(z.r))),u:e&&e.hold||/planche|gainage/i.test(r.ex)?'s':'reps'}};
function endSummary(se){const d=draft(),rows=rowsOf(se,d),vol=rows.reduce((a,r)=>a+r.sets.reduce((b,z)=>b+nz(z.r)*nz(z.k),0),0),m=d.t0?Math.round((Date.now()-d.t0)/60000):0,prev=hist().find(h=>h.short===se.short),ns=rows.reduce((a,r)=>a+r.sets.length,0);
  const recs=rows.map(r=>{const e=exOf(r.ex),b=bestOf(r,e);let old=0;hist().forEach(h=>h.rows.forEach(z=>{if(z.ex===r.ex){const o=bestOf(z,e);if(o.u===b.u&&o.v>old)old=o.v}}));return old>0&&b.v>old?`<li><b>${esc(e?dn(e):r.ex)}</b> : ${b.v} ${b.u} <span class="mute">(avant ${old})</span></li>`:''}).join('');
  const dv=prev&&+prev.vol&&vol?Math.round(vol-prev.vol):null,st=weekStats(),n1=st.n+(wkStart(DATE_RE.test(d.date)?d.date:today())===wkStart(today())?1:0);
  return `<div class="medal" aria-hidden="true">🏅</div><div class="big endt">Séance terminée</div><p class="mute">Bravo ! Enregistre-la pour l’ajouter à ton historique.</p><div class="hsum"><div><b>${m>0&&m<=300?m:'–'}</b><span>minutes</span></div><div><b>${ns}</b><span>${circ?'passages':'séries'}</span></div><div><b>${vol?Math.round(vol):'–'}</b><span>kg soulevés</span></div></div>`+
    (dv!=null?`<p class="delta ${dv>=0?'up':'down'}">${dv>=0?'▲ +':'▼ '}${dv} kg par rapport à la dernière ${esc(se.short.split(' · ')[0].toLowerCase())}</p>`:'')+
    (recs?`<div class="card recs"><b>🏆 Nouveaux records</b><ul>${recs}</ul></div>`:'')+
    `<div class="card"><b>Cette semaine</b><p>${n1} / ${C.goal} séance${C.goal>1?'s':''}${n1>=C.goal?' · objectif atteint 🎉':''}${st.streak?' · '+st.streak+' sem. de suite':''}</p></div>`}
/* fin de séance : pluie de confettis (2 à 3 s, puis retirée) */
function confetti(){const g=$('#guide');if(!g||g.hidden)return;const w=document.createElement('div'),col=['var(--acc)','#7dffb0','#ffd23f','#ff6a55','#ffffff','#5d9bff'];w.className='confetti';w.setAttribute('aria-hidden','true');
  for(let i=0;i<90;i++){const c=document.createElement('i'),r=Math.random;c.style.cssText=`left:${r()*100}%;background:${col[i%col.length]};width:${6+r()*6}px;height:${8+r()*8}px;animation-delay:${r()*.7}s;animation-duration:${2+r()*1.4}s;--x:${(r()-.5)*160}px;--r:${(r()-.5)*1080}deg;border-radius:${r()<.3?'50%':'2px'}`;w.appendChild(c)}
  g.appendChild(w);setTimeout(()=>w.remove(),4500)}
function finish(){const se=cur(),d=draft(),rows=rowsOf(se,d);
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
/* ui 2 : bips en mode « ambient » (se mélangent à Deezer/Spotify au lieu de les couper, iOS 17+),
   contexte audio libéré quand l'appli passe en arrière-plan et réveillé seulement au moment d'un bip */
function audio(){try{if(UI2&&navigator.audioSession&&navigator.audioSession.type!=='ambient')navigator.audioSession.type='ambient'}catch(e){}try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();ac.resume&&ac.resume()}catch(e){}}
function beep(f,d){try{if(!ac||S.mute)return;if(UI2&&ac.state!=='running'){ac.resume().then(()=>beep(f,d)).catch(()=>{});return}const o=ac.createOscillator(),v=ac.createGain(),t=ac.currentTime;o.frequency.value=f;v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(.1,t+.015);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v);v.connect(ac.destination);o.start(t);o.stop(t+d+.05)}catch(e){}}
function snd(k){if(S.mute)return;if(k==='go'){beep(660,.2);setTimeout(()=>beep(880,.3),130)}else if(k==='rest'){beep(587,.25);setTimeout(()=>beep(440,.4),150)}else if(k==='end')[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.7),i*160));else beep(880,.12);try{navigator.vibrate&&navigator.vibrate(k==='end'?[80,60,80,60,200]:40)}catch(e){}}
$('#tplus').onclick=()=>{if(T&&!T.done)T.end+=15000};$('#tx').onclick=()=>{T=null};
let opener=null,sop=null;
function setInert(){const g=!$('#guide').hidden,s=!$('#sheet').hidden;['.skip','main','nav','#tbar'].forEach(q=>{const e=$(q);if(e)e.inert=g||s});$('#guide').inert=s}
function restoreFocus(){const e=opener&&opener.isConnected?opener:$('#main');opener=null;try{e.focus({preventScroll:true})}catch(x){}}
/* séance guidée */
const defV=(ex,x,i,f)=>{const c=getSet(x,i)[f];if(c!=='')return c;if(i>0&&getSet(x,i-1)[f]!=='')return getSet(x,i-1)[f];const l=lastOf(ex.n);if(!l)return'';if(f==='r')return l.sets[i]?l.sets[i].r:'';const ks=l.sets.map(z=>z.k).filter(z=>z!==''&&z!=null);return ks.length?ks[ks.length-1]:''};
function gStart(){audio();const se=cur(),P=C.params,d=draft(),L=se.exos.length,st=[];se.warm.steps.forEach((w,j)=>{st.push({k:'warm',w:j,s:w.s||0});if(UI2&&w.rest)st.push({k:'rest',s:w.rest,warm:1})});
  if(circ){st.push({k:'ready'});for(let t=0;t<d.tours;t++)se.exos.forEach((ex,x)=>{st.push({k:'work',x,i:t,s:P.work});const last=x===L-1;if(!(last&&t===d.tours-1))st.push({k:'rest',s:last?P.restTour:P.rest})})}
  else se.exos.forEach((ex,x)=>{for(let i=0;i<ex.sets;i++){st.push({k:'set',x,i});if(!(x===L-1&&i===ex.sets-1))st.push({k:'rest',s:ex.restS})}});
  st.push({k:'end'});let i0=st.findIndex(z=>z.x!=null&&!getSet(z.x,z.i).d);if(i0<0)i0=st.length-1;else if(i0===st.findIndex(z=>z.x!=null))i0=0;
  d.t0=d.t0||Date.now();G={st,i:i0,p:0,end:0,tot:0,cnt:st.filter(z=>z.x!=null).length};T=null;opener=document.activeElement;$('#guide').hidden=false;document.body.classList.add('guided');setInert();wake();gEnter()}
function wake(){try{if(G&&!document.hidden&&navigator.wakeLock&&(!wl||wl.released))navigator.wakeLock.request('screen').then(l=>wl=l).catch(()=>{})}catch(e){}}
/* ui 2 : chrono lancé à la main (échauffement, gainage), côtés alternés, parties d'un superset */
const holdOf=s=>UI2&&s.k==='set'&&cur().exos[s.x].hold;
function partsOf(ex,i){if(ex.parts)return ex.parts;if(!ex.sides)return null;return i%2?ex.sides.slice().reverse():ex.sides}
function gEnter(){const s=G.st[G.i];G.p=0;G.pr=0;G.h0=0;G.hb=0;G.pt=0;G.sr=0;G.srp=0;G.w=UI2&&(s.k==='warm'&&s.s>0||!!holdOf(s));if(s.s){G.tot=s.s;G.end=Date.now()+s.s*1000}gDraw()}
function gGo(){G.w=0;G.pr=Date.now()+3000;gDraw()}
function gNext(){G.i++;const k=G.st[G.i].k;snd(k==='end'?'end':k==='rest'?'rest':k==='set'||k==='work'?'go':'ok');gEnter()}
function gDone(){const s=G.st[G.i],r=$('#gr'),k=$('#gk2');if(s.x!=null&&(r||G.h0)){const a=getSet(s.x,s.i);if(G.h0){const H=holdOf(s);a.r=String(Math.min(H[1],Math.floor((Date.now()-G.h0)/1000)))}else a.r=r.value;if(k)a.k=k.value;a.d=true;save()}gNext()}
function gPart(){const s=G.st[G.i],r=$('#gr'),k=$('#gk2'),a=getSet(s.x,s.i);if(r)a.r=r.value;if(k)a.k=k.value;save();G.pt++;const ex=cur().exos[s.x];if(ex.sides&&ex.sideRest){G.sr=Date.now()+ex.sideRest*1000;G.srt=ex.sideRest;snd('rest')}else snd('ok');gDraw()}
function gSrEnd(){G.sr=0;G.srp=0;snd('go');gDraw()}
const restTxt=n=>n>=60?Math.floor(n/60)+' min'+(n%60?' '+String(n%60).padStart(2,'0'):''):n+' s';
function goalOf(ex){if(ex.hold)return{big:ex.hold[0]+'–'+ex.hold[1],small:'secondes de gainage'};const m=String(ex.reps).match(/^([\d\s\-–]+)(.*)$/);return m?{big:m[1].trim().replace('-','–'),small:('reps '+m[2].trim()).trim()}:{big:esc(ex.reps),small:''}}
function gQuit(){G=null;$('#guide').hidden=true;document.body.classList.remove('guided');try{wl&&wl.release();wl=null}catch(e){}render();setInert();restoreFocus()}
function gPause(e){const b=e.target;if(G.p){G.end=Date.now()+G.p;G.p=0;b.textContent='Pause'}else{G.p=Math.max(1,G.end-Date.now());b.textContent='Reprendre'}}
const ring=(w,lab)=>`<div class="ring" style="width:${w}"><svg viewBox="0 0 120 120"><circle class="rb" cx="60" cy="60" r="54"/><circle class="rf" id="gring" cx="60" cy="60" r="54" stroke-dasharray="339.3" stroke-dashoffset="0"/></svg><div class="rn"><div><b id="gsec"></b>${lab!=null?`<span id="glab">${esc(lab)}</span>`:''}</div></div></div>`;
function gDraw(){const s=G.st[G.i],se=cur(),b=$('#gbody'),L=se.exos.length,ex=s.x!=null?se.exos[s.x]:null;
  $('#gprog i').style.width=Math.round(100*G.st.slice(0,G.i).filter(z=>z.x!=null).length/G.cnt)+'%';
  if(UI2)return gDraw2(s,se,b,L,ex);
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
/* ui 2 : écrans épurés (une info par bloc) */
function gDraw2(s,se,b,L,ex){const on=(i,f)=>{const e=$(i);if(e)e.onclick=f},clock=()=>{const d=draft();$('#gcount').textContent=se.short.split(' · ')[0]+(d.t0?' · '+mmss(Math.max(0,Math.floor((Date.now()-d.t0)/1000))):'')};clock();G.clock=clock;
  const run=G.pr||!G.w,sp=(n,d)=>`<b>${esc(n)}</b>${d?`<span>${esc(d)}</span>`:''}`,act=h=>`<div class="gact">${h}</div>`,
    stp=(id,lab,v)=>`<div class="stl"><span>${esc(lab)}</span><div class="stp"><button type="button" data-st="${id}" data-d="-1" aria-label="${esc(lab)} : moins 1">−</button><input id="${id}" inputmode="decimal" aria-label="${esc(lab)}" value="${esc(v)}"><button type="button" data-st="${id}" data-d="1" aria-label="${esc(lab)} : plus 1">+</button></div></div>`;
  if(s.k==='rest'){const nx=G.st.slice(G.i+1).find(z=>z.x!=null),ne=se.exos[nx.x],P=partsOf(ne,nx.i),kgN=ne.noLoad||ne.hold||ne.parts?'':defV(ne,nx.x,nx.i,'k'),pv=G.st.slice(0,G.i).reverse().find(z=>z.x!=null),same=pv&&pv.x===nx.x&&String(getSet(pv.x,pv.i).k)===String(kgN),
      prep=kgN!==''&&nz(kgN)>0?`<div class="prep${same?'':' chg'}"><span>${same?'Même charge':'Charge à préparer'}</span><b>${esc(kgN)} kg</b></div>`:'';
    b.innerHTML=`<div class="k">${s.warm?'Récupère avant la 1ʳᵉ série':circ&&s.s===C.params.restTour?'Repos entre les séries':'Repos'}</div>${ring('min(58vw,220px)')}<div class="k">Ensuite</div><div class="card nx"><div class="th">${figEl(ne.k)}</div><div><b>${esc(dn(ne))}</b><div class="mute">Série ${nx.i+1} sur ${nSets(ne)}${P&&ne.sides?' · commence : '+esc(P[0].n.toLowerCase()):''}</div></div></div>${prep}`+act(`<div class="gbtn"><button class="btn ghost" id="gp15" aria-label="Ajouter 15 secondes">+15 s</button><button class="btn ghost" id="gpause">Pause</button></div><button class="btn" id="gskip">Passer le repos</button>`)}
  else if(s.k==='warm'){const W=se.warm,w=W.steps[s.w],last=s.w+1>=W.steps.length;
    b.innerHTML=`<div class="k">Échauffement · ${s.w+1} / ${W.steps.length}</div><h2 class="gt">${esc(w.n)}</h2><div class="hero-fig">${figEl(w.k,1)}</div><div class="dose">${esc(w.dose)}</div><p class="how">${esc(w.how)}</p>`+
      (w.s?ring('min(40vw,150px)',G.w?'prêt quand tu veux':'')+act(G.w?`<button class="btn" id="ggo">▶ Lancer le chrono (${w.s} s)</button><button class="btn ghost" id="gok">Passer cet exercice</button>`:`<div class="gbtn"><button class="btn ghost" id="gpause"${G.pr?' disabled':''}>Pause</button><button class="btn ghost" id="gok">${last?'Terminer':'Suivant'}</button></div>`)
        :act(`<button class="btn" id="gok">${last?'Terminer l’échauffement':'Suivant'}</button>`))}
  else if(s.k==='ready'){const x0=se.exos[0];b.innerHTML=`<div class="k">Premier exercice</div><h2 class="gt">${esc(dn(x0))}</h2><div class="mute">${esc(x0.note||'')}</div><button class="hero-fig fbtn" id="ghow2" aria-label="Comment faire cet exercice">${figEl(x0.k,1)}</button><div class="duo"><div><span>Travail</span><b>${C.params.work} s</b><small>par exercice</small></div><div><span>Repos</span><b>${C.params.rest} s</b><small>entre les exercices</small></div></div><p class="how">Le chrono démarre dès que tu appuies. Enchaîne les ${L} exercices, puis ${restTxt(C.params.restTour)} de repos entre les séries.</p><button class="btn ghost" id="ghow">Comment faire cet exercice</button>`+act('<button class="btn" id="gok">▶ Lancer le circuit</button>');ex=x0}
  else if(s.k==='end'){setTimeout(confetti,150);b.innerHTML=endSummary(se)+act('<button class="btn" id="gsave">Enregistrer la séance</button><button class="btn ghost" id="gback">Revenir à la saisie</button>')}
  else{const n=nSets(ex),nm=ex.n.split(' ('),P=partsOf(ex,s.i),cp=P&&P[Math.min(G.pt,P.length-1)],g=goalOf(ex),H=ex.hold,lastS=s.x===L-1&&s.i===n-1;
    const dots=Array.from({length:n},(_,j)=>`<i class="${j<s.i?'on':j===s.i?'cur':''}"></i>`).join('');
    const parts=P?`<ol class="parts${ex.sides?'':' sup'}">${P.map((p,j)=>`<li class="${j<G.pt?'ok':j===G.pt?'on':''}"><i>${j<G.pt?'✓':j+1}</i><div>${sp(p.n,p.d)}</div></li>`).join('')}</ol>${ex.sides?`<p class="mute">${ex.sideRest?restTxt(ex.sideRest)+' pour changer de côté, puis repos.':'Enchaîne les deux côtés, puis repos.'}</p>`:''}`:'';
    if(circ){const nxr=G.st[G.i+1],last=nxr.k==='end',dots2=dots;
      b.innerHTML=`<div class="k">Exercice ${s.x+1} / ${L}</div><h2 class="gt">${esc(dn(ex))}</h2>${ex.note?`<div class="mute">${esc(ex.note)}</div>`:''}<button class="hero-fig fbtn" id="ghow2" aria-label="Comment faire cet exercice">${figEl(ex.k,1)}</button>`+
        `<div class="setl"><b>Série ${s.i+1}</b><span>/ ${n}</span><div class="dots">${dots2}</div></div><div class="duo"><div><span>Travail</span><b>${s.s} s</b><small>à ton rythme</small></div><div><span>${last?'Ensuite':'Repos ensuite'}</span><b>${last?'Fin':restTxt(nxr.s)}</b><small>${last?'de la séance':nxr.s===C.params.restTour?'fin de la série':'puis exercice suivant'}</small></div></div>`+
        ring('min(34vw,130px)')+`<div class="gin">${stp('gr','Reps / durée',defV(ex,s.x,s.i,'r'))}${stp('gk2','Charge (kg)',defV(ex,s.x,s.i,'k'))}</div><button class="btn ghost" id="ghow">Comment faire cet exercice</button>`+act('<div class="gbtn"><button class="btn ghost" id="gpause">Pause</button><button class="btn ghost" id="gskip">Passer</button></div>')}
    else{
    const inp=H?ring('min(46vw,170px)',G.w?'objectif '+H[0]+'–'+H[1]+' s':''):`<div class="gin">${stp('gr',ex.sides?'Reps par côté':'Reps faites',defV(ex,s.x,s.i,'r'))}${ex.noLoad?'':stp('gk2',ex.parts?'Charge (kg)':'Kg par haltère',defV(ex,s.x,s.i,'k'))}</div>`;
    if(G.sr){const nx=P[G.pt];b.innerHTML=`<div class="k">Exercice ${s.x+1} / ${L} · série ${s.i+1} / ${n}</div><h2 class="gt">Change de côté</h2><div class="mute">Récupère, puis enchaîne</div>${ring('min(52vw,200px)')}<div class="card nx"><div class="th">${figEl(ex.k)}</div><div><b>${esc(nx.n)}</b><div class="mute">${esc(nx.d||'')}</div></div></div><div class="gbtn"><button class="btn ghost" id="gp15" aria-label="Ajouter 15 secondes">+15 s</button><button class="btn ghost" id="gpause">Pause</button></div>`+act('<button class="btn" id="gsrx">Je suis prêt</button>')}
    else{
    const more=P&&G.pt<P.length-1,main=H?(G.w?`<button class="btn" id="ggo">▶ Lancer le chrono</button>`:`<button class="btn" id="gok"${G.pr?' disabled':''}>■ Arrêter et valider</button>`):more?`<button class="btn" id="gpt">${esc(P[G.pt].n)} : fait ✓</button>`:'<button class="btn" id="gok">Série terminée ✓</button>';
    b.innerHTML=`<div class="k">Exercice ${s.x+1} / ${L}</div><h2 class="gt">${esc(dn(ex))}</h2>${nm[1]&&!ex.s?`<div class="mute">${esc(nm[1].replace(/\)$/,''))}</div>`:''}<button class="hero-fig fbtn" id="ghow2" aria-label="Comment faire cet exercice">${figEl(cp&&cp.k||ex.k,1)}</button>`+
      `<div class="setl"><b>Série ${s.i+1}</b><span>/ ${n}</span><div class="dots">${dots}</div></div><div class="duo"><div><span>Objectif</span><b>${esc(g.big)}</b><small>${esc(g.small)}</small></div><div><span>${lastS?'Ensuite':'Repos ensuite'}</span><b>${lastS?'Fin':restTxt(ex.restS)}</b><small>${lastS?'de la séance':s.i===n-1?'puis exercice suivant':'puis série '+(s.i+2)}</small></div></div>`+
      parts+inp+'<button class="btn ghost" id="ghow">Comment faire cet exercice</button>'+act(main+(H&&G.w?'<button class="btn ghost" id="gskip">Passer cette série</button>':''))}}}
  const how=()=>{if(s.s&&!G.p&&!G.w&&!G.pr){G.p=Math.max(1,G.end-Date.now());G.auto=1;const p=$('#gpause');if(p)p.textContent='Reprendre'}openSheet(ex)};
  on('#gok',gDone);on('#gskip',gNext);on('#ggo',gGo);on('#gpt',gPart);on('#gsrx',gSrEnd);on('#gp15',()=>{if(G.sr){G.sr+=15000;G.srt+=15}else{G.end+=15000;G.tot+=15}});on('#gpause',e=>{if(!G.sr)return gPause(e);const b=e.target;if(G.srp){G.sr=Date.now()+G.srp;G.srp=0;b.textContent='Pause'}else{G.srp=Math.max(1,G.sr-Date.now());b.textContent='Reprendre'}});on('#ghow',how);on('#ghow2',how);on('#gsave',()=>{gQuit();finish()});on('#gback',gQuit);
  b.querySelectorAll('[data-st]').forEach(x=>x.onclick=()=>{const i=$('#'+x.dataset.st),v=Math.max(0,Math.round((nz(i.value)+ +x.dataset.d)*10)/10);i.value=String(v);try{navigator.vibrate&&navigator.vibrate(10)}catch(e){}});
  paint();gTick(Date.now());const hd=b.querySelector('h2,.big,.k');if(hd){hd.tabIndex=-1;hd.focus({preventScroll:true})}}
function gTick(now){const s=G.st[G.i];if(!s)return;if(UI2&&G.clock)G.clock();
  if(UI2&&G.sr){if(G.srp)return;const left=Math.max(0,Math.ceil((G.sr-now)/1000)),e=$('#gsec'),r=$('#gring');if(e){if(e.textContent!==String(left)&&left>0&&left<=3&&e.textContent!=='')snd('tick');e.textContent=left}if(r)r.style.strokeDashoffset=339.3*(1-left/G.srt);if(now>=G.sr)gSrEnd();return}
  if(UI2&&(G.pr||G.h0)){const e=$('#gsec'),l=$('#glab'),r=$('#gring');
    if(G.pr){const left=Math.max(0,Math.ceil((G.pr-now)/1000));if(e){if(e.textContent!==String(left)&&left>0)snd('tick');e.textContent=left}if(l)l.textContent='mets-toi en place';if(r)r.style.strokeDashoffset=0;
      if(now>=G.pr){G.pr=0;snd('go');if(s.k==='warm'){G.tot=s.s;G.end=now+s.s*1000}else G.h0=now;gDraw()}return}
    const H=holdOf(s),el=Math.floor((now-G.h0)/1000);if(e)e.textContent=el;if(r)r.style.strokeDashoffset=339.3*(1-Math.min(1,el/H[1]));
    if(l)l.textContent=el<H[0]?'tiens jusqu’à '+H[0]+' s':el<H[1]?'objectif atteint ! jusqu’à '+H[1]+' s si tu peux':'bravo';
    if(el>=H[0]&&!G.hb){G.hb=1;snd('rest')}if(el>=H[1])gDone();return}
  if(UI2&&G.w){const e=$('#gsec'),r=$('#gring');if(e&&!e.textContent)e.textContent=holdOf(s)?0:s.s;if(r&&holdOf(s))r.style.strokeDashoffset=339.3;return}
  if(!s.s||G.p)return;const left=Math.max(0,Math.ceil((G.end-now)/1000)),e=$('#gsec');
  if(e){if(e.textContent!==String(left)&&left>0&&left<=3&&e.textContent!=='')snd('tick');e.textContent=left;const r=$('#gring');if(r)r.style.strokeDashoffset=339.3*(1-left/G.tot)}
  if(now>=G.end){s.k==='work'?gDone():gNext()}}
$('#gq').onclick=gQuit;
function openSheet(ex){const E=LIB[ex.k],q=encodeURIComponent(ex.yt||ex.n.split(' (')[0]+' technique exercice');
  if(UI2){const li=a=>`<ol>${a.map(z=>`<li>${esc(z)}</li>`).join('')}</ol>`; /* explications seules : l'animation est déjà sur l'écran d'exercice */
    $('#sheet').innerHTML=`<button class="btn ghost" id="sx" style="margin-top:0">‹ Retour</button><h2 style="margin-top:14px">${esc(ex.n)}</h2><div class="mute">Muscles : ${esc(ex.mus||E.mus)}</div>`+
      `<h3 style="margin-top:16px">Comment faire</h3>${li(ex.steps||E.steps)}`+(ex.parts?ex.parts.map((p,j)=>p.how?`<h3 class="ph">${j+1}. ${esc(p.n)}</h3>${li(p.how)}`:'').join(''):'')+
      `<div class="card"><b>Conseil</b><p>${esc(ex.tip||E.tip)}</p></div>${ex.load?`<div class="card"><b>Charge</b><p>${esc(ex.load)}</p></div>`:''}<a class="btn ghost" style="text-align:center;text-decoration:none" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Voir des vidéos de cet exercice</a>`}
  else $('#sheet').innerHTML=`<button class="btn ghost" id="sx" style="margin-top:0">‹ Retour</button><h2 style="margin-top:14px">${esc(ex.n)}</h2><div class="mute">Muscles : ${esc(E.mus)}</div><div class="hero-fig"><svg class="fig" viewBox="0 0 100 100" data-k="${ex.k}" data-cap="1" role="img" aria-label="Illustration animée du mouvement"></svg></div><h3>Comment faire</h3><ol>${E.steps.map(z=>`<li>${esc(z)}</li>`).join('')}</ol><div class="card"><b>Conseil</b><p>${esc(E.tip)}</p></div><a class="btn ghost" style="text-align:center;text-decoration:none" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Chercher des vidéos de cet exercice</a>`;
  paint();if($('#sheet').hidden)sop=document.activeElement;$('#sheet').hidden=false;setInert();$('#sheet').scrollTop=0;try{$('#sx').focus({preventScroll:true})}catch(e){}$('#sx').onclick=closeSheet}
function closeSheet(){$('#sheet').hidden=true;setInert();if(sop&&sop.isConnected)try{sop.focus({preventScroll:true})}catch(x){}sop=null;if(G&&G.auto){G.auto=0;if(G.p){G.end=Date.now()+G.p;G.p=0}const p=$('#gpause');if(p)p.textContent='Pause'}}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#sheet').hidden)closeSheet()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){flush();if(UI2)try{ac&&ac.state==='running'&&ac.suspend()}catch(e){}}else{wake();if(!UI2)try{ac&&ac.state!=='running'&&ac.resume()}catch(e){}}});
addEventListener('pagehide',flush);
setInterval(()=>{const now=Date.now(),tb=$('#tbar');
  if(T){const left=Math.ceil((T.end-now)/1000);if(left<=0&&!T.done){T.done=true;T.hide=now+4000;snd('go')}if(T.done&&now>T.hide){T=null;tb.hidden=true}else{tb.hidden=false;$('#tl').textContent=T.l;$('#tt').textContent=T.done?'Terminé':mmss(left)}}else tb.hidden=true;
  if(G)gTick(now)},250);
$('#today').textContent=cap1(new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'}));
$('#h1').textContent=C.h1.replace('Programme sportif – ','Programme · ');document.documentElement.classList.toggle('ui2',UI2);$('#sub').textContent=C.sub;$('#year').textContent=new Date().getFullYear();
render();if(!RM||FIGV2)requestAnimationFrame(loop); /* ui 2 : les figures expliquent le mouvement, elles restent animées même en « animations réduites » */
/* Hors ligne : service worker, et demande au navigateur de ne pas effacer l'historique (localStorage) */
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persisted().then(p=>p||navigator.storage.persist()).catch(()=>{})}catch(e){}
