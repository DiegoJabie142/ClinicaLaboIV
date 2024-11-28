import{a as V}from"./chunk-4QML42IX.js";import{a as F}from"./chunk-JUZHZSBE.js";import{h as k}from"./chunk-5PP5VR5I.js";import"./chunk-7YVO6NQX.js";import{L as O,Q as M}from"./chunk-YYGECID7.js";import{Eb as p,Fb as y,Gb as h,Na as C,Nb as I,Pa as r,ba as w,db as u,fa as T,fb as c,kb as s,kc as P,lb as l,lc as D,mb as _,pa as f,pb as v,qa as x,sb as b,ub as d,yb as S}from"./chunk-HTI5VKZI.js";import{e as j,g}from"./chunk-5G567QLT.js";var m=j(V());function $(e,o){e&1&&(s(0,"h1",8),p(1,` Seleccione el paciente para su turno:
`),l())}function z(e,o){if(e&1){let t=v();s(0,"div",11),b("click",function(){let i=f(t).$implicit,a=d(2);return x(a.selectPaciente(i))}),_(1,"img",12),s(2,"span"),p(3),l()()}if(e&2){let t=o.$implicit;r(),S("alt","Imagen de ",t.name,""),c("src",t.profilePic,C),r(2),y(t.name)}}function H(e,o){if(e&1&&(s(0,"div",9),u(1,z,4,4,"div",10),l()),e&2){let t=d();r(),c("ngForOf",t.pacientes)}}function U(e,o){if(e&1&&(s(0,"h3",8),p(1),l()),e&2){let t=d();r(),h("Paciente seleccionado: ",t.selectedPaciente.name,"")}}function L(e,o){e&1&&(s(0,"h1",8),p(1,` Seleccione el especialista para su turno:
`),l())}function N(e,o){if(e&1){let t=v();s(0,"div",11),b("click",function(){let i=f(t).$implicit,a=d(2);return x(a.selectEspecialista(i))}),_(1,"img",12),s(2,"span"),p(3),l()()}if(e&2){let t=o.$implicit;r(),S("alt","Imagen de ",t.name,""),c("src",t.profilePic,C),r(2),y(t.name)}}function A(e,o){if(e&1&&(s(0,"div",9),u(1,N,4,4,"div",10),l()),e&2){let t=d();r(),c("ngForOf",t.especialistas)}}function R(e,o){if(e&1){let t=v();s(0,"div",15),b("click",function(){let i=f(t).$implicit,a=d(2);return x(a.selectEspecialidad(i))}),_(1,"img",16),s(2,"span",17),p(3),l()()}if(e&2){let t=o.$implicit;r(),S("alt","Imagen de ",t.nombre,""),c("src",t.image||"https://www.rosario3.com/__export/1681168641925/sites/rosario3/img/2023/04/10/clinico.jpg",C),r(2),y(t.nombre)}}function J(e,o){if(e&1&&(s(0,"div")(1,"h3",8),p(2),l(),s(3,"div",13),u(4,R,4,4,"div",14),l()()),e&2){let t=d();r(2),h("Especialidades de ",t.selectedEspecialista.name,""),r(2),c("ngForOf",t.especialidades)}}function q(e,o){if(e&1){let t=v();s(0,"button",22),b("click",function(){let i=f(t).$implicit,a=d(2);return x(a.selectDia(i))}),p(1),l()}if(e&2){let t=o.$implicit;r(),h(" ",t," ")}}function B(e,o){if(e&1&&(s(0,"div",18)(1,"h3",19),p(2),l(),s(3,"div",20),u(4,q,2,1,"button",21),l()()),e&2){let t=d();r(2),h("D\xEDas disponibles para ",t.selectedEspecialidad,":"),r(2),c("ngForOf",t.diasDisponibles)}}function G(e,o){e&1&&(s(0,"div")(1,"p",23),p(2,"No hay d\xEDas disponibles."),l()())}function K(e,o){if(e&1&&(s(0,"button",27),p(1),s(2,"span"),p(3),l()()),e&2){let t=o.$implicit,n=d(2);c("appCaptcha",n.onCaptchaHorario(t))("captchaTitle","Por favor, resuelve este captcha antes de continuar:"),r(),h(" ",n.getFormattedTime(t.startTime)," "),r(2),y(n.getAmPm(t.startTime))}}function Q(e,o){if(e&1&&(s(0,"div",24)(1,"h3",19),p(2),l(),s(3,"div",25),u(4,K,4,4,"button",26),l()()),e&2){let t=d();r(2),h("Horarios disponibles para ",t.selectedDia,":"),r(2),c("ngForOf",t.horariosDiponibles)}}function W(e,o){e&1&&(s(0,"div",28)(1,"p",29),p(2,"No hay horarios disponibles para este d\xEDa."),l()())}var re=(()=>{let o=class o{constructor(){this.title="MyClinic",this.headerLinks=[],this.horariosFiltrados=[],this.especialistas=[],this.horariosDiponibles=[],this.pacientes=[],this.diasDisponibles=[],this.selectedEspecialista=null,this.selectedPaciente=null,this.especialidades=[],this.selectedEspecialidad=null,this.horariosDisponibles=[],this.horariosPorDia=[],this.selectedDia=null,this.firebaseSvc=w(M),this.utilSvc=w(O),this.isLoggedIn=!1,this.role=""}getFormattedTime(n){let i=parseInt(n.split(":")[0],10),a=n.split(":")[1],E=i;return i>12?E=i-12:i===0&&(E=12),`${E}:${a}`}getAmPm(n){let i=parseInt(n.split(":")[0],10);return i<12||i===0?"AM":"PM"}ngOnInit(){return g(this,null,function*(){this.getEspecialistas(),this.role=this.getRoleFromLocalStorage(),this.role=="administrador"&&this.getPacientes()})}getEspecialistas(){return g(this,null,function*(){this.especialistas=yield this.firebaseSvc.getEspecialistas()})}getPacientes(){return g(this,null,function*(){this.pacientes=yield this.firebaseSvc.getPacientes()})}getRoleFromLocalStorage(){try{let n=localStorage.getItem("user");return n&&JSON.parse(n).role||null}catch(n){return console.error("Error al obtener el rol del usuario desde localStorage:",n),null}}getEspecialidadImage(n){return n?.image||"path/to/default-image.jpg"}selectEspecialista(n){return g(this,null,function*(){try{this.selectedEspecialista=n;let i=yield this.firebaseSvc.getSpecialties();this.especialidades=i.filter(a=>n.specialities.includes(a.nombre))}catch(i){console.error("Error al seleccionar el especialista:",i)}this.selectedEspecialidad=null})}selectPaciente(n){return g(this,null,function*(){try{this.selectedPaciente=n}catch(i){console.error("Error al seleccionar el especialista:",i)}this.selectedEspecialista=null})}selectEspecialidad(n){return g(this,null,function*(){if(this.selectedEspecialista)try{this.diasDisponibles=yield this.firebaseSvc.getDiasDisponiblesEspecialista(this.selectedEspecialista.uid)}catch(i){console.error("Error al cargar los horarios disponibles:",i)}this.selectedEspecialidad=n.nombre,this.selectedDia=null})}selectDia(n){return g(this,null,function*(){try{this.selectedDia=n,m.default.fire({title:"Cargando horarios",text:"Por favor, espera...",allowOutsideClick:!1,didOpen:()=>{m.default.showLoading()}});let i=yield this.firebaseSvc.getDuracionEspecialidad(this.selectedEspecialista.uid,this.selectedEspecialidad);this.horariosDiponibles=yield this.firebaseSvc.getHorariosDisponibles(this.selectedEspecialista.uid,n,i),m.default.close()}catch(i){console.error("Error al seleccionar el d\xEDa:",i),m.default.close(),m.default.fire({icon:"error",title:"Error",text:"Ocurri\xF3 un problema al cargar los horarios. Intenta de nuevo."})}})}seleccionarHorario(n){return g(this,null,function*(){try{m.default.fire({title:"Reservando horario",text:"Por favor, espera...",allowOutsideClick:!1,didOpen:()=>{m.default.showLoading()}});let i=JSON.parse(localStorage.getItem("user")||"{}"),a=this.role==="administrador"?this.selectedPaciente?.uid:i?.uid;this.selectedDia&&(yield this.firebaseSvc.reservarHorarioTurno(this.selectedEspecialista.uid,this.selectedDia,n,a,this.selectedEspecialidad),m.default.close(),m.default.fire({icon:"success",title:"Turno reservado",text:"El turno ha sido reservado exitosamente."})),this.selectedEspecialidad=null}catch(i){console.error("Error al reservar el horario:",i),m.default.close(),m.default.fire({icon:"error",title:"Error",text:"Ocurri\xF3 un problema al reservar el turno. Intenta de nuevo."})}this.horariosDiponibles=[],this.selectedEspecialidad=null,this.selectedDia=null})}onCaptchaHorario(n){return()=>this.seleccionarHorario(n)}};o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=T({type:o,selectors:[["app-solicitar-turno"]],standalone:!0,features:[I],decls:12,vars:11,consts:[[3,"title"],["style","width: 100%; display: flex; align-items: center; justify-content: center; margin-top: 50px; font-weight: 600;",4,"ngIf"],["class","especialistas-container",4,"ngIf"],[4,"ngIf"],["style","padding-bottom: 50px;",4,"ngIf"],[2,"width","100%","display","flex","justify-content","center"],["style","padding-bottom: 100px; width: 740px;",4,"ngIf"],["style","font-size: 25px; margin-bottom:50px;",4,"ngIf"],[2,"width","100%","display","flex","align-items","center","justify-content","center","margin-top","50px","font-weight","600"],[1,"especialistas-container"],["class","especialista-button",3,"click",4,"ngFor","ngForOf"],[1,"especialista-button",3,"click"],[1,"especialista-img",3,"src","alt"],[1,"especialidades-container"],["class","especialidad-button","style","height: 200px;",3,"click",4,"ngFor","ngForOf"],[1,"especialidad-button",2,"height","200px",3,"click"],[1,"especialidad-img",3,"src","alt"],[2,"margin-top","30px"],[2,"padding-bottom","50px"],[2,"text-align","center","margin-top","20px","font-weight","600"],[1,"dias-container"],["class","dia-button",3,"click",4,"ngFor","ngForOf"],[1,"dia-button",3,"click"],[2,"text-align","center","margin-top","20px","font-weight","500","font-size","25px","margin-top","50px"],[2,"padding-bottom","100px","width","740px"],[1,"horarios-container"],["class","horario-button",3,"appCaptcha","captchaTitle",4,"ngFor","ngForOf"],[1,"horario-button",3,"appCaptcha","captchaTitle"],[2,"font-size","25px","margin-bottom","50px"],[2,"text-align","center","margin-top","20px","font-weight","500","margin-top","50px","font-size","25px","padding-bottom","50px"]],template:function(i,a){i&1&&(_(0,"app-header",0),u(1,$,2,0,"h1",1)(2,H,2,1,"div",2)(3,U,2,1,"h3",1)(4,L,2,0,"h1",1)(5,A,2,1,"div",2)(6,J,5,2,"div",3)(7,B,5,2,"div",4)(8,G,3,0,"div",3),s(9,"div",5),u(10,Q,5,2,"div",6),l(),u(11,W,3,0,"div",7)),i&2&&(c("title","MyClinic"),r(),c("ngIf",a.role=="administrador"),r(),c("ngIf",a.role=="administrador"),r(),c("ngIf",a.selectedPaciente),r(),c("ngIf",a.role!="administrador"||a.selectedPaciente),r(),c("ngIf",a.role!="administrador"||a.selectedPaciente),r(),c("ngIf",a.selectedEspecialista),r(),c("ngIf",a.diasDisponibles.length>0&&a.selectedEspecialidad),r(),c("ngIf",a.diasDisponibles.length===0&&a.selectedEspecialidad),r(2),c("ngIf",a.selectedEspecialidad&&a.selectedDia&&a.horariosDiponibles),r(),c("ngIf",a.selectedDia&&(!a.horariosDiponibles||a.horariosDiponibles.length===0)))},dependencies:[k,D,P,F],styles:['@charset "UTF-8";.especialistas-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:20px;margin-top:50px}.especialista-button[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin:10px;padding:15px;background-color:#f0f0f0;border-radius:8px;cursor:pointer;width:150px;text-align:center}.especialista-img[_ngcontent-%COMP%]{width:100px;height:100px;border-radius:50%;object-fit:cover;margin-bottom:10px}.especialista-button[_ngcontent-%COMP%]:hover{background-color:#e0e0e0}.especialidades-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:20px;margin-top:20px}.especialistas-container[_ngcontent-%COMP%], .especialidades-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}.especialidades-container[_ngcontent-%COMP%]{padding-bottom:50px}.especialista-button[_ngcontent-%COMP%], .especialidad-button[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:10px;border-radius:10px;border:1px solid #ccc;cursor:pointer;width:150px;height:150px;text-align:center}.especialista-img[_ngcontent-%COMP%], .especialidad-img[_ngcontent-%COMP%]{width:100px;height:100px;border-radius:50%;object-fit:cover;margin-bottom:10px}.dias-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:20px}.dia-button[_ngcontent-%COMP%]{width:150px;height:100px;background-color:#4caf50;color:#fff;border:none;border-radius:5px;font-size:16px;font-weight:600;cursor:pointer;text-align:center}.dia-button[_ngcontent-%COMP%]:hover{background-color:#45a049}.horarios-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:20px}.horario-button[_ngcontent-%COMP%]{padding:10px 20px;background-color:#2196f3;color:#fff;border:none;border-radius:20px;font-size:16px;font-weight:600;cursor:pointer;width:150px}.horario-button[_ngcontent-%COMP%]:hover{background-color:#1e88e5}']});let e=o;return e})();export{re as SolicitarTurnoComponent};