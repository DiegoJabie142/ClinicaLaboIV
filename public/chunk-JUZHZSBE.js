import{D as ce,E as je,F as Se,G as L,H as Le,I as ee,J as R,K as v,Q as Fe,l as ke,o as Y,p as Q,r as re,u as Z,v as J,w as X,x as le}from"./chunk-YYGECID7.js";import{A as b,Aa as _e,Ab as De,Ba as ne,Bb as Ae,Cb as we,Eb as se,Fb as Oe,G as V,Nb as T,Pa as ve,Qa as c,R as H,Sa as be,X as D,Y as j,Ya as w,_ as m,_a as $,aa as d,ac as Ee,ba as p,db as W,ea as ae,eb as O,f as u,fa as f,g as pe,ga as S,gc as K,ha as G,hb as ye,hc as Ie,kb as E,lb as I,o as N,pa as q,pb as Ce,qa as U,qb as xe,rc as Te,sb as C,ta as y,tc as Re,va as A,w as z,wa as _,z as fe}from"./chunk-HTI5VKZI.js";import{a as g,b as ge,g as B}from"./chunk-5G567QLT.js";var Ye=new m("recaptcha-language"),Qe=new m("recaptcha-base-url"),Ze=new m("recaptcha-nonce-tag"),Je=new m("recaptcha-settings"),Xe=new m("recaptcha-v3-site-key"),et=new m("recaptcha-loader-options");function tt(a,i,l,{url:e,lang:t,nonce:o}={}){window.ng2recaptchaloaded=()=>{l(grecaptcha)};let n=document.createElement("script");n.innerHTML="";let{url:s,nonce:r}=i(new URL(e||"https://www.google.com/recaptcha/api.js"));s.searchParams.set("render",a==="explicit"?a:a.key),s.searchParams.set("onload","ng2recaptchaloaded"),s.searchParams.set("trustedtypes","true"),t&&s.searchParams.set("hl",t),n.src=s.href;let h=r||o;h&&n.setAttribute("nonce",h),n.async=!0,n.defer=!0,document.head.appendChild(n)}function it({v3SiteKey:a,onBeforeLoad:i,onLoaded:l}){let e=a?{key:a}:"explicit";Me.loadScript(e,i,l)}var Me={loadScript:tt,newLoadScript:it};function ot(a){return a.asObservable().pipe(b(i=>i!==null))}var Pe=(()=>{let i=class i{constructor(e,t,o,n,s,r){this.platformId=e,this.language=t,this.baseUrl=o,this.nonce=n,this.v3SiteKey=s,this.options=r;let h=this.init();this.ready=h?ot(h):N()}init(){if(i.ready)return i.ready;if(!Re(this.platformId))return;let e=new pe(null);return i.ready=e,Me.newLoadScript({v3SiteKey:this.v3SiteKey,onBeforeLoad:t=>{if(this.options?.onBeforeLoad)return this.options.onBeforeLoad(t);let o=new URL(this.baseUrl??t);return this.language&&o.searchParams.set("hl",this.language),{url:o,nonce:this.nonce}},onLoaded:t=>{let o=t;this.options?.onLoaded&&(o=this.options.onLoaded(t)),e.next(o)}}),e}};i.ready=null,i.\u0275fac=function(t){return new(t||i)(d(_e),d(Ye,8),d(Qe,8),d(Ze,8),d(Xe,8),d(et,8))},i.\u0275prov=D({token:i,factory:i.\u0275fac});let a=i;return a})(),at=0,Be=(()=>{let i=class i{constructor(e,t,o,n){this.elementRef=e,this.loader=t,this.zone=o,this.id=`ngrecaptcha-${at++}`,this.errorMode="default",this.resolved=new _,this.error=new _,this.errored=new _,n&&(this.siteKey=n.siteKey,this.theme=n.theme,this.type=n.type,this.size=n.size,this.badge=n.badge)}ngAfterViewInit(){this.subscription=this.loader.ready.subscribe(e=>{e!=null&&e.render instanceof Function&&(this.grecaptcha=e,this.renderRecaptcha())})}ngOnDestroy(){this.grecaptchaReset(),this.subscription&&this.subscription.unsubscribe()}execute(){this.size==="invisible"&&(this.widget!=null?this.grecaptcha.execute(this.widget):this.executeRequested=!0)}reset(){this.widget!=null&&(this.grecaptcha.getResponse(this.widget)&&this.resolved.emit(null),this.grecaptchaReset())}get __unsafe_widgetValue(){return this.widget!=null?this.grecaptcha.getResponse(this.widget):null}expired(){this.resolved.emit(null)}onError(e){this.error.emit(e),this.errored.emit(e)}captchaResponseCallback(e){this.resolved.emit(e)}grecaptchaReset(){this.widget!=null&&this.zone.runOutsideAngular(()=>this.grecaptcha.reset(this.widget))}renderRecaptcha(){let e={badge:this.badge,callback:t=>{this.zone.run(()=>this.captchaResponseCallback(t))},"expired-callback":()=>{this.zone.run(()=>this.expired())},sitekey:this.siteKey,size:this.size,tabindex:this.tabIndex,theme:this.theme,type:this.type};this.errorMode==="handled"&&(e["error-callback"]=(...t)=>{this.zone.run(()=>this.onError(t))}),this.widget=this.grecaptcha.render(this.elementRef.nativeElement,e),this.executeRequested===!0&&(this.executeRequested=!1,this.execute())}};i.\u0275fac=function(t){return new(t||i)(c(A),c(Pe),c(w),c(Je,8))},i.\u0275cmp=f({type:i,selectors:[["re-captcha"]],hostVars:1,hostBindings:function(t,o){t&2&&O("id",o.id)},inputs:{id:"id",siteKey:"siteKey",theme:"theme",type:"type",size:"size",tabIndex:"tabIndex",badge:"badge",errorMode:"errorMode"},outputs:{resolved:"resolved",error:"error",errored:"errored"},exportAs:["reCaptcha"],decls:0,vars:0,template:function(t,o){},encapsulation:2});let a=i;return a})(),nt=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=S({type:i}),i.\u0275inj=j({});let a=i;return a})(),Ne=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=S({type:i}),i.\u0275inj=j({providers:[Pe],imports:[nt]});let a=i;return a})();function ht(a,i){}var x=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.closeOnNavigation=!0,this.closeOnDestroy=!0,this.closeOnOverlayDetachments=!0}};var me=(()=>{let i=class i extends Se{constructor(e,t,o,n,s,r,h,k){super(),this._elementRef=e,this._focusTrapFactory=t,this._config=n,this._interactivityChecker=s,this._ngZone=r,this._overlayRef=h,this._focusMonitor=k,this._platform=p(ke),this._focusTrap=null,this._elementFocusedBeforeDialogWasOpened=null,this._closeInteractionType=null,this._ariaLabelledByQueue=[],this._changeDetectorRef=p(Ee),this.attachDomPortal=oe=>{this._portalOutlet.hasAttached();let Ke=this._portalOutlet.attachDomPortal(oe);return this._contentAttached(),Ke},this._document=o,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let o=()=>{e.removeEventListener("blur",o),e.removeEventListener("mousedown",o),e.removeAttribute("tabindex")};e.addEventListener("blur",o),e.addEventListener("mousedown",o)})),e.focus(t)}_focusByCssSelector(e,t){let o=this._elementRef.nativeElement.querySelector(e);o&&this._forceFocus(o,t)}_trapFocus(){let e=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||e.focus();break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElementWhenReady().then(t=>{t||this._focusDialogContainer()});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus);break}}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e=="string"?t=this._document.querySelector(e):typeof e=="boolean"?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus=="function"){let o=Y(),n=this._elementRef.nativeElement;(!o||o===this._document.body||o===n||n.contains(o))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){let e=this._elementRef.nativeElement,t=Y();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=Y()))}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}};i.\u0275fac=function(t){return new(t||i)(c(A),c(J),c(K,8),c(x),c(Z),c(w),c(R),c(X))},i.\u0275cmp=f({type:i,selectors:[["cdk-dialog-container"]],viewQuery:function(t,o){if(t&1&&De(L,7),t&2){let n;Ae(n=we())&&(o._portalOutlet=n.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(t,o){t&2&&O("id",o._config.id||null)("role",o._config.role)("aria-modal",o._config.ariaModal)("aria-labelledby",o._config.ariaLabel?null:o._ariaLabelledByQueue[0])("aria-label",o._config.ariaLabel)("aria-describedby",o._config.ariaDescribedBy||null)},standalone:!0,features:[$,T],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,o){t&1&&W(0,ht,0,0,"ng-template",0)},dependencies:[L],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2});let a=i;return a})(),F=class{constructor(i,l){this.overlayRef=i,this.config=l,this.closed=new u,this.disableClose=l.disableClose,this.backdropClick=i.backdropClick(),this.keydownEvents=i.keydownEvents(),this.outsidePointerEvents=i.outsidePointerEvents(),this.id=l.id,this.keydownEvents.subscribe(e=>{e.keyCode===27&&!this.disableClose&&!Q(e)&&(e.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=i.detachments().subscribe(()=>{l.closeOnOverlayDetachments!==!1&&this.close()})}close(i,l){if(this.containerInstance){let e=this.closed;this.containerInstance._closeInteractionType=l?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),e.next(i),e.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(i="",l=""){return this.overlayRef.updateSize({width:i,height:l}),this}addPanelClass(i){return this.overlayRef.addPanelClass(i),this}removePanelClass(i){return this.overlayRef.removePanelClass(i),this}},mt=new m("DialogScrollStrategy",{providedIn:"root",factory:()=>{let a=p(v);return()=>a.scrollStrategies.block()}}),ut=new m("DialogData"),gt=new m("DefaultDialogConfig");var pt=0,ze=(()=>{let i=class i{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}constructor(e,t,o,n,s,r){this._overlay=e,this._injector=t,this._defaultOptions=o,this._parentDialog=n,this._overlayContainer=s,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new u,this._afterOpenedAtThisLevel=new u,this._ariaHiddenElements=new Map,this.afterAllClosed=z(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(H(void 0))),this._scrollStrategy=r}open(e,t){let o=this._defaultOptions||new x;t=g(g({},o),t),t.id=t.id||`cdk-dialog-${pt++}`,t.id&&this.getDialogById(t.id);let n=this._getOverlayConfig(t),s=this._overlay.create(n),r=new F(s,t),h=this._attachContainer(s,r,t);return r.containerInstance=h,this._attachDialogContent(e,r,h,t),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(r),r.closed.subscribe(()=>this._removeOpenDialog(r,!0)),this.afterOpened.next(r),r}closeAll(){de(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){de(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),de(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new Le({positionStrategy:e.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,o){let n=o.injector||o.viewContainerRef?.injector,s=[{provide:x,useValue:o},{provide:F,useValue:t},{provide:R,useValue:e}],r;o.container?typeof o.container=="function"?r=o.container:(r=o.container.type,s.push(...o.container.providers(o))):r=me;let h=new ce(r,o.viewContainerRef,y.create({parent:n||this._injector,providers:s}),o.componentFactoryResolver);return e.attach(h).instance}_attachDialogContent(e,t,o,n){if(e instanceof be){let s=this._createInjector(n,t,o,void 0),r={$implicit:n.data,dialogRef:t};n.templateContext&&(r=g(g({},r),typeof n.templateContext=="function"?n.templateContext():n.templateContext)),o.attachTemplatePortal(new je(e,null,r,s))}else{let s=this._createInjector(n,t,o,this._injector),r=o.attachComponentPortal(new ce(e,n.viewContainerRef,s,n.componentFactoryResolver));t.componentRef=r,t.componentInstance=r.instance}}_createInjector(e,t,o,n){let s=e.injector||e.viewContainerRef?.injector,r=[{provide:ut,useValue:e.data},{provide:F,useValue:t}];return e.providers&&(typeof e.providers=="function"?r.push(...e.providers(t,e,o)):r.push(...e.providers)),e.direction&&(!s||!s.get(le,null,{optional:!0}))&&r.push({provide:le,useValue:{value:e.direction,change:N()}}),y.create({parent:s||n,providers:r})}_removeOpenDialog(e,t){let o=this.openDialogs.indexOf(e);o>-1&&(this.openDialogs.splice(o,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((n,s)=>{n?s.setAttribute("aria-hidden",n):s.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){let e=this._overlayContainer.getContainerElement();if(e.parentElement){let t=e.parentElement.children;for(let o=t.length-1;o>-1;o--){let n=t[o];n!==e&&n.nodeName!=="SCRIPT"&&n.nodeName!=="STYLE"&&!n.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(n,n.getAttribute("aria-hidden")),n.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}};i.\u0275fac=function(t){return new(t||i)(d(v),d(y),d(gt,8),d(i,12),d(ee),d(mt))},i.\u0275prov=D({token:i,factory:i.\u0275fac,providedIn:"root"});let a=i;return a})();function de(a,i){let l=a.length;for(;l--;)i(a[l])}function ft(a,i){}var M=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.delayFocusTrap=!0,this.closeOnNavigation=!0}},ue="mdc-dialog--open",Ve="mdc-dialog--opening",He="mdc-dialog--closing",_t=150,vt=75,bt=(()=>{let i=class i extends me{constructor(e,t,o,n,s,r,h,k,oe){super(e,t,o,n,s,r,h,oe),this._animationMode=k,this._animationStateChanged=new _,this._animationsEnabled=this._animationMode!=="NoopAnimations",this._actionSectionCount=0,this._hostElement=this._elementRef.nativeElement,this._enterAnimationDuration=this._animationsEnabled?qe(this._config.enterAnimationDuration)??_t:0,this._exitAnimationDuration=this._animationsEnabled?qe(this._config.exitAnimationDuration)??vt:0,this._animationTimer=null,this._finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)},this._finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})}}_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(Ge,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Ve,ue)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(ue),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(ue),this._animationsEnabled?(this._hostElement.style.setProperty(Ge,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(He)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_clearAnimationClasses(){this._hostElement.classList.remove(Ve,He)}_waitForAnimationToComplete(e,t){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(t,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let t=super.attachComponentPortal(e);return t.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),t}};i.\u0275fac=function(t){return new(t||i)(c(A),c(J),c(K,8),c(M),c(Z),c(w),c(R),c(ne,8),c(X))},i.\u0275cmp=f({type:i,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(t,o){t&2&&(xe("id",o._config.id),O("aria-modal",o._config.ariaModal)("role",o._config.role)("aria-labelledby",o._config.ariaLabel?null:o._ariaLabelledByQueue[0])("aria-label",o._config.ariaLabel)("aria-describedby",o._config.ariaDescribedBy||null),ye("_mat-animation-noopable",!o._animationsEnabled)("mat-mdc-dialog-container-with-actions",o._actionSectionCount>0))},standalone:!0,features:[$,T],decls:3,vars:0,consts:[[1,"mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(t,o){t&1&&(E(0,"div",0)(1,"div",1),W(2,ft,0,0,"ng-template",2),I()())},dependencies:[L],styles:['.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px),(max-width: 600px),(min-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto;outline:0;transform:scale(0.8)}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-dialog__surface::before{border-color:CanvasText}}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid rgba(0,0,0,0);display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}@media screen and (forced-colors: active){.mdc-dialog--fullscreen .mdc-dialog__header{border-bottom-color:CanvasText}}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--fullscreen--titleless .mdc-dialog__close{margin-top:4px}.mdc-dialog--fullscreen--titleless.mdc-dialog--scrollable .mdc-dialog__close{margin-top:0}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--closing .mdc-dialog__surface{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{opacity:1}.mdc-dialog--open .mdc-dialog__surface{transform:none}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%;z-index:1}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-dialog--no-content-padding .mdc-dialog__content{padding:0}.mdc-dialog--sheet .mdc-dialog__container .mdc-dialog__close{right:12px;top:9px;position:absolute;z-index:1}.mdc-dialog__scrim--removed{pointer-events:none}.mdc-dialog__scrim--removed .mdc-dialog__scrim,.mdc-dialog__scrim--removed .mdc-dialog__surface-scrim{display:none}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{width:100%;height:100%}.mat-mdc-dialog-component-host{display:contents}.mat-mdc-dialog-container{--mdc-dialog-container-elevation: var(--mdc-dialog-container-elevation-shadow);outline:0}.mat-mdc-dialog-container .mdc-dialog__surface{background-color:var(--mdc-dialog-container-color, white)}.mat-mdc-dialog-container .mdc-dialog__surface{box-shadow:var(--mdc-dialog-container-elevation, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}.mat-mdc-dialog-container .mdc-dialog__surface{border-radius:var(--mdc-dialog-container-shape, 4px)}.mat-mdc-dialog-container .mdc-dialog__title{font-family:var(--mdc-dialog-subhead-font, Roboto, sans-serif);line-height:var(--mdc-dialog-subhead-line-height, 1.5rem);font-size:var(--mdc-dialog-subhead-size, 1rem);font-weight:var(--mdc-dialog-subhead-weight, 400);letter-spacing:var(--mdc-dialog-subhead-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__title{color:var(--mdc-dialog-subhead-color, rgba(0, 0, 0, 0.87))}.mat-mdc-dialog-container .mdc-dialog__content{font-family:var(--mdc-dialog-supporting-text-font, Roboto, sans-serif);line-height:var(--mdc-dialog-supporting-text-line-height, 1.5rem);font-size:var(--mdc-dialog-supporting-text-size, 1rem);font-weight:var(--mdc-dialog-supporting-text-weight, 400);letter-spacing:var(--mdc-dialog-supporting-text-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__content{color:var(--mdc-dialog-supporting-text-color, rgba(0, 0, 0, 0.6))}.mat-mdc-dialog-container .mdc-dialog__container{transition:opacity linear var(--mat-dialog-transition-duration, 0ms)}.mat-mdc-dialog-container .mdc-dialog__surface{transition:transform var(--mat-dialog-transition-duration, 0ms) 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container,.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__surface{transition:none}.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-max-width, 80vw);min-width:var(--mat-dialog-container-min-width, 0)}@media(max-width: 599px){.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-small-max-width, 80vw)}}.mat-mdc-dialog-title{padding:var(--mat-dialog-headline-padding, 0 24px 9px)}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-container .mat-mdc-dialog-content{padding:var(--mat-dialog-content-padding, 20px 24px)}.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content{padding:var(--mat-dialog-with-actions-content-padding, 20px 24px)}.mat-mdc-dialog-container .mat-mdc-dialog-title+.mat-mdc-dialog-content{padding-top:0}.mat-mdc-dialog-actions{padding:var(--mat-dialog-actions-padding, 8px);justify-content:var(--mat-dialog-actions-alignment, start)}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start,.mat-mdc-dialog-actions[align=start]{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}'],encapsulation:2});let a=i;return a})(),Ge="--mat-dialog-transition-duration";function qe(a){return a==null?null:typeof a=="number"?a:a.endsWith("ms")?re(a.substring(0,a.length-2)):a.endsWith("s")?re(a.substring(0,a.length-1))*1e3:a==="0"?0:null}var ie=function(a){return a[a.OPEN=0]="OPEN",a[a.CLOSING=1]="CLOSING",a[a.CLOSED=2]="CLOSED",a}(ie||{}),P=class{constructor(i,l,e){this._ref=i,this._containerInstance=e,this._afterOpened=new u,this._beforeClosed=new u,this._state=ie.OPEN,this.disableClose=l.disableClose,this.id=i.id,i.addPanelClass("mat-mdc-dialog-panel"),e._animationStateChanged.pipe(b(t=>t.state==="opened"),V(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),e._animationStateChanged.pipe(b(t=>t.state==="closed"),V(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),i.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),fe(this.backdropClick(),this.keydownEvents().pipe(b(t=>t.keyCode===27&&!this.disableClose&&!Q(t)))).subscribe(t=>{this.disableClose||(t.preventDefault(),yt(this,t.type==="keydown"?"keyboard":"mouse"))})}close(i){this._result=i,this._containerInstance._animationStateChanged.pipe(b(l=>l.state==="closing"),V(1)).subscribe(l=>{this._beforeClosed.next(i),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),l.totalTime+100)}),this._state=ie.CLOSING,this._containerInstance._startExitAnimation()}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(i){let l=this._ref.config.positionStrategy;return i&&(i.left||i.right)?i.left?l.left(i.left):l.right(i.right):l.centerHorizontally(),i&&(i.top||i.bottom)?i.top?l.top(i.top):l.bottom(i.bottom):l.centerVertically(),this._ref.updatePosition(),this}updateSize(i="",l=""){return this._ref.updateSize(i,l),this}addPanelClass(i){return this._ref.addPanelClass(i),this}removePanelClass(i){return this._ref.removePanelClass(i),this}getState(){return this._state}_finishDialogClose(){this._state=ie.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function yt(a,i,l){return a._closeInteractionType=i,a.close(l)}var Ct=new m("MatMdcDialogData"),xt=new m("mat-mdc-dialog-default-options"),Dt=new m("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let a=p(v);return()=>a.scrollStrategies.block()}});var At=0,Ue=(()=>{let i=class i{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}constructor(e,t,o,n,s,r,h,k){this._overlay=e,this._defaultOptions=n,this._scrollStrategy=s,this._parentDialog=r,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new u,this._afterOpenedAtThisLevel=new u,this.dialogConfigClass=M,this.afterAllClosed=z(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(H(void 0))),this._dialog=t.get(ze),this._dialogRefConstructor=P,this._dialogContainerType=bt,this._dialogDataToken=Ct}open(e,t){let o;t=g(g({},this._defaultOptions||new M),t),t.id=t.id||`mat-mdc-dialog-${At++}`,t.scrollStrategy=t.scrollStrategy||this._scrollStrategy();let n=this._dialog.open(e,ge(g({},t),{positionStrategy:this._overlay.position().global().centerHorizontally().centerVertically(),disableClose:!0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:t},{provide:x,useValue:t}]},templateContext:()=>({dialogRef:o}),providers:(s,r,h)=>(o=new this._dialogRefConstructor(s,t,h),o.updatePosition(t?.position),[{provide:this._dialogContainerType,useValue:h},{provide:this._dialogDataToken,useValue:r.data},{provide:this._dialogRefConstructor,useValue:o}])}));return o.componentRef=n.componentRef,o.componentInstance=n.componentInstance,this.openDialogs.push(o),this.afterOpened.next(o),o.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(o);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next())}),o}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let t=e.length;for(;t--;)e[t].close()}};i.\u0275fac=function(t){return new(t||i)(d(v),d(y),d(Ie,8),d(xt,8),d(Dt),d(i,12),d(ee),d(ne,8))},i.\u0275prov=D({token:i,factory:i.\u0275fac,providedIn:"root"});let a=i;return a})();var We=(()=>{let i=class i{constructor(e){this.dialogRef=e,this.captchaResolved=new _,this.captchaTitle="Por favor, resuelve este captcha"}closeModal(){this.dialogRef.close()}onCaptchaResolved(){console.log("Captcha resuelto correctamente"),this.captchaResolved.emit(!0),this.dialogRef.close(!0)}onCaptchaExpired(){console.log("Captcha expirado"),this.captchaResolved.emit(!1),this.dialogRef.close(!1)}onConfirmCaptcha(){console.log("Confirmar CAPTCHA"),this.captchaResolved.emit(!0),this.closeModal()}};i.\u0275fac=function(t){return new(t||i)(c(P))},i.\u0275cmp=f({type:i,selectors:[["app-captcha-modal"]],outputs:{captchaResolved:"captchaResolved"},standalone:!0,features:[T],decls:7,vars:1,consts:[["recaptcha",""],["siteKey","6Ld2F4sqAAAAACA6zKSGlt3QLMNuxg4Ot6qicnL1",3,"resolved","expired"],[1,"close-btn",3,"click"]],template:function(t,o){if(t&1){let n=Ce();E(0,"div")(1,"h2"),se(2),I(),E(3,"re-captcha",1,0),C("resolved",function(){return q(n),U(o.onCaptchaResolved())})("expired",function(){return q(n),U(o.onCaptchaExpired())}),I(),E(5,"button",2),C("click",function(){return q(n),U(o.dialogRef.close())}),se(6,"Cerrar"),I()()}t&2&&(ve(2),Oe(o.captchaTitle))},dependencies:[Te,Ne,Be],styles:['@charset "UTF-8";div[_ngcontent-%COMP%]{max-width:400px;margin:0 auto;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 4px 10px #0000001a;text-align:center}h2[_ngcontent-%COMP%]{font-size:1.3rem;color:#333;margin-bottom:20px;font-weight:500;line-height:1.4;text-align:center}re-captcha[_ngcontent-%COMP%]{margin:20px 0}button[_ngcontent-%COMP%]{padding:8px 20px;font-size:1rem;border:none;cursor:pointer;border-radius:5px;transition:all .3s ease;margin:10px 0}.confirm-btn[_ngcontent-%COMP%]{background-color:#4caf50;color:#fff}.confirm-btn[_ngcontent-%COMP%]:hover{background-color:#45a049}.close-btn[_ngcontent-%COMP%]{background-color:#f44336;color:#fff}.close-btn[_ngcontent-%COMP%]:hover{background-color:#e53935}@media (max-width: 600px){div[_ngcontent-%COMP%]{padding:15px}h2[_ngcontent-%COMP%]{font-size:1.1rem}button[_ngcontent-%COMP%]{font-size:.9rem;padding:6px 16px}}']});let a=i;return a})();var Gi=(()=>{let i=class i{constructor(e){this.dialog=e,this.captchaStatus=!1,this.firebaseSvc=p(Fe),this.captchaTitle="Confirma que eres humano:"}ngOnInit(){return B(this,null,function*(){this.role=this.getRoleFromLocalStorage(),this.captchaStatus=yield this.firebaseSvc.isCaptchaActivated()})}onClick(){return B(this,null,function*(){if(this.role!="administrador"&&this.captchaStatus)if((yield this.validateCaptcha())&&this.captchaCallback)try{yield this.captchaCallback()}catch(t){console.error("Error ejecutando la funci\xF3n:",t)}else console.warn("Captcha fallido o funci\xF3n no definida");else yield this.captchaCallback()})}getRoleFromLocalStorage(){try{let e=localStorage.getItem("user");return e&&JSON.parse(e).role||null}catch(e){return console.error("Error al obtener el rol del usuario desde localStorage:",e),null}}validateCaptcha(){return B(this,null,function*(){return(yield this.dialog.open(We,{data:{title:this.captchaTitle}}).afterClosed().toPromise())===!0})}};i.\u0275fac=function(t){return new(t||i)(c(Ue))},i.\u0275dir=G({type:i,selectors:[["","appCaptcha",""]],hostBindings:function(t,o){t&1&&C("click",function(){return o.onClick()})},inputs:{captchaCallback:[ae.None,"appCaptcha","captchaCallback"],captchaTitle:"captchaTitle"},standalone:!0});let a=i;return a})();export{Gi as a};
