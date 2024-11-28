import{a as Z}from"./chunk-S2WSGE4Z.js";import{a as G}from"./chunk-JUZHZSBE.js";import{a as $}from"./chunk-J447TY2B.js";import{a as j}from"./chunk-POG2CTK2.js";import{h as V}from"./chunk-5PP5VR5I.js";import{b as p,e as N,f as A,g as f,i as D,p as W,q as z,r as B}from"./chunk-7YVO6NQX.js";import{B as O,L as M,Q as R,f as L}from"./chunk-YYGECID7.js";import{Eb as c,Nb as k,Pa as i,Qa as q,ba as x,db as s,fa as T,fb as a,hb as I,jb as _,kb as l,lb as r,lc as F,mb as S,nb as g,ob as v,sb as P,ub as C,wa as U}from"./chunk-HTI5VKZI.js";import{g as w}from"./chunk-5G567QLT.js";function K(e,o){e&1&&S(0,"app-header",18),e&2&&a("title","Registro")("back",!0)("whereToBack","/sign-up/select")}function Q(e,o){e&1&&(l(0,"div",20),c(1,"El nombre es requerido"),r())}function X(e,o){e&1&&(l(0,"div",20),c(1,"El nombre debe tener 5 o m\xE1s car\xE1cteres y contener solo letras"),r())}function Y(e,o){if(e&1&&(g(0,8),s(1,Q,2,0,"div",19)(2,X,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.name.errors==null?null:t.form.controls.name.errors.required),i(),a("ngIf",!(t.form.controls.name.errors!=null&&t.form.controls.name.errors.required))}}function ee(e,o){e&1&&(l(0,"div",20),c(1,"El apellido es requerido"),r())}function te(e,o){e&1&&(l(0,"div",20),c(1,"El apellido debe tener 5 o m\xE1s car\xE1cteres"),r())}function ne(e,o){if(e&1&&(g(0,8),s(1,ee,2,0,"div",19)(2,te,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.lastName.errors==null?null:t.form.controls.lastName.errors.required),i(),a("ngIf",!(t.form.controls.lastName.errors!=null&&t.form.controls.lastName.errors.required))}}function ie(e,o){e&1&&(l(0,"div",20),c(1,"El dni es requerido"),r())}function oe(e,o){e&1&&(l(0,"div",20),c(1,"El dni debe tener entre 6 y 8 car\xE1cteres"),r())}function re(e,o){if(e&1&&(g(0,8),s(1,ie,2,0,"div",19)(2,oe,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.dni.errors==null?null:t.form.controls.dni.errors.required),i(),a("ngIf",!(t.form.controls.dni.errors!=null&&t.form.controls.dni.errors.required))}}function ae(e,o){e&1&&(l(0,"div",20),c(1,"La edad es requerida"),r())}function le(e,o){e&1&&(l(0,"div",20),c(1,"La edad acepta valores entre 0 y 100"),r())}function me(e,o){if(e&1&&(g(0,8),s(1,ae,2,0,"div",19)(2,le,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.age.errors==null?null:t.form.controls.age.errors.required),i(),a("ngIf",!(t.form.controls.age.errors!=null&&t.form.controls.age.errors.required))}}function pe(e,o){e&1&&(l(0,"div",20),c(1,"La obra social es requerida"),r())}function se(e,o){e&1&&(l(0,"div",20),c(1,"La obra social debe tener 4 o m\xE1s car\xE1cteres"),r())}function ce(e,o){if(e&1&&(g(0,8),s(1,pe,2,0,"div",19)(2,se,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.socialWork.errors==null?null:t.form.controls.socialWork.errors.required),i(),a("ngIf",!(t.form.controls.socialWork.errors!=null&&t.form.controls.socialWork.errors.required))}}function de(e,o){e&1&&(l(0,"div",20),c(1,"El correo es requerido"),r())}function ue(e,o){e&1&&(l(0,"div",20),c(1,"Ingrese un formato correcto"),r())}function fe(e,o){if(e&1&&(g(0,8),s(1,de,2,0,"div",19)(2,ue,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.email.errors==null?null:t.form.controls.email.errors.required),i(),a("ngIf",t.form.controls.email.errors==null?null:t.form.controls.email.errors.email)}}function _e(e,o){e&1&&(l(0,"div",20),c(1,"La contrase\xF1a es requerida"),r())}function ge(e,o){e&1&&(l(0,"div",20),c(1,"Debe tener 6 car\xE1cteres o m\xE1s"),r())}function ve(e,o){if(e&1&&(g(0,8),s(1,_e,2,0,"div",19)(2,ge,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.password.errors==null?null:t.form.controls.password.errors.required),i(),a("ngIf",t.form.controls.password.errors==null?null:t.form.controls.password.errors.email)}}function Ce(e,o){e&1&&(l(0,"div",20),c(1,"La imagen es requerida"),r())}function Se(e,o){if(e&1&&(g(0,8),s(1,Ce,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.profilePic.errors==null?null:t.form.controls.profilePic.errors.required)}}function he(e,o){e&1&&(l(0,"div",20),c(1,"La imagen es requerida"),r())}function Pe(e,o){if(e&1&&(g(0,8),s(1,he,2,0,"div",19),v()),e&2){let t=C();i(),a("ngIf",t.form.controls.profilePic2.errors==null?null:t.form.controls.profilePic2.errors.required)}}var De=(()=>{let o=class o{constructor(m){this.router=m,this.header=!0,this.esAdmin=!1,this.color="blue",this.patientUploaded=new U,this.fb=x(W),this.form=this.fb.group({uid:new f(""),name:new f("",[p.required,p.minLength(5),p.pattern("^[a-zA-Z]+$")]),lastName:new f("",[p.required,p.minLength(5),p.pattern("^[a-zA-Z]+$")]),dni:new f("",[p.required,p.minLength(6),p.maxLength(8)]),socialWork:new f("",[p.required,p.minLength(4)]),email:new f("",[p.required,p.email]),password:new f("",[p.required,p.minLength(6)]),profilePic:new f(null,[p.required]),profilePic2:new f(null,[p.required]),age:new f("",[p.required,p.min(0),p.max(100)])}),this.firebaseSvc=x(R),this.utilSvc=x(M)}get formControls(){return this.form.controls}onFileSelected(m,u){m.size>2097152?(console.log("El archivo es demasiado grande. El tama\xF1o m\xE1ximo permitido es 2 MB."),this.formControls[u].setValue(null)):this.formControls[u].setValue(m)}onSubmit(){return w(this,null,function*(){if(this.form.valid){let m=this.form.value,u=m.profilePic,n=m.profilePic2;if(u&&n){let h=[this.firebaseSvc.uploadImage(u,`profilePics/${m.name}_${m.dni}_1`),this.firebaseSvc.uploadImage(n,`profilePics/${m.name}_${m.dni}_2`)];Promise.all(h).then(([d,E])=>{if(d&&E){let b={uid:m.uid,name:m.name,lastName:m.lastName,dni:m.dni,socialWork:m.socialWork,email:m.email,profilePic:d,profilePic2:E,age:m.age};m.email&&m.password?this.firebaseSvc.signUp(m.email,m.password).then(y=>{let H=y.user;b.uid=H.uid,this.firebaseSvc.saveUserDataAsPatient(b).then(()=>{console.log("Paciente registrado con \xE9xito"),this.esAdmin==!1&&this.router.navigate(["./home"]),this.patientUploaded.emit(!0),this.form.reset()}).catch(J=>{console.error("Error al guardar los datos del paciente: ",J)})}).catch(y=>{console.error("Error al registrar el usuario: ",y)}):console.log("Faltan email o contrase\xF1a para registrar al paciente")}else console.error("No se pudieron obtener las URLs de las im\xE1genes")}).catch(d=>{console.error("Error al subir las im\xE1genes: ",d)})}else console.log("Las im\xE1genes no se han seleccionado correctamente")}else console.log("Formulario no v\xE1lido")})}allowOnlyLetters(m){/^[a-zA-Z ]+$/.test(m.key)||m.preventDefault()}onFileRemoved(){this.form.get("profilePic")?.setValue(null)}onFileRemoved2(){this.form.get("profilePic2")?.setValue(null)}onCaptchaOnSubmit(){return()=>this.onSubmit()}};o.\u0275fac=function(u){return new(u||o)(q(L))},o.\u0275cmp=T({type:o,selectors:[["app-sign-up-patient"]],inputs:{header:"header",esAdmin:"esAdmin",color:"color"},outputs:{patientUploaded:"patientUploaded"},standalone:!0,features:[k],decls:35,vars:24,consts:[[3,"title","back","whereToBack",4,"ngIf"],[1,"container"],[1,"d-flex-center","widht-100"],[3,"titulo","color"],[1,"d-flex-center","width-500"],[1,"auth-form"],[1,"margin-input"],["label","Nombre","type","text",3,"keypress","control"],[1,"validators-container"],["label","Apellido","type","text",3,"keypress","control"],["label","DNI","type","number",3,"control"],["label","EDAD","type","number",3,"control"],["label","OBRA SOCIAL","type","text",3,"control"],["label","Correo","type","email",3,"control"],["label","Contrase\xF1a","type","password",3,"control"],[1,"widht-100","d-flex-center"],["label","Selecciona tu imagen",3,"fileSelected","fileRemoved"],["mat-flat-button","","color","warn",1,"button-login",3,"disabled","appCaptcha","captchaTitle"],[3,"title","back","whereToBack"],["class","validators",4,"ngIf"],[1,"validators"]],template:function(u,n){u&1&&(s(0,K,1,3,"app-header",0),l(1,"div",1)(2,"div",2),S(3,"app-logo",3),r(),l(4,"div",4)(5,"form",5)(6,"div",6)(7,"app-custom-input",7),P("keypress",function(d){return n.allowOnlyLetters(d)}),r(),s(8,Y,3,2,"ng-container",8),r(),l(9,"div",6)(10,"app-custom-input",9),P("keypress",function(d){return n.allowOnlyLetters(d)}),r(),s(11,ne,3,2,"ng-container",8),r(),l(12,"div",6),S(13,"app-custom-input",10),s(14,re,3,2,"ng-container",8),r(),l(15,"div",6),S(16,"app-custom-input",11),s(17,me,3,2,"ng-container",8),r(),l(18,"div",6),S(19,"app-custom-input",12),s(20,ce,3,2,"ng-container",8),r(),l(21,"div",6),S(22,"app-custom-input",13),s(23,fe,3,2,"ng-container",8),r(),l(24,"div",6),S(25,"app-custom-input",14),s(26,ve,3,2,"ng-container",8),r(),l(27,"div",15)(28,"app-picture-input",16),P("fileSelected",function(d){return n.onFileSelected(d,"profilePic")})("fileRemoved",function(){return n.onFileRemoved()}),r(),s(29,Se,2,1,"ng-container",8),l(30,"app-picture-input",16),P("fileSelected",function(d){return n.onFileSelected(d,"profilePic2")})("fileRemoved",function(){return n.onFileRemoved2()}),r(),s(31,Pe,2,1,"ng-container",8),r(),l(32,"div",2)(33,"button",17),c(34," REGISTRARSE "),r()()()()()),u&2&&(a("ngIf",n.header),i(),I("body",n.header),i(2),a("titulo","Registro de Paciente")("color",n.color),i(4),a("control",n.form.controls.name),i(),_(8,n.form.controls.name.errors&&n.form.controls.name.touched?8:-1),i(2),a("control",n.form.controls.lastName),i(),_(11,n.form.controls.lastName.errors&&n.form.controls.lastName.touched?11:-1),i(2),a("control",n.form.controls.dni),i(),_(14,n.form.controls.dni.errors&&n.form.controls.dni.touched?14:-1),i(2),a("control",n.form.controls.age),i(),_(17,n.form.controls.age.errors&&n.form.controls.age.touched?17:-1),i(2),a("control",n.form.controls.socialWork),i(),_(20,n.form.controls.socialWork.errors&&n.form.controls.socialWork.touched?20:-1),i(2),a("control",n.form.controls.email),i(),_(23,n.form.controls.email.errors&&n.form.controls.email.touched?23:-1),i(2),a("control",n.form.controls.password),i(),_(26,n.form.controls.password.errors&&n.form.controls.password.touched?26:-1),i(3),_(29,n.form.controls.profilePic.errors&&n.form.controls.profilePic.touched?29:-1),i(2),_(31,n.form.controls.profilePic2.errors&&n.form.controls.profilePic2.touched?31:-1),i(2),a("disabled",n.form.invalid)("appCaptcha",n.onCaptchaOnSubmit())("captchaTitle","Por favor, resuelve este captcha antes de continuar:"))},dependencies:[V,$,j,O,B,D,N,z,A,F,Z,G],styles:['@charset "UTF-8";.d-flex[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;flex-wrap:wrap}.body[_ngcontent-%COMP%]{height:800px;margin-top:20px;background-position-y:-50px}body[_ngcontent-%COMP%]{position:relative;margin:0;font-family:Arial,sans-serif}.body[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:10px 0 0;background:url("./media/background-patient-HLLCCCEI.jpg");background-repeat:no-repeat;background-position-x:center;background-size:1875px;opacity:.2;z-index:-1}.d-flex-space-between[_ngcontent-%COMP%]{display:flex;align-content:space-between;justify-content:space-between}.margin-input[_ngcontent-%COMP%]{margin-top:40px}.button-login[_ngcontent-%COMP%]{padding:22px;margin-top:40px}.validators[_ngcontent-%COMP%]{font-size:15px;text-align:center;color:red}.width-500[_ngcontent-%COMP%], .auth-form[_ngcontent-%COMP%]{width:100%;display:flex;flex-wrap:wrap;justify-content:center}.margin-input[_ngcontent-%COMP%]{margin-right:40px;width:30%}.widht-100[_ngcontent-%COMP%]{width:100%}.widht-50[_ngcontent-%COMP%]{width:100%;display:flex}']});let e=o;return e})();export{De as a};
