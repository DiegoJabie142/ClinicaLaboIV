import{a as ne}from"./chunk-EA54IHKH.js";import{d as Q,f as X,j as Z,s as K,z as ee}from"./chunk-JAPQ2JVT.js";import{C as Y}from"./chunk-LWEM5HZJ.js";import{Ab as s,Jb as p,Kb as y,Lb as L,Ob as I,Pb as B,Qb as V,Sb as R,Va as l,Vb as A,Wb as $,Xb as j,a as F,e as te,g as k,ia as H,jb as g,lb as u,ma as q,nc as D,oc as U,pc as W,qb as a,rb as r,rc as G,sb as N,sc as J,va as _,vb as h,wa as f,yb as x}from"./chunk-JWOBJSOL.js";var d=te(ne());var oe=(i,c,t,n,e,o)=>({disponible:i,pendiente:c,aceptado:t,rechazado:n,cancelado:e,finalizado:o});function ie(i,c){if(i&1){let t=h();a(0,"input",8),V("ngModelChange",function(e){_(t);let o=s();return B(o.terminoBusqueda,e)||(o.terminoBusqueda=e),f(e)}),x("input",function(){_(t);let e=s();return f(e.aplicarFiltroEspecialista())}),r()}if(i&2){let t=s();I("ngModel",t.terminoBusqueda)}}function re(i,c){if(i&1){let t=h();a(0,"input",9),V("ngModelChange",function(e){_(t);let o=s();return B(o.terminoBusqueda,e)||(o.terminoBusqueda=e),f(e)}),x("input",function(){_(t);let e=s();return f(e.aplicarFiltro())}),r()}if(i&2){let t=s();I("ngModel",t.terminoBusqueda)}}function ae(i,c){i&1&&(a(0,"th"),p(1,"Reservado por"),r())}function ce(i,c){i&1&&(a(0,"th"),p(1,"Especialista"),r())}function le(i,c){i&1&&(a(0,"th"),p(1,"Rese\xF1a"),r())}function se(i,c){i&1&&(a(0,"th"),p(1,"Encuesta"),r())}function pe(i,c){i&1&&(a(0,"th"),p(1,"Califacar"),r())}function ue(i,c){if(i&1){let t=h();a(0,"div",18)(1,"button",19),x("click",function(){_(t);let e=s().$implicit,o=s(2);return f(o.aceptar(e))}),p(2," \u2714\uFE0F "),r(),a(3,"button",20),x("click",function(){_(t);let e=s().$implicit,o=s(2);return f(o.rechazar(e))}),a(4,"span",21),p(5,"X"),r()()()}}function de(i,c){if(i&1){let t=h();a(0,"div",22)(1,"button",23),x("click",function(){_(t);let e=s().$implicit,o=s(2);return f(o.finalizar(e))}),p(2," FINALIZAR "),r()()}}function me(i,c){if(i&1){let t=h();a(0,"div",22)(1,"button",23),x("click",function(){_(t);let e=s().$implicit,o=s(2);return f(o.cancelarPaciente(e))}),p(2," CANCELAR "),r()()}}function _e(i,c){if(i&1){let t=h();a(0,"div",22)(1,"button",23),x("click",function(){_(t);let e=s().$implicit,o=s(2);return f(o.cancelarAdmin(e))}),p(2," CANCELAR "),r()()}}function fe(i,c){if(i&1&&(a(0,"td"),p(1),r()),i&2){let t=s().$implicit;l(),y(t.pacienteNombre?t.pacienteNombre:"No reservado")}}function be(i,c){if(i&1&&(a(0,"td"),p(1),r()),i&2){let t=s().$implicit;l(),y(t.especialistaNombre?t.especialistaNombre:"No reservado")}}function xe(i,c){if(i&1){let t=h();a(0,"button",24),x("click",function(){_(t);let e=s().$implicit,o=s(2);return f(o.verComentario(e.comentario))}),p(1," Ver Comentario "),r()}}function ge(i,c){i&1&&(a(0,"button",25),p(1," Ver comentario "),r())}function he(i,c){if(i&1){let t=h();a(0,"button",27),x("click",function(){_(t);let e=s(2).$implicit,o=s(2);return f(o.verResenia(e.resenia))}),p(1," Ver rese\xF1a "),r()}}function Ce(i,c){i&1&&(a(0,"button",25),p(1," Ver rese\xF1a "),r())}function Me(i,c){if(i&1&&(a(0,"td"),g(1,he,2,0,"button",26)(2,Ce,2,0,"button",17),r()),i&2){let t=s().$implicit;l(),u("ngIf",t.resenia&&t.resenia.trim()!==""),l(),u("ngIf",!t.resenia)}}function ve(i,c){if(i&1){let t=h();a(0,"button",30),x("click",function(){_(t);let e=s(2).$implicit,o=s(2);return f(o.completarEncuestaPaciente(e))}),p(1," Completar encuesta "),r()}}function Te(i,c){if(i&1){let t=h();a(0,"button",31),x("click",function(){_(t);let e=s(2).$implicit,o=s(2);return f(o.verEncuesta(e.encuesta))}),p(1," Ver encuesta "),r()}}function Pe(i,c){i&1&&(a(0,"button",25),p(1," Completar encuesta "),r())}function ye(i,c){if(i&1&&(a(0,"td"),g(1,ve,2,0,"button",28)(2,Te,2,0,"button",29)(3,Pe,2,0,"button",17),r()),i&2){let t=s().$implicit;l(),u("ngIf",t.status=="finalizado"&&t.encuesta==""),l(),u("ngIf",t.encuesta!=""),l(),u("ngIf",t.status!="finalizado")}}function we(i,c){if(i&1){let t=h();a(0,"button",33),x("click",function(){_(t);let e=s(2).$implicit,o=s(2);return f(o.completarCalifacionPaciente(e))}),p(1," Calificar "),r()}}function Ee(i,c){if(i&1){let t=h();a(0,"button",33),x("click",function(){_(t);let e=s(2).$implicit,o=s(2);return f(o.verCalifacion(e.calificacion))}),p(1," Ver calificaci\xF3n "),r()}}function ke(i,c){i&1&&(a(0,"button",25),p(1," Calificar "),r())}function Oe(i,c){if(i&1&&(a(0,"td"),g(1,we,2,0,"button",32)(2,Ee,2,0,"button",32)(3,ke,2,0,"button",17),r()),i&2){let t=s().$implicit;l(),u("ngIf",t.status=="finalizado"&&t.calificacion==""),l(),u("ngIf",t.calificacion!=""),l(),u("ngIf",t.status!="finalizado")}}function Se(i,c){if(i&1&&(a(0,"tr")(1,"td"),p(2),r(),a(3,"td"),p(4),r(),a(5,"td"),p(6),r(),a(7,"td"),p(8),r(),a(9,"td",12)(10,"span",13),p(11),$(12,"titlecase"),r(),g(13,ue,6,0,"div",14)(14,de,3,0,"div",15)(15,me,3,0,"div",15)(16,_e,3,0,"div",15),r(),g(17,fe,2,1,"td",7)(18,be,2,1,"td",7),a(19,"td"),g(20,xe,2,0,"button",16)(21,ge,2,0,"button",17),r(),g(22,Me,3,2,"td",7)(23,ye,4,3,"td",7)(24,Oe,4,3,"td",7),r()),i&2){let t=c.$implicit,n=s(2);l(2),y(t.date),l(2),y(t.start),l(2),y(t.end),l(2),y(t.especialidad),l(2),u("ngClass",A(19,oe,t.status==="disponible",t.status==="pendiente",t.status==="aceptado",t.status==="rechazado",t.status==="cancelado",t.status==="finalizado")),l(),L(" ",j(12,17,t.status)," "),l(2),u("ngIf",t.status==="pendiente"&&n.role=="especialista"),l(),u("ngIf",t.status==="aceptado"&&n.role=="especialista"),l(),u("ngIf",n.role==="paciente"&&(t.status=="aceptado"||t.status=="pendiente")),l(),u("ngIf",n.role==="administrador"&&(t.status=="aceptado"||t.status=="pendiente")),l(),u("ngIf",n.role=="especialista"),l(),u("ngIf",n.role=="paciente"||n.role=="administrador"),l(2),u("ngIf",t.comentario&&t.comentario.trim()!==""),l(),u("ngIf",!t.comentario),l(),u("ngIf",n.role!="administrador"),l(),u("ngIf",n.role=="paciente"),l(),u("ngIf",n.role=="paciente")}}function ze(i,c){if(i&1&&(a(0,"table",10)(1,"thead")(2,"tr")(3,"th"),p(4,"D\xEDa"),r(),a(5,"th"),p(6,"Inicio"),r(),a(7,"th"),p(8,"Fin"),r(),a(9,"th"),p(10,"Especialidad"),r(),a(11,"th"),p(12,"Estado"),r(),g(13,ae,2,0,"th",7)(14,ce,2,0,"th",7),a(15,"th"),p(16,"Comentario"),r(),g(17,le,2,0,"th",7)(18,se,2,0,"th",7)(19,pe,2,0,"th",7),r()(),a(20,"tbody"),g(21,Se,25,26,"tr",11),r()()),i&2){let t=s();l(13),u("ngIf",t.role=="especialista"),l(),u("ngIf",t.role=="paciente"||t.role=="administrador"),l(3),u("ngIf",t.role!="administrador"),l(),u("ngIf",t.role=="paciente"),l(),u("ngIf",t.role=="paciente"),l(2),u("ngForOf",t.horariosFiltrados)}}function Ie(i,c){i&1&&(a(0,"p"),p(1,"No tienes turnos reservados."),r())}var $e=(()=>{let c=class c{set horariosFiltrados(n){this._horariosFiltrados=n,this.role=="especialista"?this.aplicarFiltroEspecialista():this.aplicarFiltro()}get horariosFiltrados(){return this._horariosFiltrados}constructor(){this.horarios=[],this.uid="",this.role="",this.title="MyClinic",this.headerLinks=[],this.currentDate=new Date,this.horariosConPaciente=[],this.mostrarConfirmacion=!1,this.isLoggedIn=!1,this.firebaseSvc=H(Y),this._horariosFiltrados=[],this.terminoBusqueda=""}ngOnInit(){return k(this,null,function*(){this.role=this.getRoleFromLocalStorage(),this.updateHeaderLinks(),this.isLoggedIn=yield this.estaLoggeado(),this.getUidFromLocalStorage(),yield this.loadHorarios(),this.horariosFiltrados=[...this.horariosConPaciente]})}aplicarFiltro(){let n=this.terminoBusqueda.toLowerCase().trim();this.horariosFiltrados=this.horariosConPaciente.filter(e=>{let o=e.especialidad?.toLowerCase()||"",m=e.especialistaNombre?.toLowerCase()||"";return o.includes(n)||m.includes(n)})}aplicarFiltroEspecialista(){let n=this.terminoBusqueda.toLowerCase().trim();this.horariosFiltrados=this.horariosConPaciente.filter(e=>{let o=e.especialidad?.toLowerCase()||"",m=e.pacienteNombre?.toLowerCase()||"";return o.includes(n)||m.includes(n)})}estaLoggeado(){return k(this,null,function*(){return yield this.firebaseSvc.isUserLoggedIn()})}updateHeaderLinks(){this.role==="administrador"?this.headerLinks=[{label:"Mi Perfil",route:"/mi-perfil"},{label:"Secci\xF3n Usuarios",route:"/users"},{label:"Configuraci\xF3n",route:"/admin-settings"}]:this.role==="especialista"?this.headerLinks=[{label:"Home",route:"/home"},{label:"Mi Perfil",route:"/mi-perfil"}]:this.role==="paciente"?this.headerLinks=[{label:"Mi Perfil",route:"/mi-perfil"},{label:"Mi Historial",route:"/history"},{label:"Reservar Cita",route:"/book-appointment"}]:this.headerLinks=[{label:"Iniciar Sesi\xF3n",route:"/login"},{label:"Registrarse",route:"/sign-up/select"}]}getUidFromLocalStorage(){let n=JSON.parse(localStorage.getItem("user")||"{}");n&&n.uid?this.uid=n.uid:console.error("UID no encontrado en localStorage")}getRoleFromLocalStorage(){try{let n=localStorage.getItem("user");return n&&JSON.parse(n).role||null}catch(n){return console.error("Error al obtener el rol del usuario desde localStorage:",n),null}}loadHorarios(){return k(this,null,function*(){if(this.uid)try{this.role=="especialista"?this.horarios=yield this.firebaseSvc.getEspecialistaHorarios(this.uid):this.role=="administrador"?this.horarios=yield this.firebaseSvc.getAdminHorarios():this.role=="paciente"&&(this.horarios=yield this.firebaseSvc.getPacienteHorarios(this.uid))}catch(e){console.error("Error al cargar los horarios",e)}else console.error("No se puede cargar los horarios porque no hay UID");this.horariosConPaciente=this.horarios.filter(e=>e.pacienteId);let n=yield Promise.all(this.horariosConPaciente.map(e=>k(this,null,function*(){return e.rese\u00F1a&&(e.resenia=e.rese\u00F1a),e.pacienteId?e.pacienteNombre=yield this.firebaseSvc.getPacienteNombre(e.pacienteId):e.pacienteNombre="No reservado",(this.role=="paciente"||this.role=="administrador")&&(e.especialistaNombre=yield this.firebaseSvc.getEspecialistaNombre(e.especialistaId)),e})));this.horariosConPaciente=n,this.horariosFiltrados=[...this.horariosConPaciente]})}rechazar(n){d.default.fire({title:"\xBFQu\xE9 deseas hacer con el turno?",text:"Elige una opci\xF3n para proceder.",icon:"warning",showCancelButton:!0,showDenyButton:!0,confirmButtonText:"Rechazar Turno",cancelButtonText:"No hacer nada",denyButtonText:"Cancelar Turno",customClass:{confirmButton:"swal-button-rechazar",cancelButton:"swal-button-cancelar",denyButton:"swal-button-no-hacer-nada"}}).then(e=>{e.isConfirmed?d.default.fire({title:"Raz\xF3n del rechazo",input:"textarea",inputPlaceholder:"Escribe la raz\xF3n aqu\xED...",inputAttributes:{"aria-label":"Escribe la raz\xF3n aqu\xED"},showCancelButton:!0,confirmButtonText:"Guardar raz\xF3n",cancelButtonText:"Cancelar",inputValidator:o=>o?null:"Por favor, escribe una raz\xF3n."}).then(o=>{if(o.isConfirmed){let m=o.value;console.log("Raz\xF3n del rechazo:",m),this.firebaseSvc.rechazarHorario(this.uid,n,"Rechazado por el especialista. Raz\xF3n: "+m).then(()=>{this.loadHorarios()})}}):e.isDenied&&d.default.fire({title:"Raz\xF3n del cancelamiento",input:"textarea",inputPlaceholder:"Escribe la raz\xF3n aqu\xED...",inputAttributes:{"aria-label":"Escribe la raz\xF3n aqu\xED"},showCancelButton:!0,confirmButtonText:"Guardar raz\xF3n",cancelButtonText:"Cancelar",inputValidator:o=>o?null:"Por favor, escribe una raz\xF3n."}).then(o=>{if(o.isConfirmed){let m=o.value;this.firebaseSvc.cancelarHorario(this.uid,n,"Cancelado por el especialista. Raz\xF3n: "+m).then(()=>{this.loadHorarios()})}})})}cancelarPaciente(n){d.default.fire({title:"Cancelar Turno",text:"Por favor, ingresa una raz\xF3n antes de cancelar el turno.",input:"textarea",inputPlaceholder:"Escribe tu comentario aqu\xED...",showCancelButton:!0,confirmButtonText:"Cancelar turno",cancelButtonText:"Cancelar",confirmButtonColor:"red",preConfirm:e=>e.trim()?e:(d.default.showValidationMessage("El comentario es obligatoria"),!1)}).then(e=>{if(e.isConfirmed){let o=e.value;this.firebaseSvc.cancelarHorario(n.especialistaId,n,"Cancelado por el paciente. Raz\xF3n: "+o).then(()=>{this.loadHorarios()}).catch(m=>{console.error("Error al finalizar el turno:",m),d.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})}cancelarAdmin(n){d.default.fire({title:"Cancelar Turno",text:"Por favor, ingresa una raz\xF3n antes de cancelar el turno.",input:"textarea",inputPlaceholder:"Escribe tu comentario aqu\xED...",showCancelButton:!0,confirmButtonText:"Cancelar Turno",cancelButtonText:"Cancelar",confirmButtonColor:"red",preConfirm:e=>e.trim()?e:(d.default.showValidationMessage("El comentario es obligatoria"),!1)}).then(e=>{if(e.isConfirmed){let o=e.value;this.firebaseSvc.cancelarHorario(n.especialistaId,n,"Cancelado por el admin. Raz\xF3n: "+o).then(()=>{this.loadHorarios()}).catch(m=>{console.error("Error al finalizar el turno:",m),d.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})}completarEncuestaPaciente(n){d.default.fire({title:"Encuesta",text:"\xBFRecomendar\xEDa esta cl\xEDnica con alguien m\xE1s?",input:"textarea",inputPlaceholder:"Escribe tu respuesta aqu\xED...",showCancelButton:!0,confirmButtonText:"Finalizar Encuesta",cancelButtonText:"Cancelar",confirmButtonColor:"red",preConfirm:e=>e.trim()?e:(d.default.showValidationMessage("El comentario es obligatoria"),!1)}).then(e=>{if(e.isConfirmed){let o=e.value;this.firebaseSvc.completarEncuestaHorario(n.especialistaId,n,o).then(()=>{this.loadHorarios()}).catch(m=>{console.error("Error al finalizar la encuesta:",m),d.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})}completarCalifacionPaciente(n){d.default.fire({title:"Califique al especialista",text:"Deje un comentario de como fue la atenci\xF3n del especialista.",input:"textarea",inputPlaceholder:"Escribe tu respuesta aqu\xED...",showCancelButton:!0,confirmButtonText:"Finalizar Calificaci\xF3n",cancelButtonText:"Cancelar",confirmButtonColor:"red",preConfirm:e=>e.trim()?e:(d.default.showValidationMessage("El comentario es obligatoria"),!1)}).then(e=>{if(e.isConfirmed){let o=e.value;this.firebaseSvc.completarCalificacionHorario(n.especialistaId,n,o).then(()=>{this.loadHorarios()}).catch(m=>{console.error("Error al finalizar la encuesta:",m),d.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})}verComentario(n){d.default.fire({title:"Comentario",text:n,icon:"info",confirmButtonText:"Cerrar"})}verResenia(n){d.default.fire({title:"Rese\xF1a",text:n,icon:"info",confirmButtonText:"Cerrar"})}verEncuesta(n){d.default.fire({title:"Encuesta",text:n,icon:"info",confirmButtonText:"Cerrar"})}verCalifacion(n){d.default.fire({title:"Calificaci\xF3n",text:n,icon:"info",confirmButtonText:"Cerrar"})}aceptar(n){d.default.fire({title:"\xBFEst\xE1s seguro de aceptar el turno?",text:"Una vez aceptado, no podr\xE1s modificarlo.",icon:"question",showCancelButton:!0,confirmButtonText:"Aceptar turno",cancelButtonText:"Cancelar operaci\xF3n",customClass:{confirmButton:"swal-button-aceptar",cancelButton:"swal-button-cancelar"}}).then(e=>{e.isConfirmed&&(console.log("Turno aceptado:",n),this.firebaseSvc.aceptarHorario(this.uid,n).then(()=>{this.loadHorarios()}))})}finalizar(n){d.default.fire({title:"Finalizar Turno",text:"Por favor, ingresa una rese\xF1a y los datos de la historia cl\xEDnica antes de finalizar el turno.",input:"textarea",inputPlaceholder:"Escribe tu rese\xF1a aqu\xED...",showCancelButton:!0,confirmButtonText:"Finalizar Turno",confirmButtonColor:"#28a745",cancelButtonText:"Cancelar",cancelButtonColor:"#d33",preConfirm:e=>e.trim()?e:(d.default.showValidationMessage("La rese\xF1a es obligatoria"),!1),inputAttributes:{"aria-label":"Escribe la rese\xF1a del turno aqu\xED"},didOpen:()=>{let e=d.default.getPopup();if(e){let o=document.createElement("form"),m=document.createElement("input");m.type="number",m.placeholder="Altura (cm)",m.required=!0;let v=document.createElement("input");v.type="number",v.placeholder="Peso (kg)",v.required=!0;let T=document.createElement("input");T.type="number",T.placeholder="Temperatura (\xB0C)",T.required=!0;let P=document.createElement("input");P.type="text",P.placeholder="Presi\xF3n (mmHg)",P.required=!0,o.appendChild(m),o.appendChild(v),o.appendChild(T),o.appendChild(P);for(let b=0;b<3;b++){let S=document.createElement("input");S.type="text",S.placeholder=`Clave ${b+1} (Ej: caries)`;let z=document.createElement("input");z.type="text",z.placeholder=`Valor ${b+1} (Ej: 4)`;let E=document.createElement("div");E.style.display="flex",E.style.gap="10px",E.appendChild(S),E.appendChild(z),o.appendChild(E)}o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",o.style.maxWidth="300px",o.style.margin="auto",o.querySelectorAll("input").forEach(b=>{b.style.width="100%",b.style.padding="10px",b.style.marginBottom="10px",b.style.border="1px solid #ccc",b.style.borderRadius="5px",b.style.fontSize="14px"}),e.appendChild(o);let C=document.createElement("div");C.style.display="flex",C.style.justifyContent="center",C.style.gap="10px",C.style.marginTop="20px";let M=d.default.getConfirmButton(),w=d.default.getCancelButton();M&&w&&(C.appendChild(M),C.appendChild(w),e.appendChild(C))}else console.error("No se pudo acceder al popup de SweetAlert")}}).then(e=>{if(e.isConfirmed){let o=e.value;console.log("Rese\xF1a del turno:",o);let m=document.querySelector('input[placeholder="Altura (cm)"]').value,v=document.querySelector('input[placeholder="Peso (kg)"]').value,T=document.querySelector('input[placeholder="Temperatura (\xB0C)"]').value,P=document.querySelector('input[placeholder="Presi\xF3n (mmHg)"]').value,O={};for(let M=0;M<3;M++){let w=document.querySelector(`input[placeholder="Clave ${M+1} (Ej: caries)"]`).value,b=document.querySelector(`input[placeholder="Valor ${M+1} (Ej: 4)"]`).value;w&&b&&(O[w]=b)}if(!m||!v||!T||!P){d.default.fire({title:"Error",text:"Todos los campos fijos de la historia cl\xEDnica son obligatorios.",icon:"error",confirmButtonText:"Cerrar"});return}let C=F({altura:parseFloat(m),peso:parseFloat(v),temperatura:parseFloat(T),presion:P},O);this.firebaseSvc.finalizarHorario(this.uid,n,o,C).then(()=>{this.loadHorarios()}).catch(M=>{console.error("Error al finalizar el turno:",M),d.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})}};c.\u0275fac=function(e){return new(e||c)},c.\u0275cmp=q({type:c,selectors:[["app-mis-turnos"]],standalone:!0,features:[R],decls:11,vars:5,consts:[[3,"title"],[1,"d-flex","w-100",2,"justify-content","center","margin-top","50px"],[1,"w-80","mb-50"],[1,"filter-container","mb-3"],["type","text","placeholder","Filtrar por paciente o especialidad...","class","search-input",3,"ngModel","ngModelChange","input",4,"ngIf"],["type","text","placeholder","Filtrar por especialista o especialidad...","class","search-input",3,"ngModel","ngModelChange","input",4,"ngIf"],["class","horarios-table",4,"ngIf"],[4,"ngIf"],["type","text","placeholder","Filtrar por paciente o especialidad...",1,"search-input",3,"ngModelChange","input","ngModel"],["type","text","placeholder","Filtrar por especialista o especialidad...",1,"search-input",3,"ngModelChange","input","ngModel"],[1,"horarios-table"],[4,"ngFor","ngForOf"],[1,"horario-cell"],[3,"ngClass"],["class","buttons-container",4,"ngIf"],["class","button-container",4,"ngIf"],["class","btn btn-ver-comentario","style","background-color: rgb(58, 57, 57);",3,"click",4,"ngIf"],["class","btn btn-ver-comentario-disabled","disabled","",4,"ngIf"],[1,"buttons-container"],["aria-label","Aceptar",3,"click"],["aria-label","Rechazar",3,"click"],[1,"cruz-roja"],[1,"button-container"],["aria-label","Finalizar",1,"finalizar-btn",3,"click"],[1,"btn","btn-ver-comentario",2,"background-color","rgb(58, 57, 57)",3,"click"],["disabled","",1,"btn","btn-ver-comentario-disabled"],["style","background-color: blue;","class","btn btn-ver-comentario",3,"click",4,"ngIf"],[1,"btn","btn-ver-comentario",2,"background-color","blue",3,"click"],["class","btn btn-ver-comentario","style","background-color:rgb(255, 0, 255)",3,"click",4,"ngIf"],["class","btn btn-ver-comentario-disabled","style","background-color:rgb(255, 0, 255)",3,"click",4,"ngIf"],[1,"btn","btn-ver-comentario",2,"background-color","rgb(255, 0, 255)",3,"click"],[1,"btn","btn-ver-comentario-disabled",2,"background-color","rgb(255, 0, 255)",3,"click"],["class","btn btn-ver-comentario","style","background-color: rgb(136, 136, 0);",3,"click",4,"ngIf"],[1,"btn","btn-ver-comentario",2,"background-color","rgb(136, 136, 0)",3,"click"]],template:function(e,o){e&1&&(N(0,"app-header",0),a(1,"div",1)(2,"h1"),p(3,"TUS TURNOS"),r()(),a(4,"div",2)(5,"div",3),g(6,ie,1,1,"input",4)(7,re,1,1,"input",5),r(),a(8,"div",2),g(9,ze,22,6,"table",6)(10,Ie,2,0,"p",7),r()()),e&2&&(u("title","MyClinic"),l(6),u("ngIf",o.role=="especialista"),l(),u("ngIf",o.role!="especialista"),l(2),u("ngIf",o.horariosConPaciente.length>0),l(),u("ngIf",o.horariosConPaciente.length===0))},dependencies:[U,W,K,Q,X,Z,ee,J,D,G],styles:['@charset "UTF-8";.horarios-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.month-columns[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%;max-width:1400px}.month-column[_ngcontent-%COMP%]{flex:1;margin:0 10px}.month-container[_ngcontent-%COMP%]{width:700px;margin:20px auto;padding:15px;border:2px solid #ccc;border-radius:10px;background-color:#f9f9f9;box-shadow:0 4px 8px #0000001a}.month-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:center;font-size:1.5rem;color:#333;margin-bottom:15px}.days-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:10px}.day-container[_ngcontent-%COMP%]{width:200px;padding:10px;border:1px solid #ddd;border-radius:5px;background-color:#fff;display:flex;flex-direction:column;align-items:flex-start}.checkbox-container[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:10px}.checkbox-input[_ngcontent-%COMP%]{margin-right:10px}.time-selector[_ngcontent-%COMP%]{margin-top:10px;width:100%}.time-label[_ngcontent-%COMP%]{font-size:.9rem;margin-bottom:5px;display:block}.time-select[_ngcontent-%COMP%]{width:100%;padding:5px;font-size:1rem;border:1px solid #ccc;border-radius:5px}.submit-btn[_ngcontent-%COMP%]{margin-top:20px;padding:15px 20px;background-color:#007bff;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:25px;margin-bottom:50px}.submit-btn[_ngcontent-%COMP%]:hover{background-color:#0056b3}.pos-cerrar-sesion[_ngcontent-%COMP%]{position:absolute;top:10px;right:50px;background-color:#000}.p-fixed-bottom[_ngcontent-%COMP%]{position:fixed;bottom:0;width:100%}.pos-cerrar-sesion[_ngcontent-%COMP%]{background-color:#d32f2f;color:#fff;font-size:16px;padding:10px 20px;border-radius:25px;border:none;transition:background-color .3s,transform .2s}.pos-cerrar-sesion[_ngcontent-%COMP%]:hover{background-color:#b71c1c;transform:scale(1.05)}.pos-cerrar-sesion[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 2px #ffffff80}.pos-cerrar-sesion[_ngcontent-%COMP%]:active{background-color:#9a0007}.checkbox-container[_ngcontent-%COMP%]{display:flex;align-items:center;margin:10px 0;padding:5px}.checkbox-input[_ngcontent-%COMP%]{display:none}.checkbox-label[_ngcontent-%COMP%]{position:relative;padding-left:40px;font-size:1.1rem;font-weight:600;color:#555;cursor:pointer;-webkit-user-select:none;user-select:none;display:inline-block;line-height:24px;transition:all .3s ease}.checkbox-label[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;top:0;width:24px;height:24px;border:2px solid #4CAF50;border-radius:5px;background-color:#fff;transition:all .3s ease}.checkbox-input[_ngcontent-%COMP%]:checked + .checkbox-label[_ngcontent-%COMP%]:before{background-color:#4caf50;border-color:#4caf50}.checkbox-input[_ngcontent-%COMP%]:checked + .checkbox-label[_ngcontent-%COMP%]{color:#4caf50}.checkbox-label[_ngcontent-%COMP%]:hover:before{border-color:#388e3c}.checkbox-label[_ngcontent-%COMP%]:active:before{transform:scale(.95)}.checkbox-input[_ngcontent-%COMP%]:focus + .checkbox-label[_ngcontent-%COMP%]:before{outline:2px solid #388E3C;outline-offset:2px}.day-label[_ngcontent-%COMP%]{font-size:15px;font-weight:600;color:#333;margin-bottom:5px;display:block;text-align:center;padding:10px;background-color:#f4f4f4;border-radius:5px;box-shadow:0 2px 4px #0000001a;transition:all .3s ease;cursor:default}.horarios-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin-top:20px;font-family:Arial,sans-serif;background-color:#f9f9f9}.horarios-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:#3f51b5;color:#fff}.horarios-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-top:20px;padding-bottom:20px;text-align:center;font-size:20px}.horarios-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{border-bottom:1px solid #ddd}.horarios-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px 15px;font-size:20px;text-align:center}.horarios-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f2f2f2}.horarios-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#e0e0e0}.no-horarios[_ngcontent-%COMP%]{text-align:center;font-size:16px;color:#757575;font-style:italic;margin-top:20px}@media (max-width: 768px){.horarios-table[_ngcontent-%COMP%]{font-size:12px}.horarios-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .horarios-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px}}.w-80[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center}.mb-50[_ngcontent-%COMP%]{margin-bottom:50px;padding-bottom:100px}.disponible[_ngcontent-%COMP%]{color:#707070}.pendiente[_ngcontent-%COMP%]{color:#0004fd}.rechazado[_ngcontent-%COMP%], .cancelado[_ngcontent-%COMP%]{color:red}.aceptado[_ngcontent-%COMP%]{color:green}.finalizado[_ngcontent-%COMP%]{color:#000}button[_ngcontent-%COMP%]{background:transparent;border:none;font-size:24px;cursor:pointer}button[_ngcontent-%COMP%]:hover{color:red}td.horario-cell[_ngcontent-%COMP%]{display:flex;margin-top:15px;font-weight:600;width:100%;justify-content:center}.horario-cell[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:transparent;border:none;font-size:18px;cursor:pointer}.horario-cell[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{color:red}.swal-button-rechazar[_ngcontent-%COMP%]{background-color:orange;color:#fff}.swal-button-cancelar[_ngcontent-%COMP%]{background-color:red;color:#fff}.swal-button-no-hacer-nada[_ngcontent-%COMP%]{background-color:gray;color:#fff}.btn-ver-comentario[_ngcontent-%COMP%]{background-color:#217a21;color:#fff;border:none;cursor:pointer}.btn-ver-rese\\f1 a[_ngcontent-%COMP%]{background-color:#3e8bff;color:#fff;border:none;cursor:pointer}.btn-ver-comentario[_ngcontent-%COMP%]:hover{background-color:#006400}.btn-ver-comentario-disabled[_ngcontent-%COMP%]{background-color:#757575;color:#fff;border:none;cursor:pointer}.cruz-roja[_ngcontent-%COMP%]{color:red;font-size:20px;font-weight:1000}.button-container[_ngcontent-%COMP%]{background-color:#4b22ff;color:#fff;font-size:16px;font-weight:700;padding:10px;position:relative;top:-10px;margin-left:10px;border:none;border-radius:5px;cursor:pointer;transition:background-color .3s ease,transform .3s ease;box-shadow:0 4px 8px #0000001a}.button-container[_ngcontent-%COMP%]:hover{background-color:#01f;transform:translateY(-2px)}.button-container[_ngcontent-%COMP%]:active{background-color:#84b5ff;transform:translateY(0)}.button-container[_ngcontent-%COMP%]:disabled{background-color:#d6d6d6;cursor:not-allowed;box-shadow:none}.finalizar-btn[_ngcontent-%COMP%]{color:#fff}.filter-container[_ngcontent-%COMP%]{text-align:left;margin-bottom:15px}.search-input[_ngcontent-%COMP%]{width:500px;padding:10px;font-size:16px;border:1px solid #ccc;border-radius:4px;position:absolute;top:130px;left:50px}']});let i=c;return i})();export{$e as MisTurnosComponent};
