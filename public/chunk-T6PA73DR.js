import{a as ne}from"./chunk-S2WSGE4Z.js";import{a as oe}from"./chunk-JUZHZSBE.js";import{a as te}from"./chunk-J447TY2B.js";import{a as ie}from"./chunk-POG2CTK2.js";import{h as ee}from"./chunk-5PP5VR5I.js";import{a as B,b as p,d as Z,e as H,g as f,i as J,k as K,l as Q,p as W,q as X,r as Y}from"./chunk-7YVO6NQX.js";import{B as R,L as $,Q as j,f as z}from"./chunk-YYGECID7.js";import{Bc as E,Dc as U,Eb as c,Fb as L,Nb as N,Pa as n,Qa as q,ba as w,db as m,fa as F,fb as l,hb as V,jb as g,kb as s,kc as A,lb as r,lc as D,mb as v,nb as x,ob as b,pa as S,pb as T,qa as C,sb as h,ub as u,wa as k,yc as G,zc as O}from"./chunk-HTI5VKZI.js";import{a as M,g as y}from"./chunk-5G567QLT.js";function le(t,a){t&1&&v(0,"app-header",2),t&2&&l("title","Registro")("back",!0)("whereToBack","/sign-up/select")}function se(t,a){t&1&&(s(0,"div",31),c(1,"El nombre es requerido"),r())}function ce(t,a){t&1&&(s(0,"div",31),c(1,"El nombre debe tener 5 o m\xE1s car\xE1cteres"),r())}function pe(t,a){if(t&1&&(x(0,10),m(1,se,2,0,"div",30)(2,ce,2,0,"div",30),b()),t&2){let e=u(2);n(),l("ngIf",e.form.controls.name.errors==null?null:e.form.controls.name.errors.required),n(),l("ngIf",!(e.form.controls.name.errors!=null&&e.form.controls.name.errors.required))}}function me(t,a){t&1&&(s(0,"div",31),c(1,"El apellido es requerido"),r())}function de(t,a){t&1&&(s(0,"div",31),c(1,"El apellido debe tener 5 o m\xE1s car\xE1cteres"),r())}function ue(t,a){if(t&1&&(x(0,10),m(1,me,2,0,"div",30)(2,de,2,0,"div",30),b()),t&2){let e=u(2);n(),l("ngIf",e.form.controls.lastName.errors==null?null:e.form.controls.lastName.errors.required),n(),l("ngIf",!(e.form.controls.lastName.errors!=null&&e.form.controls.lastName.errors.required))}}function fe(t,a){t&1&&(s(0,"div",31),c(1,"El dni es requerido"),r())}function _e(t,a){t&1&&(s(0,"div",31),c(1,"El dni debe tener entre 6 y 8 car\xE1cteres"),r())}function ge(t,a){if(t&1&&(x(0,10),m(1,fe,2,0,"div",30)(2,_e,2,0,"div",30),b()),t&2){let e=u(2);n(),l("ngIf",e.form.controls.dni.errors==null?null:e.form.controls.dni.errors.required),n(),l("ngIf",!(e.form.controls.dni.errors!=null&&e.form.controls.dni.errors.required))}}function ve(t,a){t&1&&(s(0,"div",31),c(1,"La edad es requerida"),r())}function xe(t,a){t&1&&(s(0,"div",31),c(1,"La edad debe ser entre 25 y 100"),r())}function be(t,a){if(t&1&&(x(0,10),m(1,ve,2,0,"div",30)(2,xe,2,0,"div",30),b()),t&2){let e=u(2);n(),l("ngIf",e.form.controls.age.errors==null?null:e.form.controls.age.errors.required),n(),l("ngIf",!(e.form.controls.age.errors!=null&&e.form.controls.age.errors.required))}}function Se(t,a){t&1&&(s(0,"div",31),c(1,"El correo es requerido"),r())}function Ce(t,a){t&1&&(s(0,"div",31),c(1,"Ingrese un formato correcto"),r())}function he(t,a){if(t&1&&(x(0,10),m(1,Se,2,0,"div",30)(2,Ce,2,0,"div",30),b()),t&2){let e=u(2);n(),l("ngIf",e.form.controls.email.errors==null?null:e.form.controls.email.errors.required),n(),l("ngIf",e.form.controls.email.errors==null?null:e.form.controls.email.errors.email)}}function ye(t,a){t&1&&(s(0,"div",31),c(1,"La contrase\xF1a es requerida"),r())}function we(t,a){t&1&&(s(0,"div",31),c(1,"Debe tener 6 car\xE1cteres o m\xE1s"),r())}function Ee(t,a){if(t&1&&(x(0,10),m(1,ye,2,0,"div",30)(2,we,2,0,"div",30),b()),t&2){let e=u(2);n(),l("ngIf",e.form.controls.password.errors==null?null:e.form.controls.password.errors.required),n(),l("ngIf",e.form.controls.password.errors==null?null:e.form.controls.password.errors.email)}}function Pe(t,a){if(t&1){let e=T();s(0,"div",32)(1,"label",33)(2,"input",34),h("change",function(){let o=S(e).$implicit,d=u(2);return C(d.onCheckboxChange(o.nombre))}),r(),s(3,"span",35),c(4),r()()()}if(t&2){let e=a.$implicit;n(4),L(e.nombre)}}function Te(t,a){t&1&&(s(0,"small",38),c(1,"El nombre es obligatorio"),r())}function Oe(t,a){t&1&&(s(0,"small",38),c(1,"El nombre debe tener al menos 3 caracteres"),r())}function Ue(t,a){if(t&1&&(s(0,"div",36),m(1,Te,2,0,"small",37)(2,Oe,2,0,"small",37),r()),t&2){let e=u(2);n(),l("ngIf",e.specialtyForm.controls.nombre.errors==null?null:e.specialtyForm.controls.nombre.errors.required),n(),l("ngIf",e.specialtyForm.controls.nombre.errors==null?null:e.specialtyForm.controls.nombre.errors.minlength)}}function Ie(t,a){t&1&&(s(0,"div",31),c(1,"La imagen es requerida"),r())}function Me(t,a){if(t&1&&(x(0,10),m(1,Ie,2,0,"div",30),b()),t&2){let e=u(2);n(),l("ngIf",e.form.controls.profilePic.errors==null?null:e.form.controls.profilePic.errors.required)}}function Fe(t,a){if(t&1){let e=T();s(0,"div",3)(1,"div",4),v(2,"app-logo",5),r(),s(3,"div",6)(4,"form",7)(5,"div",8)(6,"app-custom-input",9),h("keypress",function(o){S(e);let d=u();return C(d.allowOnlyLetters(o))}),r(),m(7,pe,3,2,"ng-container",10),r(),s(8,"div",8)(9,"app-custom-input",11),h("keypress",function(o){S(e);let d=u();return C(d.allowOnlyLetters(o))}),r(),m(10,ue,3,2,"ng-container",10),r(),s(11,"div",8),v(12,"app-custom-input",12),m(13,ge,3,2,"ng-container",10),r(),s(14,"div",8),v(15,"app-custom-input",13),m(16,be,3,2,"ng-container",10),r(),s(17,"div",8),v(18,"app-custom-input",14),m(19,he,3,2,"ng-container",10),r(),s(20,"div",8),v(21,"app-custom-input",15),m(22,Ee,3,2,"ng-container",10),r(),s(23,"div",16)(24,"div",17),c(25,"ESPECIALIDADES"),r(),s(26,"div",18),m(27,Pe,5,1,"div",19),r()(),s(28,"form",20),h("ngSubmit",function(){S(e);let o=u();return C(o.addNewSpecialty())}),s(29,"div",21)(30,"label",22),c(31,"AGREGAR ESPECIALIDAD"),r(),v(32,"input",23),m(33,Ue,3,2,"div",24),r(),s(34,"button",25),c(35,"Agregar Especialidad"),r()(),s(36,"div",26)(37,"app-picture-input",27),h("fileSelected",function(o){S(e);let d=u();return C(d.onFileSelected(o,"profilePic"))})("fileRemoved",function(){S(e);let o=u();return C(o.onFileRemoved())}),r(),m(38,Me,2,1,"ng-container",10),r(),s(39,"div",28)(40,"button",29),c(41,"REGISTRARSE "),r()()()()()}if(t&2){let e=u();V("body",e.header),l("@fadeScale",void 0),n(2),l("titulo","Registro de Especialista")("color",e.color),n(2),l("formGroup",e.form),n(2),l("control",e.form.controls.name),n(),g(7,e.form.controls.name.errors&&e.form.controls.name.touched?7:-1),n(2),l("control",e.form.controls.lastName),n(),g(10,e.form.controls.lastName.errors&&e.form.controls.lastName.touched?10:-1),n(2),l("control",e.form.controls.dni),n(),g(13,e.form.controls.dni.errors&&e.form.controls.dni.touched?13:-1),n(2),l("control",e.form.controls.age),n(),g(16,e.form.controls.age.errors&&e.form.controls.age.touched?16:-1),n(2),l("control",e.form.controls.email),n(),g(19,e.form.controls.email.errors&&e.form.controls.email.touched?19:-1),n(2),l("control",e.form.controls.password),n(),g(22,e.form.controls.password.errors&&e.form.controls.password.touched?22:-1),n(5),l("ngForOf",e.specialties),n(),l("formGroup",e.specialtyForm),n(5),l("ngIf",e.specialtyForm.controls.nombre.invalid&&e.specialtyForm.controls.nombre.touched),n(),l("disabled",e.specialtyForm.invalid),n(4),g(38,e.form.controls.profilePic.errors&&e.form.controls.profilePic.touched?38:-1),n(2),l("disabled",e.form.invalid)("appCaptcha",e.onCaptchaOnSubmit())("captchaTitle","Por favor, resuelve este captcha antes de continuar:")}}var We=(()=>{let a=class a{toggleVisibility(){this.isVisible=!this.isVisible}constructor(i){this.router=i,this.isVisible=!0,this.header=!0,this.color="blue",this.esAdmin=!1,this.specialistUploaded=new k,this.fb=w(W),this.specialties=[],this.specialtiesDefault=[],this.form=this.fb.group({uid:new f(""),name:new f("",[p.required,p.minLength(5),p.pattern("^[a-zA-Z]+$")]),lastName:new f("",[p.required,p.minLength(5),p.pattern("^[a-zA-Z]+$")]),dni:new f("",[p.required,p.minLength(6),p.maxLength(8)]),specialities:new f([],[p.required]),email:new f("",[p.required,p.email]),password:new f("",[p.required,p.minLength(6)]),profilePic:new f(null,[p.required]),age:new f("",[p.required,p.min(25),p.max(100)])}),this.firebaseSvc=w(j),this.utilSvc=w($),this.specialtyForm=this.fb.group({nombre:["",[p.required,p.minLength(5)]],descripcion:[""]})}ngOnInit(){return y(this,null,function*(){this.specialties=yield this.firebaseSvc.getSpecialties(),this.specialtiesDefault=yield this.firebaseSvc.getSpecialties()})}onCheckboxChange(i){let o=this.form.get("specialities")?.value??[];if(o.includes(i)){let d=o.filter(_=>_!==i);this.form.get("specialities")?.setValue(d)}else o.push(i),this.form.get("specialities")?.setValue([...o])}get formControls(){return this.form.controls}onFileSelected(i,o){i.size>2097152?(console.log("El archivo es demasiado grande. El tama\xF1o m\xE1ximo permitido es 2 MB."),this.formControls[o].setValue(null)):this.formControls[o].setValue(i)}onSubmit(){return y(this,null,function*(){if(this.form.valid){let i=this.form.value,o=i.profilePic;if(o){let d=[this.firebaseSvc.uploadImage(o,`profilePics/${i.name}_${i.dni}_1`)];Promise.all(d).then(([_])=>{if(_){let I={uid:i.uid,name:i.name,lastName:i.lastName,dni:i.dni,specialities:i.specialities,email:i.email,age:i.age,profilePic:_,activated:!1};i.email&&i.password?this.firebaseSvc.signUp(i.email,i.password).then(P=>{let re=P.user;I.uid=re.uid,this.firebaseSvc.saveUserDataAsSpecialist(I).then(()=>{this.syncSpecialties(),console.log("Especialista registrado con \xE9xito"),this.specialistUploaded.emit(!0),this.form.reset(),this.esAdmin==!1&&this.router.navigate(["/home"])}).catch(ae=>{console.error("Error al guardar los datos del especialista: ",ae)})}).catch(P=>{console.error("Error al registrar el usuario: ",P)}):console.log("Faltan email o contrase\xF1a para registrar al especialista")}else console.error("No se pudieron obtener las URLs de las im\xE1genes")}).catch(_=>{console.error("Error al subir las im\xE1genes: ",_)})}else console.log("Las im\xE1genes no se han seleccionado correctamente")}else console.log("Formulario no v\xE1lido")})}allowOnlyLetters(i){/^[a-zA-Z ]+$/.test(i.key)||i.preventDefault()}addNewSpecialty(){return y(this,null,function*(){if(this.specialtyForm.valid){let i=this.specialtyForm.value,o=i.nombre?.trim();if(!o){console.log("El nombre de la especialidad no puede estar vac\xEDo.");return}if(this.specialties.some(_=>_.nombre?.toLowerCase()===o.toLowerCase())){console.log("La especialidad ya existe en la lista.");return}this.specialties.push(M({nombre:o},i)),console.log("Especialidad a\xF1adida a la lista exitosamente"),this.specialtyForm.reset()}else console.log("Formulario no v\xE1lido")})}onFileRemoved(){this.form.get("profilePic")?.setValue(null)}syncSpecialties(){return y(this,null,function*(){try{let i=this.specialties.filter(o=>!this.specialtiesDefault.some(d=>d.nombre?.toLowerCase()===o.nombre?.toLowerCase()));if(i.length>0){console.log(`Subiendo ${i.length} nuevas especialidades...`);for(let o of i)yield this.firebaseSvc.addSpecialty(o),console.log(`Especialidad a\xF1adida: ${o.nombre}`);this.specialtiesDefault=yield this.firebaseSvc.getSpecialties(),console.log("Sincronizaci\xF3n completada.")}else console.log("No hay nuevas especialidades para subir.")}catch(i){console.error("Error durante la sincronizaci\xF3n de especialidades:",i)}})}onCaptchaOnSubmit(){return()=>this.onSubmit()}};a.\u0275fac=function(o){return new(o||a)(q(z))},a.\u0275cmp=F({type:a,selectors:[["app-sign-up-specialist"]],inputs:{header:"header",color:"color",esAdmin:"esAdmin"},outputs:{specialistUploaded:"specialistUploaded"},standalone:!0,features:[N],decls:2,vars:2,consts:[[3,"title","back","whereToBack",4,"ngIf"],["class","container",3,"body",4,"ngIf"],[3,"title","back","whereToBack"],[1,"container"],[1,"d-flex-center","widht-100"],[3,"titulo","color"],[1,"d-flex-center","width-500"],[1,"auth-form",3,"formGroup"],[1,"margin-input"],["label","Nombre","type","text",3,"keypress","control"],[1,"validators-container"],["label","Apellido","type","text",3,"keypress","control"],["label","DNI","type","number",3,"control"],["label","EDAD","type","number",3,"control"],["label","Correo","type","email",3,"control"],["label","Contrase\xF1a","type","password",3,"control"],[1,"specialties-container"],[1,"title"],[1,"specialties-list"],["class","specialty-item",4,"ngFor","ngForOf"],[1,"specialty-form",3,"ngSubmit","formGroup"],[1,"form-group"],["for","nombre",1,"form-label"],["id","nombre","formControlName","nombre","type","text","placeholder","Nombre de la especialidad",1,"form-input"],["class","error-messages",4,"ngIf"],["type","submit",1,"submit-btn",3,"disabled"],[1,"widht-100","d-flex-center"],["label","Selecciona tu imagen",3,"fileSelected","fileRemoved"],[1,"button-login","submit-btn-register"],["mat-flat-button","","color","warn","type","submit",3,"disabled","appCaptcha","captchaTitle"],["class","validators",4,"ngIf"],[1,"validators"],[1,"specialty-item"],[1,"specialty-label"],["type","checkbox",1,"specialty-checkbox",3,"change"],[1,"specialty-name"],[1,"error-messages"],["class","error-text",4,"ngIf"],[1,"error-text"]],template:function(o,d){o&1&&m(0,le,1,3,"app-header",0)(1,Fe,42,26,"div",1),o&2&&(l("ngIf",d.header),n(),l("ngIf",d.isVisible))},dependencies:[ee,te,R,Y,J,B,Z,H,K,Q,X,D,ne,A,ie,oe],styles:['@charset "UTF-8";.d-flex[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;flex-wrap:wrap}.body[_ngcontent-%COMP%]{height:800px;margin-top:20px;background-position-y:-50px}body[_ngcontent-%COMP%]{position:relative;margin:0;font-family:Arial,sans-serif}.body[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:10px 0 0;background:url("./media/background-patient-HLLCCCEI.jpg");background-repeat:no-repeat;background-position-x:center;background-size:1875px;opacity:.2;z-index:-1}.d-flex-space-between[_ngcontent-%COMP%]{display:flex;align-content:space-between;justify-content:space-between}.margin-input[_ngcontent-%COMP%]{margin-top:40px}.button-login[_ngcontent-%COMP%]{padding:22px;margin-top:40px}.validators[_ngcontent-%COMP%]{font-size:15px;text-align:center;color:red}.width-500[_ngcontent-%COMP%], .auth-form[_ngcontent-%COMP%]{width:100%;display:flex;flex-wrap:wrap;justify-content:center}.margin-input[_ngcontent-%COMP%]{margin-right:40px;width:30%}.widht-100[_ngcontent-%COMP%]{width:100%}.specialty-form[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:20px;background-color:#f9f9f9;border-radius:8px;box-shadow:0 4px 8px #0000001a;font-family:Arial,sans-serif;font-size:18px;height:200px}.form-group[_ngcontent-%COMP%]{margin-bottom:20px}.form-label[_ngcontent-%COMP%]{display:block;margin-bottom:8px;font-weight:700;color:#333}.form-input[_ngcontent-%COMP%]{width:100%;padding:10px;border:1px solid #ccc;border-radius:4px;font-size:16px;background-color:#fff;transition:border-color .3s ease;margin-top:10px}.form-input[_ngcontent-%COMP%]:focus{border-color:#4a90e2;outline:none}.error-messages[_ngcontent-%COMP%]{margin-top:8px;color:#d9534f;font-size:12px}.error-text[_ngcontent-%COMP%]{display:block}.submit-btn[_ngcontent-%COMP%]{padding:10px 20px;background-color:#4a90e2;color:#fff;border:none;border-radius:4px;font-size:15px;cursor:pointer;transition:background-color .3s ease}.submit-btn[_ngcontent-%COMP%]:disabled{background-color:#ccc;cursor:not-allowed}.submit-btn[_ngcontent-%COMP%]:hover{background-color:#357abd}.specialties-container[_ngcontent-%COMP%]{max-width:800px;margin:20px auto;padding:15px;background-color:#f9f9f9;border-radius:8px;box-shadow:0 4px 8px #0000001a;font-family:Arial,sans-serif}.title[_ngcontent-%COMP%]{font-size:18px;font-weight:700;color:#333;margin-bottom:10px}.specialties-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:15px}.specialty-item[_ngcontent-%COMP%]{flex:1 1 calc(33.333% - 10px);min-width:200px;box-sizing:border-box}.specialty-label[_ngcontent-%COMP%]{display:flex;align-items:center;font-size:14px;color:#333;cursor:pointer;padding:5px}.specialty-checkbox[_ngcontent-%COMP%]{margin-right:10px}.specialty-name[_ngcontent-%COMP%]{font-size:14px;color:#333;white-space:nowrap}.submit-btn-register[_ngcontent-%COMP%]{cursor:not-allowed}.submit-btn-register[_ngcontent-%COMP%]:disabled{cursor:not-allowed}'],data:{animation:[G("fadeScale",[U(":enter",[E({opacity:0,transform:"scale(0.8)"}),O("500ms ease-out",E({opacity:1,transform:"scale(1)"}))]),U(":leave",[O("500ms ease-in",E({opacity:0,transform:"scale(0.8)"}))])])]}});let t=a;return t})();export{We as a};
