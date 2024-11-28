import{L as u,M as B,N as _,O as z,P as V,Q as g,b as N,c as T,e as E,g as O,h as G,i as U,j,k}from"./chunk-YYGECID7.js";import{Ba as b,Nb as D,Ra as I,Ta as F,V as v,Va as P,X as C,Xa as R,Ya as w,ba as p,fa as A,gc as x,ja as S,ka as d,mb as M}from"./chunk-HTI5VKZI.js";import"./chunk-5G567QLT.js";var m=(t,e)=>{let o=p(g),r=p(u),i=localStorage.getItem("user");return new Promise(n=>{o.getAuth().onAuthStateChanged(a=>{a?(r.routerLink("/main/home"),n(!1)):n(!0)})})};var s=(t,e)=>{let o=p(g),r=p(u),i=localStorage.getItem("user");return new Promise(n=>{o.getAuth().onAuthStateChanged(a=>{if(a&&i){let l=a.uid;o.getUserType(l).then(h=>{if(!h){n(!1);return}let y=t.data?.roles;y&&!y.includes(h)?n(!1):n(!0)})}else o.signOut(),n(!1)})})};var H=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"login",loadComponent:()=>import("./chunk-ZJRE47TI.js").then(t=>t.AuthComponent),canActivate:[m]},{path:"sign-up/select",loadComponent:()=>import("./chunk-6OPBMUTG.js").then(t=>t.SelectComponent),canActivate:[m]},{path:"sign-up/specialist",loadComponent:()=>import("./chunk-TV7CFNCJ.js").then(t=>t.SignUpSpecialistComponent),canActivate:[m]},{path:"sign-up/patient",loadComponent:()=>import("./chunk-7TP27I5K.js").then(t=>t.SignUpPatientComponent),canActivate:[m]},{path:"home",loadComponent:()=>import("./chunk-VNOZH6LE.js").then(t=>t.HomeComponent)},{path:"usuarios",loadComponent:()=>import("./chunk-B35DCGTC.js").then(t=>t.UsuariosComponent),canActivate:[s],data:{role:"administrador"}},{path:"mi-perfil",loadComponent:()=>import("./chunk-WZYD3VKS.js").then(t=>t.PerfilesComponent),canActivate:[s]},{path:"mis-horarios",loadComponent:()=>import("./chunk-7ESSGYB2.js").then(t=>t.MisHorariosComponent),canActivate:[s],data:{role:"especialista"}},{path:"solicitar-turno",loadComponent:()=>import("./chunk-4EQMTQ7I.js").then(t=>t.SolicitarTurnoComponent),canActivate:[s],data:{roles:["administrador","paciente"]}},{path:"mis-turnos",loadComponent:()=>import("./chunk-WNI33BVR.js").then(t=>t.MisTurnosComponent),canActivate:[s],data:{roles:["especialista","paciente"]}},{path:"turnos",loadComponent:()=>import("./chunk-WNI33BVR.js").then(t=>t.MisTurnosComponent),canActivate:[s],data:{roles:["administrador"]}},{path:"pacientes",loadComponent:()=>import("./chunk-PUDI63DR.js").then(t=>t.PacientesComponent),canActivate:[s],data:{roles:["especialista"]}},{path:"informes",loadComponent:()=>import("./chunk-I7T3JS3D.js").then(t=>t.InformesComponent),canActivate:[s],data:{roles:["administrador"]}}];var K="@",L=(()=>{let e=class e{constructor(r,i,n,a,l){this.doc=r,this.delegate=i,this.zone=n,this.animationType=a,this.moduleImpl=l,this._rendererFactoryPromise=null,this.scheduler=p(F,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-RLOZFPRB.js")).catch(i=>{throw new v(5300,!1)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:n})=>{this._engine=i(this.animationType,this.doc,this.scheduler);let a=new n(this.delegate,this._engine,this.zone);return this.delegate=a,a})}createRenderer(r,i){let n=this.delegate.createRenderer(r,i);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let a=new f(n);return i?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(l=>{let h=l.createRenderer(r,i);a.use(h)}).catch(l=>{a.use(n)}),a}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(i){I()},e.\u0275prov=C({token:e,factory:e.\u0275fac});let t=e;return t})(),f=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let o of this.replay)o(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,o){return this.delegate.createElement(e,o)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,o){this.delegate.appendChild(e,o)}insertBefore(e,o,r,i){this.delegate.insertBefore(e,o,r,i)}removeChild(e,o,r){this.delegate.removeChild(e,o,r)}selectRootElement(e,o){return this.delegate.selectRootElement(e,o)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,o,r,i){this.delegate.setAttribute(e,o,r,i)}removeAttribute(e,o,r){this.delegate.removeAttribute(e,o,r)}addClass(e,o){this.delegate.addClass(e,o)}removeClass(e,o){this.delegate.removeClass(e,o)}setStyle(e,o,r,i){this.delegate.setStyle(e,o,r,i)}removeStyle(e,o,r){this.delegate.removeStyle(e,o,r)}setProperty(e,o,r){this.shouldReplay(o)&&this.replay.push(i=>i.setProperty(e,o,r)),this.delegate.setProperty(e,o,r)}setValue(e,o){this.delegate.setValue(e,o)}listen(e,o,r){return this.shouldReplay(o)&&this.replay.push(i=>i.listen(e,o,r)),this.delegate.listen(e,o,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(K)}};function c(t="animations"){return R("NgAsyncAnimations"),S([{provide:P,useFactory:(e,o,r)=>new L(e,o,r,t),deps:[x,N,w]},{provide:b,useValue:t==="noop"?"NoopAnimations":"BrowserAnimations"}])}var X={providers:[O(H),d(G(()=>U({projectId:"clinica-c51d7",appId:"1:1086495664476:web:4a23ab1bfc2939b6c2b999",storageBucket:"clinica-c51d7.appspot.com",apiKey:"AIzaSyBMGCeYcbOlXMxq6rKYBtcevVqGESigdPM",authDomain:"clinica-c51d7.firebaseapp.com",messagingSenderId:"1086495664476",measurementId:"G-RDSXGWGHQZ"}))),d(j(()=>k())),d(z(()=>V())),d(B(()=>_())),c(),c(),c(),c()]};var Y=(()=>{let e=class e{constructor(){this.title="Clinica"}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=A({type:e,selectors:[["app-root"]],standalone:!0,features:[D],decls:1,vars:0,template:function(i,n){i&1&&M(0,"router-outlet")},dependencies:[E]});let t=e;return t})();T(Y,X).catch(t=>console.error(t));
