import{a as W}from"./chunk-J447TY2B.js";import{h as J}from"./chunk-5PP5VR5I.js";import{b as P,e as z,g as A,i as j,k as N,p as D,q as F,r as G}from"./chunk-7YVO6NQX.js";import{B as M,Q as R,f as q}from"./chunk-YYGECID7.js";import{Bc as v,Dc as k,Eb as g,Na as x,Nb as I,Pa as s,Qa as U,ba as C,db as m,fa as V,fb as n,jb as b,kb as c,lb as p,lc as T,mb as d,nb as y,ob as w,pa as f,pb as E,qa as u,sb as _,ub as l,yc as O,zc as S}from"./chunk-HTI5VKZI.js";import{g as h}from"./chunk-5G567QLT.js";function B(t,r){t&1&&(c(0,"div",25),g(1,"El correo es requerido"),p())}function Q(t,r){t&1&&(c(0,"div",25),g(1,"Ingrese un correo v\xE1lido"),p())}function X(t,r){if(t&1&&(y(0,10),m(1,B,2,0,"div",24)(2,Q,2,0,"div",24),w()),t&2){let e=l(2);s(),n("ngIf",e.form.controls.email.errors==null?null:e.form.controls.email.errors.required),s(),n("ngIf",e.form.controls.email.errors==null?null:e.form.controls.email.errors.email)}}function Y(t,r){t&1&&(c(0,"div",25),g(1,"La contrase\xF1a es requerida"),p())}function H(t,r){t&1&&(c(0,"div",25),g(1,"Debe tener 6 car\xE1cteres o m\xE1s"),p())}function K(t,r){if(t&1&&(y(0,10),m(1,Y,2,0,"div",24)(2,H,2,0,"div",24),w()),t&2){let e=l(2);s(),n("ngIf",e.form.controls.password.errors==null?null:e.form.controls.password.errors.required),s(),n("ngIf",!(e.form.controls.password.errors!=null&&e.form.controls.password.errors.required))}}function L(t,r){if(t&1&&d(0,"img",26),t&2){let e=l(2);n("src",e.profilePicUrls.profilePic1,x)}}function Z(t,r){if(t&1&&d(0,"img",26),t&2){let e=l(2);n("src",e.profilePicUrls.profilePic2,x)}}function $(t,r){if(t&1&&d(0,"img",26),t&2){let e=l(2);n("src",e.profilePicUrls.profilePic3,x)}}function ee(t,r){if(t&1&&d(0,"img",26),t&2){let e=l(2);n("src",e.profilePicUrls.profilePic4,x)}}function te(t,r){if(t&1&&d(0,"img",26),t&2){let e=l(2);n("src",e.profilePicUrls.profilePic5,x)}}function ie(t,r){if(t&1&&d(0,"img",26),t&2){let e=l(2);n("src",e.profilePicUrls.profilePic6,x)}}function oe(t,r){if(t&1){let e=E();c(0,"section")(1,"div",2)(2,"div",3)(3,"div",4),d(4,"img",5),p(),c(5,"div",6)(6,"form",7),_("ngSubmit",function(){f(e);let i=l();return u(i.submit())})("keypress.enter",function(){f(e);let i=l();return u(i.submit())}),c(7,"div",8),d(8,"app-custom-input",9),p(),m(9,X,3,2,"ng-container",10),c(10,"div",8),d(11,"app-custom-input",11),p(),m(12,K,3,2,"ng-container",10),c(13,"div",12)(14,"button",13),g(15,"INICIAR SESI\xD3N"),p(),c(16,"button",14),_("click",function(i){f(e);let a=l();return u(a.redirectToSignUp(i))}),g(17,"REGISTRARSE"),p()()()()()(),c(18,"div",15)(19,"div",16),g(20,"Acceso r\xE1pido"),p(),c(21,"div",17)(22,"div",18),_("click",function(){f(e);let i=l();return u(i.accesoRapido1())}),m(23,L,1,1,"img",19),p(),c(24,"div",18),_("click",function(){f(e);let i=l();return u(i.accesoRapido2())}),m(25,Z,1,1,"img",19),p(),c(26,"div",18),_("click",function(){f(e);let i=l();return u(i.accesoRapido3())}),m(27,$,1,1,"img",19),p(),c(28,"div",20),_("click",function(){f(e);let i=l();return u(i.accesoRapido4())}),m(29,ee,1,1,"img",19),p(),c(30,"div",20),_("click",function(){f(e);let i=l();return u(i.accesoRapido5())}),m(31,te,1,1,"img",19),p(),c(32,"div",21),_("click",function(){f(e);let i=l();return u(i.accesoRapido6())}),m(33,ie,1,1,"img",19),p()()(),c(34,"div",22)(35,"div",23),g(36," Copyright \xA9 2024. All rights reserved. "),p()()()}if(t&2){let e=l();n("@fadeInOut",void 0),s(6),n("formGroup",e.form),s(2),n("control",e.form.controls.email),s(),b(9,e.form.controls.email.errors&&e.form.controls.email.touched?9:-1),s(2),n("control",e.form.controls.password),s(),b(12,e.form.controls.password.errors&&e.form.controls.password.touched?12:-1),s(2),n("disabled",e.form.invalid),s(9),n("ngIf",e.profilePicUrls.profilePic1),s(2),n("ngIf",e.profilePicUrls.profilePic2),s(2),n("ngIf",e.profilePicUrls.profilePic3),s(2),n("ngIf",e.profilePicUrls.profilePic4),s(2),n("ngIf",e.profilePicUrls.profilePic5),s(2),n("ngIf",e.profilePicUrls.profilePic6)}}var ge=(()=>{let r=class r{constructor(o){this.router=o,this.fb=C(D),this.isVisible=!0,this.profilePicUrls={},this.form=this.fb.group({email:new A("",[P.required,P.email]),password:new A("",[P.required,P.minLength(6)])}),this.firebaseSvc=C(R)}toggleVisibility(){this.isVisible=!this.isVisible}loadAllProfiles(){return h(this,null,function*(){yield Promise.all([this.loadPatientProfilePic("PlKconfsyoWx6agk75Ws0AGpf6N2","profilePic1"),this.loadPatientProfilePic("3rcznUybAYQkboNwqJesSVDmq3j1","profilePic2"),this.loadPatientProfilePic("NJcEP6RJYONCq0R7qukuVC1fNgr2","profilePic3"),this.loadSpecialistProfilePic("QJu2zBkbuXWmNixsbWXsijKCXCj2","profilePic4"),this.loadSpecialistProfilePic("ME2G08oTkPdZo6gpZFzEKq6j1cr1","profilePic5"),this.loadAdminProfilePic("aZQeRJAafQYMXbHxSfgDUGIsCzx2","profilePic6")])})}ngOnInit(){this.loadAllProfiles()}redirectToSignUp(o){o?.preventDefault(),this.router.navigateByUrl("/sign-up/select")}submit(){return h(this,null,function*(){let o=this.form.value;o.email&&o.password&&(yield this.firebaseSvc.sigIn(o.email,o.password).then(i=>{console.log(i),this.router.navigate(["./home"])}).catch(i=>{console.error(i)}))})}loadPatientProfilePic(o,i){return h(this,null,function*(){try{let a=yield this.firebaseSvc.getPatientProfilePic(o);a?this.profilePicUrls[i]=a:console.warn("No se encontr\xF3 la foto de perfil para el usuario con UID:",o)}catch(a){console.error("Error al cargar la foto de perfil:",a)}})}loadAdminProfilePic(o,i){return h(this,null,function*(){try{let a=yield this.firebaseSvc.getAdminProfilePic(o);a?this.profilePicUrls[i]=a:console.warn("No se encontr\xF3 la foto de perfil para el usuario con UID:",o)}catch(a){console.error("Error al cargar la foto de perfil:",a)}})}loadSpecialistProfilePic(o,i){return h(this,null,function*(){try{let a=yield this.firebaseSvc.getSpecialistsProfilePic(o);a?this.profilePicUrls[i]=a:console.warn("No se encontr\xF3 la foto de perfil para el usuario con UID:",o)}catch(a){console.error("Error al cargar la foto de perfil:",a)}})}accesoRapido1(){this.form.patchValue({email:"v2o6wpixai@qacmjeq.com",password:"123456"})}accesoRapido2(){this.form.patchValue({email:"7xnfrrjfp8@zlorkun.com",password:"123456"})}accesoRapido3(){this.form.patchValue({email:"bqvw60eqzr@tidissajiiu.com",password:"123456"})}accesoRapido4(){this.form.patchValue({email:"ltpbfz6mbs@gonetor.com",password:"123456"})}accesoRapido5(){this.form.patchValue({email:"t8c3i7fds9@somelora.com",password:"123456"})}accesoRapido6(){this.form.patchValue({email:"xx9rz70tbc@dygovil.com",password:"123456"})}};r.\u0275fac=function(i){return new(i||r)(U(q))},r.\u0275cmp=V({type:r,selectors:[["app-auth"]],standalone:!0,features:[I],decls:2,vars:2,consts:[[3,"title"],[4,"ngIf"],[1,"container-fluid","h-custom"],[1,"row","d-flex","justify-content-center","align-items-center","h-100"],[1,"col-md-9","col-lg-6","col-xl-5"],["src","assets/images/login-image.png","alt","Sample image",1,"img-fluid"],[1,"col-md-8","col-lg-6","col-xl-4","offset-xl-1"],[1,"auth-form",3,"ngSubmit","keypress.enter","formGroup"],[1,"margin-input"],["label","Correo","type","email","name","email",1,"button-width",3,"control"],[1,"validators-container"],["label","Contrase\xF1a","type","password",3,"control"],[1,"d-flex-space-between","widht-100"],["mat-flat-button","","color","primary","type","submit",1,"button-login",3,"disabled"],["mat-flat-button","","color","warn",1,"button-login",3,"click"],[1,"quick-access-container"],[1,"quick-access-title"],[1,"squares-container"],[1,"square","bg-sky-blue",3,"click"],["alt","Acceso 1",3,"src",4,"ngIf"],[1,"square","bg-green",3,"click"],[1,"square","bg-red",3,"click"],[1,"p-fixed-bottom","d-flex","flex-column","flex-md-row","text-center","text-md-start","justify-content-between","py-4","px-4","px-xl-5","bg-primary"],[1,"text-white","mb-3","mb-md-0"],["class","validators",4,"ngIf"],[1,"validators"],["alt","Acceso 1",3,"src"]],template:function(i,a){i&1&&(d(0,"app-header",0),m(1,oe,37,13,"section",1)),i&2&&(n("title","Login"),s(),n("ngIf",a.isVisible))},dependencies:[J,W,M,F,j,z,G,N,T],styles:['@charset "UTF-8";.d-flex[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;flex-wrap:wrap}.button-width[_ngcontent-%COMP%]{width:500px}.body[_ngcontent-%COMP%]{height:800px;margin-top:20px;background-position-y:-50px}body[_ngcontent-%COMP%]{position:relative;margin:0;font-family:Arial,sans-serif}.body[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:10px 0 0;background:url("./media/wounded-heart-svgrepo-com-2GYDWICH.svg");background-repeat:no-repeat;background-position-x:center;background-size:925px;opacity:.2;z-index:-1}.d-flex-space-between[_ngcontent-%COMP%]{display:flex;align-content:space-between;justify-content:space-between}.margin-input[_ngcontent-%COMP%]{margin-top:40px}.button-login[_ngcontent-%COMP%]{padding:22px;margin-top:40px}.validators-container[_ngcontent-%COMP%]{margin-top:0}.validators[_ngcontent-%COMP%]{font-size:15px;text-align:center;color:red}.h-custom[_ngcontent-%COMP%]{margin-bottom:51px}.quick-access-container[_ngcontent-%COMP%]{border:2px solid gray;padding:20px;position:relative;display:inline-block;margin:0 auto;position:absolute;right:1%;top:78%;border-radius:20px}.quick-access-title[_ngcontent-%COMP%]{position:absolute;top:-15px;left:50%;transform:translate(-50%);background-color:#fff;padding:0 10px;font-weight:700;font-size:16px;color:#000}.squares-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;gap:20px}.square[_ngcontent-%COMP%]{width:70px;height:70px;position:relative;display:flex;justify-content:center;align-items:center;overflow:hidden;cursor:pointer}.square[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:85%;height:85%;object-fit:cover}.bg-green[_ngcontent-%COMP%]{background-color:#4caf50}.bg-red[_ngcontent-%COMP%]{background-color:#f44336}.bg-sky-blue[_ngcontent-%COMP%]{background-color:#4e8de0}'],data:{animation:[O("fadeInOut",[k(":enter",[v({opacity:0}),S("500ms 0s",v({opacity:1}))]),k(":leave",[S("500ms 0s",v({opacity:0}))])])]}});let t=r;return t})();export{ge as AuthComponent};