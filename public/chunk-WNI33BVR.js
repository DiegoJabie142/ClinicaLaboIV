import{a as Ce}from"./chunk-4QML42IX.js";import{a as me}from"./chunk-JUZHZSBE.js";import{h as de}from"./chunk-5PP5VR5I.js";import{a as le,d as se,h as pe,q as ue}from"./chunk-7YVO6NQX.js";import{Q as ce}from"./chunk-YYGECID7.js";import{Eb as p,Fb as _,Hb as O,Jb as X,Kb as Z,Lb as ee,Nb as te,Pa as l,Pb as H,Qa as N,Rb as P,Sb as B,Tb as V,Wa as Y,ba as j,db as S,ea as W,fa as G,fb as s,ha as J,ia as I,jc as ne,kb as a,kc as ie,lb as r,lc as ae,mb as K,mc as re,pa as y,pb as w,qa as E,rc as oe,sb as b,ub as m,va as Q}from"./chunk-HTI5VKZI.js";import{e as _e,g as C}from"./chunk-5G567QLT.js";var f=_e(Ce());var fe=(()=>{let o=class o{transform(t){return t&&t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()}};o.\u0275fac=function(n){return new(n||o)},o.\u0275pipe=I({name:"capitalize",type:o,pure:!0,standalone:!0});let i=o;return i})();var he=(()=>{let o=class o{transform(t){switch(t.toLowerCase()){case"pendiente":return{color:"#ff6100","font-size":"17px","font-weight":"600"};case"aceptado":return{color:"#4caf50","font-size":"17px","font-weight":"600"};case"finalizado":return{color:"#000099","font-size":"17px","font-weight":"600"};case"cancelado":return{color:"#f44336","font-size":"17px","font-weight":"600"};case"rechazado":return{color:"#000","font-size":"17px","font-weight":"600"};default:return{color:"#e0e0e0","font-size":"17px","font-weight":"600"}}}};o.\u0275fac=function(n){return new(n||o)},o.\u0275pipe=I({name:"appResaltarEstadoTurno",type:o,pure:!0,standalone:!0});let i=o;return i})();var ge=(()=>{let o=class o{transform(t,n){return!t||t.length===0?[]:t.sort((c,g)=>{let[v,k,z]=c[n].split("-").map(Number),[d,h,u]=g[n].split("-").map(Number),x=new Date(z,k-1,v);return new Date(u,h-1,d).getTime()-x.getTime()})}};o.\u0275fac=function(n){return new(n||o)},o.\u0275pipe=I({name:"ordenarTurnos",type:o,pure:!0,standalone:!0});let i=o;return i})();var xe=(()=>{let o=class o{constructor(t,n){this.el=t,this.renderer=n,this.diasLimite=3}ngOnInit(){this.isFechaProxima(this.fecha,this.diasLimite)&&(this.renderer.setStyle(this.el.nativeElement,"background-color","#ffecb3"),this.renderer.setStyle(this.el.nativeElement,"color","#333"))}isFechaProxima(t,n){let[c,g,v]=t.split("-").map(Number),k=new Date(v,g-1,c),z=new Date;z.setHours(0,0,0,0);let h=(k.getTime()-z.getTime())/(1e3*60*60*24);return h>=0&&h<=n}};o.\u0275fac=function(n){return new(n||o)(N(Q),N(Y))},o.\u0275dir=J({type:o,selectors:[["","appHighlightUpcoming",""]],inputs:{fecha:[W.None,"appHighlightUpcoming","fecha"],diasLimite:"diasLimite"},standalone:!0});let i=o;return i})();var U=i=>({"turno-realizado":i});function be(i,o){i&1&&(a(0,"h1"),p(1,"Mis turnos"),r())}function ve(i,o){i&1&&(a(0,"h1"),p(1,"Turnos"),r())}function Te(i,o){if(i&1&&(a(0,"button",16),p(1," Cancelar Turno "),r()),i&2){let e=m().$implicit,t=m(2);s("appCaptcha",t.onCaptchaCancelarPaciente(e))("captchaTitle","Por favor, resuelve este captcha antes de continuar:")}}function ye(i,o){if(i&1){let e=w();a(0,"button",17),b("click",function(){y(e);let n=m().$implicit,c=m(2);return E(c.verResenia(n.resenia))}),p(1," Ver rese\xF1a "),r()}}function Ee(i,o){if(i&1){let e=w();a(0,"button",18),b("click",function(){y(e);let n=m().$implicit,c=m(2);return E(c.verComentario(n.comentario))}),p(1," Ver Comentario "),r()}}function Se(i,o){if(i&1&&(a(0,"button",19),p(1," Calificar Atenci\xF3n "),r()),i&2){let e=m().$implicit,t=m(2);s("appCaptcha",t.onCaptchaCalificar(e))("captchaTitle","Por favor, resuelve este captcha antes de continuar:")}}function we(i,o){if(i&1){let e=w();a(0,"button",20),b("click",function(){y(e);let n=m().$implicit,c=m(2);return E(c.verCalifacion(n.calificacionPaciente))}),p(1," Ver Calificaci\xF3n "),r()}}function Pe(i,o){if(i&1&&(a(0,"button",21),p(1," Completar Encuesta "),r()),i&2){let e=m().$implicit,t=m(2);s("appCaptcha",t.onCaptchaEncuesta(e))("captchaTitle","Por favor, resuelve este captcha antes de continuar:")}}function Me(i,o){if(i&1){let e=w();a(0,"button",22),b("click",function(){y(e);let n=m().$implicit,c=m(2);return E(c.verEncuesta(n.encuestaPaciente))}),p(1," Ver Encuesta "),r()}}function ze(i,o){if(i&1&&(a(0,"tr",6)(1,"td",7),p(2),r(),a(3,"td",7),p(4),r(),a(5,"td",7),p(6),r(),a(7,"td",7),p(8),r(),a(9,"td",8),P(10,"appResaltarEstadoTurno"),p(11),P(12,"capitalize"),r(),a(13,"td",7),S(14,Te,2,2,"button",9)(15,ye,2,0,"button",10)(16,Ee,2,0,"button",11)(17,Se,2,2,"button",12)(18,we,2,0,"button",13)(19,Pe,2,2,"button",14)(20,Me,2,0,"button",15),r()()),i&2){let e=o.$implicit;s("ngClass",H(31,U,e.estado==="realizado")),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.especialidad),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.especialistaNombre),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.fecha),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),O("",e.startTime," - ",e.endTime,""),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3)("ngStyle",B(10,27,e.estado)),l(2),_(B(12,29,e.estado)),l(2),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),s("ngIf",e.estado=="pendiente"),l(),s("ngIf",e.resenia!=""),l(),s("ngIf",e.comentario&&e.comentario!=""),l(),s("ngIf",e.estado=="finalizado"&&e.calificacionPaciente==""),l(),s("ngIf",e.estado=="finalizado"&&e.calificacionPaciente!=""),l(),s("ngIf",e.estado=="finalizado"&&e.encuestaPaciente==""),l(),s("ngIf",e.estado=="finalizado"&&e.encuestaPaciente!="")}}function Ie(i,o){if(i&1&&(a(0,"div")(1,"table",4)(2,"thead")(3,"tr")(4,"th"),p(5,"Especialidad"),r(),a(6,"th"),p(7,"Especialista"),r(),a(8,"th"),p(9,"Fecha"),r(),a(10,"th"),p(11,"Horario"),r(),a(12,"th"),p(13,"Estado"),r(),a(14,"th"),p(15,"Acciones"),r()()(),a(16,"tbody"),S(17,ze,21,33,"tr",5),P(18,"ordenarTurnos"),r()()()),i&2){let e=m();l(17),s("ngForOf",V(18,1,e.turnosFiltrados,"fecha"))}}function Be(i,o){if(i&1&&(a(0,"button",24),p(1," Aceptar Turno "),r()),i&2){let e=m().$implicit,t=m(2);s("appCaptcha",t.onCaptchaAceptar(e))("captchaTitle","Por favor, resuelve este captcha antes de continuar:")}}function ke(i,o){if(i&1&&(a(0,"button",16),p(1," Cancelar Turno "),r()),i&2){let e=m().$implicit,t=m(2);s("appCaptcha",t.onCaptchaCancelar(e))("captchaTitle","Por favor, resuelve este captcha antes de continuar:")}}function Fe(i,o){if(i&1&&(a(0,"button",16),p(1," Rechazar Turno "),r()),i&2){let e=m().$implicit,t=m(2);s("appCaptcha",t.onCaptchaRechazar(e))("captchaTitle","Por favor, resuelve este captcha antes de continuar:")}}function Oe(i,o){if(i&1){let e=w();a(0,"button",17),b("click",function(){y(e);let n=m().$implicit,c=m(2);return E(c.verResenia(n.resenia))}),p(1," Ver rese\xF1a "),r()}}function He(i,o){if(i&1){let e=w();a(0,"button",18),b("click",function(){y(e);let n=m().$implicit,c=m(2);return E(c.verComentario(n.comentario))}),p(1," Ver Comentario "),r()}}function Ve(i,o){if(i&1&&(a(0,"button",24),p(1," Finalizar Turno "),r()),i&2){let e=m().$implicit,t=m(2);s("appCaptcha",t.onCaptchaFinalizar(e))("captchaTitle","Por favor, resuelve este captcha antes de continuar:")}}function Le(i,o){if(i&1&&(a(0,"tr",6)(1,"td",7),p(2),r(),a(3,"td",7),p(4),r(),a(5,"td",7),p(6),r(),a(7,"td",7),p(8),r(),a(9,"td",8),P(10,"appResaltarEstadoTurno"),p(11),P(12,"capitalize"),r(),a(13,"td",7),S(14,Be,2,2,"button",23)(15,ke,2,2,"button",9)(16,Fe,2,2,"button",9)(17,Oe,2,0,"button",10)(18,He,2,0,"button",11)(19,Ve,2,2,"button",23),r()()),i&2){let e=o.$implicit;s("ngClass",H(30,U,e.estado==="realizado")),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.especialidad),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.pacienteNombre),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.fecha),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),O("",e.startTime," - ",e.endTime,""),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3)("ngStyle",B(10,26,e.estado)),l(2),_(B(12,28,e.estado)),l(2),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),s("ngIf",e.estado=="pendiente"),l(),s("ngIf",e.estado=="pendiente"),l(),s("ngIf",e.estado=="pendiente"),l(),s("ngIf",e.resenia!=""),l(),s("ngIf",e.comentario!=""&&e.comentario),l(),s("ngIf",e.estado=="aceptado")}}function Ne(i,o){if(i&1&&(a(0,"div")(1,"table",4)(2,"thead")(3,"tr")(4,"th"),p(5,"Especialidad"),r(),a(6,"th"),p(7,"Paciente"),r(),a(8,"th"),p(9,"Fecha"),r(),a(10,"th"),p(11,"Horario"),r(),a(12,"th"),p(13,"Estado"),r(),a(14,"th"),p(15,"Acciones"),r()()(),a(16,"tbody"),S(17,Le,20,32,"tr",5),P(18,"ordenarTurnos"),r()()()),i&2){let e=m();l(17),s("ngForOf",V(18,1,e.turnosFiltrados,"fecha"))}}function Ue(i,o){if(i&1){let e=w();a(0,"button",26),b("click",function(){y(e);let n=m().$implicit,c=m(2);return E(c.cancelarAdmin(n))}),p(1," Cancelar Turno "),r()}}function Re(i,o){if(i&1){let e=w();a(0,"button",18),b("click",function(){y(e);let n=m().$implicit,c=m(2);return E(c.verComentario(n.comentario))}),p(1," Ver Comentario "),r()}}function qe(i,o){if(i&1&&(a(0,"tr",6)(1,"td",7),p(2),r(),a(3,"td",7),p(4),r(),a(5,"td",7),p(6),r(),a(7,"td",7),p(8),r(),a(9,"td",7),p(10),r(),a(11,"td",7),p(12),P(13,"capitalize"),r(),a(14,"td",7),S(15,Ue,2,0,"button",25)(16,Re,2,0,"button",11),r()()),i&2){let e=o.$implicit;s("ngClass",H(26,U,e.estado==="realizado")),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.especialidad),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.pacienteNombre),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.especialistaNombre),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(e.fecha),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),O("",e.startTime," - ",e.endTime,""),l(),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),_(B(13,24,e.estado)),l(2),s("appHighlightUpcoming",e.fecha)("diasLimite",3),l(),s("ngIf",e.estado=="pendiente"),l(),s("ngIf",e.comentario!=""&&e.comentario)}}function Ae(i,o){if(i&1&&(a(0,"div")(1,"table",4)(2,"thead")(3,"tr")(4,"th"),p(5,"Especialidad"),r(),a(6,"th"),p(7,"Paciente"),r(),a(8,"th"),p(9,"Especialista"),r(),a(10,"th"),p(11,"Fecha"),r(),a(12,"th"),p(13,"Horario"),r(),a(14,"th"),p(15,"Estado"),r(),a(16,"th"),p(17,"Acciones"),r()()(),a(18,"tbody"),S(19,qe,17,28,"tr",5),P(20,"ordenarTurnos"),r()()()),i&2){let e=m();l(19),s("ngForOf",V(20,1,e.turnosFiltrados,"fecha"))}}var ot=(()=>{let o=class o{constructor(){this.filterText="",this.horarios=[],this.turnosFiltrados=[],this.uid="",this.role="",this.title="MyClinic",this.headerLinks=[],this.horariosConPaciente=[],this.mostrarConfirmacion=!1,this.isLoggedIn=!1,this.firebaseSvc=j(ce)}ngOnInit(){return C(this,null,function*(){this.role=this.getRoleFromLocalStorage(),this.isLoggedIn=yield this.estaLoggeado(),this.getUidFromLocalStorage(),yield this.loadHorarios(),this.turnosFiltrados=[...this.horarios]})}estaLoggeado(){return C(this,null,function*(){return yield this.firebaseSvc.isUserLoggedIn()})}aplicarFiltro(){let t=this.filterText?.toLowerCase()||"";this.turnosFiltrados=this.horarios.filter(n=>this.objectContainsText(n,t))}objectContainsText(t,n){for(let c in t)if(t.hasOwnProperty(c)){let g=t[c];if(typeof g=="object"&&g!==null){if(this.objectContainsText(g,n))return!0}else if((typeof g=="string"||typeof g=="number")&&g.toString().toLowerCase().includes(n))return!0}return!1}getUidFromLocalStorage(){let t=JSON.parse(localStorage.getItem("user")||"{}");t&&t.uid?this.uid=t.uid:console.error("UID no encontrado en localStorage")}getRoleFromLocalStorage(){try{let t=localStorage.getItem("user");return t&&JSON.parse(t).role||null}catch(t){return console.error("Error al obtener el rol del usuario desde localStorage:",t),null}}loadHorarios(){return C(this,null,function*(){if(this.uid)try{f.default.fire({title:"Cargando horarios...",text:"Por favor espere...",icon:"info",allowOutsideClick:!1,showConfirmButton:!1,didOpen:()=>{f.default.showLoading()}}),this.role=="especialista"?this.horarios=yield this.firebaseSvc.getTurnosEspecialista(this.uid):this.role=="administrador"?this.horarios=yield this.firebaseSvc.getTurnosAdmin():this.role=="paciente"&&(console.log("hola"),console.log(this.uid),this.horarios=yield this.firebaseSvc.getTurnosPaciente(this.uid),console.log(this.horarios)),f.default.close()}catch(n){console.error("Error al cargar los horarios",n),f.default.fire({title:"Error",text:"Hubo un error al cargar los horarios.",icon:"error"})}else console.error("No se puede cargar los horarios porque no hay UID");this.horariosConPaciente=this.horarios.filter(n=>n.pacienteId);let t=yield Promise.all(this.horariosConPaciente.map(n=>C(this,null,function*(){return n.rese\u00F1a&&(n.resenia=n.rese\u00F1a),n.pacienteId?n.pacienteNombre=yield this.firebaseSvc.getPacienteNombre(n.pacienteId):n.pacienteNombre="No reservado",(this.role=="paciente"||this.role=="administrador")&&(n.especialistaNombre=yield this.firebaseSvc.getEspecialistaNombre(n.especialistaId)),n})));this.turnosFiltrados=t,this.aplicarFiltro()})}rechazarTurno(t){return C(this,null,function*(){f.default.fire({title:"\xBFQu\xE9 deseas hacer con el turno?",text:"Elige una opci\xF3n para proceder.",icon:"warning",showCancelButton:!0,confirmButtonText:"Rechazar Turno",cancelButtonText:"No hacer nada",customClass:{confirmButton:"swal-button-rechazar",cancelButton:"swal-button-cancelar",denyButton:"swal-button-no-hacer-nada"}}).then(n=>{n.isConfirmed&&f.default.fire({title:"Raz\xF3n del rechazo",input:"textarea",inputPlaceholder:"Escribe la raz\xF3n aqu\xED...",inputAttributes:{"aria-label":"Escribe la raz\xF3n aqu\xED"},showCancelButton:!0,confirmButtonText:"Guardar raz\xF3n",cancelButtonText:"Cancelar",inputValidator:c=>c?null:"Por favor, escribe una raz\xF3n."}).then(c=>{if(c.isConfirmed){let g=c.value;this.firebaseSvc.rechazarTurno(t.id,"Rechazado por el especialista. Raz\xF3n: "+g).then(()=>{this.loadHorarios()})}})})})}cancelarTurno(t){return C(this,null,function*(){f.default.fire({title:"\xBFQu\xE9 deseas hacer con el turno?",text:"Elige una opci\xF3n para proceder.",icon:"warning",showCancelButton:!0,confirmButtonText:"Cancelar Turno",cancelButtonText:"No hacer nada",customClass:{confirmButton:"swal-button-rechazar",cancelButton:"swal-button-cancelar",denyButton:"swal-button-no-hacer-nada"}}).then(n=>{n.isConfirmed&&f.default.fire({title:"Raz\xF3n del rechazo",input:"textarea",inputPlaceholder:"Escribe la raz\xF3n aqu\xED...",inputAttributes:{"aria-label":"Escribe la raz\xF3n aqu\xED"},showCancelButton:!0,confirmButtonText:"Guardar raz\xF3n",cancelButtonText:"Cancelar",inputValidator:c=>c?null:"Por favor, escribe una raz\xF3n."}).then(c=>{if(c.isConfirmed){let g=c.value;this.firebaseSvc.cancelarTurno(t.id,"Cancelado por el especialista. Raz\xF3n: "+g).then(()=>{this.loadHorarios()})}})})})}cancelarPaciente(t){return C(this,null,function*(){f.default.fire({title:"Cancelar Turno",text:"Por favor, ingresa una raz\xF3n antes de cancelar el turno.",input:"textarea",inputPlaceholder:"Escribe tu comentario aqu\xED...",showCancelButton:!0,confirmButtonText:"Cancelar turno",cancelButtonText:"Cancelar",confirmButtonColor:"red",preConfirm:n=>n.trim()?n:(f.default.showValidationMessage("El comentario es obligatoria"),!1)}).then(n=>{if(n.isConfirmed){let c=n.value;this.firebaseSvc.cancelarTurno(t.id,"Cancelado por el paciente. Raz\xF3n: "+c).then(()=>{this.loadHorarios()}).catch(g=>{console.error("Error al finalizar el turno:",g),f.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})})}cancelarAdmin(t){f.default.fire({title:"Cancelar Turno",text:"Por favor, ingresa una raz\xF3n antes de cancelar el turno.",input:"textarea",inputPlaceholder:"Escribe tu comentario aqu\xED...",showCancelButton:!0,confirmButtonText:"Cancelar Turno",cancelButtonText:"Cancelar",confirmButtonColor:"red",preConfirm:n=>n.trim()?n:(f.default.showValidationMessage("El comentario es obligatoria"),!1)}).then(n=>{if(n.isConfirmed){let c=n.value;this.firebaseSvc.cancelarTurno(t.id,"Cancelado por el admin. Raz\xF3n: "+c).then(()=>{this.loadHorarios()}).catch(g=>{console.error("Error al finalizar el turno:",g),f.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})}completarEncuestaPaciente(t){return C(this,null,function*(){f.default.fire({title:"Encuesta",text:"\xBFRecomendar\xEDa esta cl\xEDnica con alguien m\xE1s?",input:"textarea",inputPlaceholder:"Escribe tu respuesta aqu\xED...",showCancelButton:!0,confirmButtonText:"Finalizar Encuesta",cancelButtonText:"Cancelar",confirmButtonColor:"red",preConfirm:n=>n.trim()?n:(f.default.showValidationMessage("El comentario es obligatoria"),!1)}).then(n=>{if(n.isConfirmed){let c=n.value;this.firebaseSvc.completarEncuestaHorario(t.id,c).then(()=>{this.loadHorarios()}).catch(g=>{console.error("Error al finalizar la encuesta:",g),f.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})})}completarCalifacionPaciente(t){return C(this,null,function*(){f.default.fire({title:"Califique al especialista",text:"Deje un comentario de como fue la atenci\xF3n del especialista.",input:"textarea",inputPlaceholder:"Escribe tu respuesta aqu\xED...",showCancelButton:!0,confirmButtonText:"Finalizar Calificaci\xF3n",cancelButtonText:"Cancelar",confirmButtonColor:"red",preConfirm:n=>n.trim()?n:(f.default.showValidationMessage("El comentario es obligatoria"),!1)}).then(n=>{if(n.isConfirmed){let c=n.value;this.firebaseSvc.completarCalificacionTurno(t.id,c).then(()=>{this.loadHorarios()}).catch(g=>{console.error("Error al finalizar la encuesta:",g),f.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})})}verComentario(t){f.default.fire({title:"Comentario",text:t,icon:"info",confirmButtonText:"Cerrar"})}verResenia(t){f.default.fire({title:"Rese\xF1a",text:t,icon:"info",confirmButtonText:"Cerrar"})}verEncuesta(t){f.default.fire({title:"Encuesta",text:t,icon:"info",confirmButtonText:"Cerrar"})}verCalifacion(t){f.default.fire({title:"Calificaci\xF3n",text:t,icon:"info",confirmButtonText:"Cerrar"})}aceptar(t){return C(this,null,function*(){f.default.fire({title:"\xBFEst\xE1s seguro de aceptar el turno?",text:"Una vez aceptado, no podr\xE1s modificarlo.",icon:"question",showCancelButton:!0,confirmButtonText:"Aceptar turno",cancelButtonText:"Cancelar operaci\xF3n",customClass:{confirmButton:"swal-button-aceptar",cancelButton:"swal-button-cancelar"}}).then(n=>{n.isConfirmed&&(console.log("Turno aceptado:",t),this.firebaseSvc.aceptarHorario(t.id).then(()=>{this.loadHorarios()}))})})}finalizar(t){return C(this,null,function*(){let n=["Altura (cm)","Peso (kg)","Temperatura (\xB0C)","Presi\xF3n (mmHg)"],c=(d,h,u=!0)=>{let x=document.createElement("input");return x.type=d,x.placeholder=h,x.required=u,x.style.width="100%",x.style.padding="10px",x.style.marginBottom="10px",x.style.border="1px solid #ccc",x.style.borderRadius="5px",x.style.fontSize="14px",x},g=(d,h)=>{let u=document.createElement("div");u.style.display="flex",u.style.gap="10px";let x=c("text",d),T=c("text",h);return u.appendChild(x),u.appendChild(T),u},v=()=>{let d=document.createElement("div");d.style.display="flex",d.style.flexDirection="column",d.style.alignItems="center";let h=c("text","Clave para el rango (Ej: nivel)"),u=c("range","Rango de 0 a 100");return u.min="0",u.max="100",d.appendChild(h),d.appendChild(u),d},k=()=>{let d=document.createElement("div");d.style.display="flex",d.style.flexDirection="column",d.style.alignItems="center";let h=c("text","Clave para el n\xFAmero (Ej: cantidad)"),u=c("number","N\xFAmero");return d.appendChild(h),d.appendChild(u),d},z=()=>{let d=document.createElement("div");d.style.display="flex",d.style.flexDirection="column",d.style.alignItems="center";let h=c("text","Clave para S\xED/No"),u=document.createElement("select");u.style.width="100%",u.style.padding="10px",u.style.marginBottom="10px",u.style.border="1px solid #ccc",u.style.borderRadius="5px",u.style.fontSize="14px";let x=document.createElement("option");x.value="s\xED",x.textContent="S\xED";let T=document.createElement("option");return T.value="no",T.textContent="No",u.appendChild(x),u.appendChild(T),d.appendChild(h),d.appendChild(u),d};f.default.fire({title:"Finalizar Turno",text:"Por favor, ingresa una rese\xF1a y los datos de la historia cl\xEDnica antes de finalizar el turno.",input:"textarea",inputPlaceholder:"Escribe tu rese\xF1a aqu\xED...",showCancelButton:!0,confirmButtonText:"Finalizar Turno",confirmButtonColor:"#28a745",cancelButtonText:"Cancelar",cancelButtonColor:"#d33",preConfirm:d=>d.trim()?d:(f.default.showValidationMessage("La rese\xF1a es obligatoria"),!1),didOpen:()=>{let d=f.default.getPopup();if(d){let h=document.createElement("form");h.style.display="flex",h.style.flexDirection="column",h.style.alignItems="center",h.style.gap="10px",h.style.maxWidth="300px",h.style.margin="auto",n.forEach(u=>h.appendChild(c("number",u))),h.appendChild(v()),h.appendChild(k());for(let u=0;u<3;u++)h.appendChild(g(`Clave ${u+1} (Ej: caries)`,`Valor ${u+1} (Ej: 4)`));h.appendChild(z()),d.appendChild(h)}}}).then(d=>{if(d.isConfirmed){let h=d.value,u={};for(let M of n){let F=document.querySelector(`input[placeholder="${M}"]`);if(!F.value){f.default.fire({title:"Error",text:"Todos los campos fijos de la historia cl\xEDnica son obligatorios.",icon:"error",confirmButtonText:"Cerrar"});return}u[M]=parseFloat(F.value)}let x=document.querySelector('input[placeholder="Clave para el rango (Ej: nivel)"]').value,T=document.querySelector('input[type="range"]').value;x&&T&&(u[x]=T);let R=document.querySelector('input[placeholder="Clave para el n\xFAmero (Ej: cantidad)"]').value,q=document.querySelector('input[type="number"]').value;R&&q&&(u[R]=parseFloat(q));for(let M=0;M<3;M++){let F=document.querySelector(`input[placeholder="Clave ${M+1} (Ej: caries)"]`).value,D=document.querySelector(`input[placeholder="Valor ${M+1} (Ej: 4)"]`).value;F&&D&&(u[F]=D)}let A=document.querySelector('input[placeholder="Clave para S\xED/No"]').value,$=document.querySelector("select").value;A&&$&&(u[A]=$),this.firebaseSvc.finalizarHorario(this.uid,t.id,h,u).then(()=>{this.loadHorarios()}).catch(()=>{f.default.fire({title:"Error",text:"Hubo un problema al finalizar el turno.",icon:"error",confirmButtonText:"Cerrar"})})}})})}onCaptchaCancelarPaciente(t){return()=>this.cancelarPaciente(t)}onCaptchaCancelar(t){return()=>this.cancelarTurno(t)}onCaptchaRechazar(t){return()=>this.rechazarTurno(t)}onCaptchaAceptar(t){return()=>this.aceptar(t)}onCaptchaFinalizar(t){return()=>this.finalizar(t)}onCaptchaEncuesta(t){return()=>this.completarEncuestaPaciente(t)}onCaptchaCalificar(t){return()=>this.completarCalifacionPaciente(t)}};o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=G({type:o,selectors:[["app-mis-turnos"]],standalone:!0,features:[te],decls:8,vars:7,consts:[[3,"title"],[2,"width","100%","display","flex","justify-content","center","margin-top","30px","margin-bottom","20px"],[4,"ngIf"],["type","text","placeholder","Buscar por cualquier campo",3,"ngModelChange","input","ngModel"],[1,"turnos-table"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass"],[3,"appHighlightUpcoming","diasLimite"],[3,"appHighlightUpcoming","diasLimite","ngStyle"],["class","btn cancelar",3,"appCaptcha","captchaTitle",4,"ngIf"],["class","btn ver-resenia",3,"click",4,"ngIf"],["class","btn ver-comentario",3,"click",4,"ngIf"],["class","btn calificar",3,"appCaptcha","captchaTitle",4,"ngIf"],["class","btn ver-calificacion",3,"click",4,"ngIf"],["class","btn ver-encuesta",3,"appCaptcha","captchaTitle",4,"ngIf"],["class","btn completar-encuesta",3,"click",4,"ngIf"],[1,"btn","cancelar",3,"appCaptcha","captchaTitle"],[1,"btn","ver-resenia",3,"click"],[1,"btn","ver-comentario",3,"click"],[1,"btn","calificar",3,"appCaptcha","captchaTitle"],[1,"btn","ver-calificacion",3,"click"],[1,"btn","ver-encuesta",3,"appCaptcha","captchaTitle"],[1,"btn","completar-encuesta",3,"click"],["class","btn aceptar",3,"appCaptcha","captchaTitle",4,"ngIf"],[1,"btn","aceptar",3,"appCaptcha","captchaTitle"],["class","btn cancelar",3,"click",4,"ngIf"],[1,"btn","cancelar",3,"click"]],template:function(n,c){n&1&&(K(0,"app-header",0),a(1,"div",1),S(2,be,2,0,"h1",2)(3,ve,2,0,"h1",2),r(),a(4,"input",3),ee("ngModelChange",function(v){return Z(c.filterText,v)||(c.filterText=v),v}),b("input",function(){return c.aplicarFiltro()}),r(),S(5,Ie,19,4,"div",2)(6,Ne,19,4,"div",2)(7,Ae,21,4,"div",2)),n&2&&(s("title","MyClinic"),l(2),s("ngIf",c.role=="especialista"||c.role=="paciente"),l(),s("ngIf",c.role=="administrador"),l(),X("ngModel",c.filterText),l(),s("ngIf",c.role=="paciente"),l(),s("ngIf",c.role=="especialista"),l(),s("ngIf",c.role=="administrador"))},dependencies:[ue,le,se,pe,de,oe,ne,ie,ae,re,fe,me,he,ge,xe],styles:['@charset "UTF-8";.turnos-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-family:Arial,sans-serif}.turnos-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .turnos-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px 15px;text-align:left}.turnos-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#4caf50;color:#fff;font-weight:700}.turnos-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f2f2f2}.turnos-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#ddd}.turno-realizado[_ngcontent-%COMP%]{background-color:#f9f9f9}.btn[_ngcontent-%COMP%]{padding:8px 15px;margin:5px;border:none;border-radius:4px;cursor:pointer;font-size:14px;transition:background-color .3s}.btn[_ngcontent-%COMP%]:hover{opacity:.8}.btn.cancelar[_ngcontent-%COMP%]{background-color:#ff4d4d;color:#fff}.btn.cancelar[_ngcontent-%COMP%]:hover{background-color:#ff1a1a}.btn.aceptar[_ngcontent-%COMP%]{background-color:#0b7910;color:#fff}.btn.aceptar[_ngcontent-%COMP%]:hover{background-color:#0d9b14}.btn.ver-resenia[_ngcontent-%COMP%]{background-color:#008cba;color:#fff}.btn.ver-resenia[_ngcontent-%COMP%]:hover{background-color:#005f73}.btn.ver-comentario[_ngcontent-%COMP%]{background-color:#f39c12;color:#fff}.btn.ver-comentario[_ngcontent-%COMP%]:hover{background-color:#e67e22}.btn.calificar[_ngcontent-%COMP%]{background-color:#27ae60;color:#fff}.btn.calificar[_ngcontent-%COMP%]:hover{background-color:#2ecc71}.btn.ver-calificacion[_ngcontent-%COMP%]{background-color:#9b59b6;color:#fff}.btn.ver-calificacion[_ngcontent-%COMP%]:hover{background-color:#8e44ad}.btn.ver-encuesta[_ngcontent-%COMP%]{background-color:#2980b9;color:#fff;border:none;border-radius:5px;cursor:pointer;transition:background-color .3s ease}.btn.ver-encuesta[_ngcontent-%COMP%]:hover{background-color:#3498db}.btn.completar-encuesta[_ngcontent-%COMP%]{background-color:#f39c12;color:#fff;border:none;border-radius:5px;cursor:pointer;transition:background-color .3s ease}.btn.completar-encuesta[_ngcontent-%COMP%]:hover{background-color:#e67e22}input[type=text][_ngcontent-%COMP%]{width:600px;padding:10px 15px;font-size:16px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;transition:all .3s ease-in-out;margin-bottom:30px}input[type=text][_ngcontent-%COMP%]:focus{border-color:#27ae60;box-shadow:0 0 10px #27ae6080;outline:none}input[type=text][_ngcontent-%COMP%]::placeholder{color:#aaa;font-style:italic}input[type=text][_ngcontent-%COMP%]:hover{border-color:#2ecc71}input[type=text][_ngcontent-%COMP%]:focus::placeholder{color:transparent}']});let i=o;return i})();export{ot as MisTurnosComponent};