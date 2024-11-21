import{c as j,f as R,g as J,h as G,j as q,k as Y,o as K,p as Q,q as X,s as Z,z as ee}from"./chunk-JAPQ2JVT.js";import{C as B}from"./chunk-LWEM5HZJ.js";import{Ab as m,Db as g,Ib as H,Jb as d,Kb as h,Lb as D,Mb as P,Ob as b,Pb as u,Qb as v,Sb as F,Tb as w,Va as r,Vb as L,Wb as V,Xb as N,g as C,ia as T,jb as _,lb as p,ma as E,nc as z,oc as W,pc as $,qb as s,rb as a,rc as A,sb as I,sc as U,va as f,vb as M,wa as x,yb as k}from"./chunk-JWOBJSOL.js";var te=n=>({invalid:n}),ie=(n,l,e,t,i,o)=>({disponible:n,pendiente:l,aceptado:e,rechazado:t,cancelado:i,finalizado:o});function ne(n,l){if(n&1&&(s(0,"option",25),d(1),a()),n&2){let e=l.$implicit;p("value",e),r(),h(e)}}function oe(n,l){if(n&1&&(s(0,"option",25),d(1),a()),n&2){let e=l.$implicit;p("value",e),r(),h(e)}}function ae(n,l){if(n&1){let e=M();s(0,"div",20)(1,"label",21),d(2,"Hora de inicio:"),a(),s(3,"select",22),v("ngModelChange",function(i){f(e);let o=m().$implicit,c=m(2);return u(c.availableTimes[o].start,i)||(c.availableTimes[o].start=i),x(i)}),_(4,ne,2,2,"option",23),a(),s(5,"label",21),d(6,"Hora de fin:"),a(),s(7,"select",24),v("ngModelChange",function(i){f(e);let o=m().$implicit,c=m(2);return u(c.availableTimes[o].end,i)||(c.availableTimes[o].end=i),x(i)}),_(8,oe,2,2,"option",23),a()()}if(n&2){let e=m().$implicit,t=m(2);r(),g("for","start-time-",e,""),r(2),g("name","start-time-",e,""),b("ngModel",t.availableTimes[e].start),r(),p("ngForOf",t.availableTimeSlots),r(),g("for","end-time-",e,""),r(2),g("name","end-time-",e,""),b("ngModel",t.availableTimes[e].end),p("ngClass",w(13,te,t.isEndTimeInvalid(e))),r(),p("ngForOf",t.getFilteredEndTimes(e))}}function re(n,l){if(n&1){let e=M();s(0,"div",14)(1,"label",15),d(2),a(),s(3,"div",16)(4,"input",17),v("ngModelChange",function(i){let o=f(e).$implicit,c=m(2);return u(c.selectedDays[o],i)||(c.selectedDays[o]=i),x(i)}),a(),s(5,"label",18),d(6,"Horarios:"),a()(),_(7,ae,9,15,"div",19),a()}if(n&2){let e=l.$implicit,t=m().$implicit,i=m();r(2),P("",e," ",t,""),r(2),g("name","day-",e,""),g("id","day-",e,""),b("ngModel",i.selectedDays[e]),r(),g("for","day-",e,""),r(2),p("ngIf",i.selectedDays[e])}}function se(n,l){if(n&1&&(s(0,"div",11)(1,"h3"),d(2),a(),s(3,"div",12),_(4,re,8,10,"div",13),a()()),n&2){let e=l.$implicit,t=m();r(2),h(e),r(2),p("ngForOf",t.availableDays[e])}}function le(n,l){if(n&1&&(s(0,"option",25),d(1),a()),n&2){let e=l.$implicit;p("value",e),r(),h(e)}}function ce(n,l){if(n&1&&(s(0,"option",25),d(1),a()),n&2){let e=l.$implicit;p("value",e),r(),h(e)}}function de(n,l){if(n&1){let e=M();s(0,"div",20)(1,"label",21),d(2,"Hora de inicio:"),a(),s(3,"select",22),v("ngModelChange",function(i){f(e);let o=m().$implicit,c=m(2);return u(c.availableTimes[o].start,i)||(c.availableTimes[o].start=i),x(i)}),_(4,le,2,2,"option",23),a(),s(5,"label",21),d(6,"Hora de fin:"),a(),s(7,"select",24),v("ngModelChange",function(i){f(e);let o=m().$implicit,c=m(2);return u(c.availableTimes[o].end,i)||(c.availableTimes[o].end=i),x(i)}),_(8,ce,2,2,"option",23),a()()}if(n&2){let e=m().$implicit,t=m(2);r(),g("for","start-time-",e,""),r(2),g("name","start-time-",e,""),b("ngModel",t.availableTimes[e].start),r(),p("ngForOf",t.availableTimeSlots),r(),g("for","end-time-",e,""),r(2),g("name","end-time-",e,""),b("ngModel",t.availableTimes[e].end),p("ngClass",w(13,te,t.isEndTimeInvalid(e))),r(),p("ngForOf",t.getFilteredEndTimes(e))}}function pe(n,l){if(n&1){let e=M();s(0,"div",14)(1,"label",15),d(2),a(),s(3,"div",16)(4,"input",17),v("ngModelChange",function(i){let o=f(e).$implicit,c=m(2);return u(c.selectedDays[o],i)||(c.selectedDays[o]=i),x(i)}),a(),s(5,"label",18),d(6,"Disponible"),a()(),_(7,de,9,15,"div",19),a()}if(n&2){let e=l.$implicit,t=m().$implicit,i=m();r(2),P("",e," ",t,""),r(2),g("name","day-",e,""),g("id","day-",e,""),b("ngModel",i.selectedDays[e]),r(),g("for","day-",e,""),r(2),p("ngIf",i.selectedDays[e])}}function me(n,l){if(n&1&&(s(0,"div",11)(1,"h3"),d(2),a(),s(3,"div",12),_(4,pe,8,10,"div",13),a()()),n&2){let e=l.$implicit,t=m();r(2),h(e),r(2),p("ngForOf",t.availableDays[e])}}function ge(n,l){if(n&1&&(s(0,"tr")(1,"td"),d(2),a(),s(3,"td"),d(4),a(),s(5,"td"),d(6),a(),s(7,"td")(8,"span",28),d(9),V(10,"titlecase"),a()()()),n&2){let e=l.$implicit;r(2),h(e.date),r(2),h(e.start),r(2),h(e.end),r(2),p("ngClass",L(7,ie,e.status==="disponible",e.status==="pendiente",e.status==="aceptado",e.status==="rechazado",e.status==="cancelado",e.status==="finalizado")),r(),D(" ",N(10,5,e.status)," ")}}function _e(n,l){if(n&1&&(s(0,"table",26)(1,"thead")(2,"tr")(3,"th"),d(4,"D\xEDa"),a(),s(5,"th"),d(6,"Hora de Inicio"),a(),s(7,"th"),d(8,"Hora de Fin"),a(),s(9,"th"),d(10,"Estado"),a()()(),s(11,"tbody"),_(12,ge,11,14,"tr",27),a()()),n&2){let e=m();r(12),p("ngForOf",e.horarios)}}function he(n,l){n&1&&(s(0,"p"),d(1,"No se han guardado horarios para este especialista."),a())}var Se=(()=>{let l=class l{constructor(){this.horarios=[],this.uid="",this.title="MyClinic",this.headerLinks=[],this.currentDate=new Date,this.availableDays={},this.availableDates=[],this.selectedDays={},this.availableTimes={1:{start:"00:00",end:"23:59"},2:{start:"00:00",end:"23:59"},3:{start:"00:00",end:"23:59"},4:{start:"00:00",end:"23:59"},5:{start:"00:00",end:"23:59"},6:{start:"00:00",end:"23:59"},7:{start:"00:00",end:"23:59"},8:{start:"00:00",end:"23:59"},9:{start:"00:00",end:"23:59"},10:{start:"00:00",end:"23:59"},11:{start:"00:00",end:"23:59"},12:{start:"00:00",end:"23:59"},13:{start:"00:00",end:"23:59"},14:{start:"00:00",end:"23:59"},15:{start:"00:00",end:"23:59"},16:{start:"00:00",end:"23:59"},17:{start:"00:00",end:"23:59"},18:{start:"00:00",end:"23:59"},19:{start:"00:00",end:"23:59"},20:{start:"00:00",end:"23:59"},21:{start:"00:00",end:"23:59"},22:{start:"00:00",end:"23:59"},23:{start:"00:00",end:"23:59"},24:{start:"00:00",end:"23:59"},25:{start:"00:00",end:"23:59"},26:{start:"00:00",end:"23:59"},27:{start:"00:00",end:"23:59"},28:{start:"00:00",end:"23:59"},29:{start:"00:00",end:"23:59"},30:{start:"00:00",end:"23:59"},31:{start:"00:00",end:"23:59"}},this.availableTimeSlots=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"],this.isLoggedIn=!1,this.firebaseSvc=T(B)}ngOnInit(){return C(this,null,function*(){this.generateAvailableDays(),this.updateHeaderLinks(),this.isLoggedIn=yield this.estaLoggeado(),this.getUidFromLocalStorage(),this.loadHorarios()})}signOut(){return C(this,null,function*(){console.log("Intentando cerrar sesi\xF3n...");try{yield this.firebaseSvc.signOut(),console.log("Sesi\xF3n cerrada exitosamente"),this.isLoggedIn=!1}catch(t){console.error("Error al cerrar sesi\xF3n:",t)}this.updateHeaderLinks()})}estaLoggeado(){return C(this,null,function*(){return yield this.firebaseSvc.isUserLoggedIn()})}updateHeaderLinks(){let t=localStorage.getItem("user"),i=t?JSON.parse(t).role:null;i==="administrador"?this.headerLinks=[{label:"Home",route:"/home"},{label:"Secci\xF3n Usuarios",route:"/users"},{label:"Turnos",route:"/mis-turnos"}]:i==="especialista"?this.headerLinks=[{label:"Home",route:"/home"},{label:"Mi Perfil",route:"/mi-perfil"},{label:"Mis Horarios",route:"/mis-horarios"},{label:"Mis Turnos",route:"/mis-turnos"}]:i==="paciente"?this.headerLinks=[{label:"Home",route:"/home"},{label:"Mi Perfil",route:"/mi-perfil"},{label:"Solicitar turno",route:"/solicitar-turno"},{label:"Mis Turnos",route:"/mis-turnos"}]:this.headerLinks=[{label:"Home",route:"/home"},{label:"Iniciar Sesi\xF3n",route:"/login"},{label:"Registrarse",route:"/sign-up/select"}]}getFirstHalfMonths(){let t=Object.keys(this.availableDays);return t.slice(0,Math.ceil(t.length/2))}getSecondHalfMonths(){let t=Object.keys(this.availableDays);return t.slice(Math.ceil(t.length/2))}generateAvailableDays(){this.availableDays={},this.availableDates=[];for(let t=0;t<15;t++){let i=new Date(this.currentDate);i.setDate(this.currentDate.getDate()+t);let o=this.getMonthName(i);this.availableDays[o]||(this.availableDays[o]=[]),this.availableDays[o].push(i.getDate()),this.availableDates.push(i)}}getMonthName(t){return["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][t.getMonth()]}submitHorarios(t){return C(this,null,function*(){let i=[];if(this.availableDates.forEach(o=>{let c=o.getDate(),O=o.getMonth()+1,S=o.getFullYear();if(this.selectedDays[c]){let y=this.availableTimes[c];y.start&&y.end&&y.start!==y.end?i.push({date:`${c.toString().padStart(2,"0")}/${O.toString().padStart(2,"0")}/${S}`,timeRange:{start:y.start,end:y.end}}):console.log(`Horarios no v\xE1lidos para el d\xEDa ${c}`)}}),i.length===0){console.log("No se han seleccionado horarios");return}try{yield this.firebaseSvc.saveEspecialistaHorarios(this.uid,i),console.log("Horarios guardados con \xE9xito")}catch(o){console.error("Error al guardar los horarios",o)}finally{t.reset(),this.loadHorarios()}})}getUidFromLocalStorage(){let t=JSON.parse(localStorage.getItem("user")||"{}");t&&t.uid?this.uid=t.uid:console.error("UID no encontrado en localStorage")}getFilteredEndTimes(t){let i=this.availableTimes[t]?.start;if(i){let o=this.availableTimeSlots.indexOf(i);return this.availableTimeSlots.slice(o+1)}return this.availableTimeSlots}isEndTimeInvalid(t){let i=this.availableTimes[t]?.start,o=this.availableTimes[t]?.end;if(i&&o){let c=this.availableTimeSlots.indexOf(i);return this.availableTimeSlots.indexOf(o)<=c}return!1}loadHorarios(){return C(this,null,function*(){if(this.uid)try{this.horarios=yield this.firebaseSvc.getEspecialistaHorarios(this.uid)}catch(t){console.error("Error al cargar los horarios",t)}else console.error("No se puede cargar los horarios porque no hay UID")})}};l.\u0275fac=function(i){return new(i||l)},l.\u0275cmp=E({type:l,selectors:[["app-mis-horarios"]],standalone:!0,features:[F],decls:16,vars:5,consts:[["horariosForm","ngForm"],[3,"title"],[1,"horarios-form",3,"ngSubmit"],[1,"month-columns"],[1,"month-column"],["class","month-container",4,"ngFor","ngForOf"],["type","submit",1,"submit-btn"],[1,"d-flex","w-100",2,"justify-content","center"],[1,"w-80","mb-50"],["class","horarios-table",4,"ngIf"],[4,"ngIf"],[1,"month-container"],[1,"days-container"],["class","day-container",4,"ngFor","ngForOf"],[1,"day-container"],[1,"day-label"],[1,"checkbox-container"],["type","checkbox",1,"checkbox-input",3,"ngModelChange","ngModel","name","id"],[1,"checkbox-label",3,"for"],["class","time-selector",4,"ngIf"],[1,"time-selector"],[1,"time-label",3,"for"],[1,"time-select",3,"ngModelChange","ngModel","name"],[3,"value",4,"ngFor","ngForOf"],[1,"time-select",3,"ngModelChange","ngModel","name","ngClass"],[3,"value"],[1,"horarios-table"],[4,"ngFor","ngForOf"],[2,"font-weight","600",3,"ngClass"]],template:function(i,o){if(i&1){let c=M();I(0,"app-header",1),s(1,"form",2,0),k("ngSubmit",function(){f(c);let S=H(2);return x(o.submitHorarios(S))}),s(3,"div",3)(4,"div",4),_(5,se,5,2,"div",5),a(),s(6,"div",4),_(7,me,5,2,"div",5),a()(),s(8,"button",6),d(9,"Guardar Horarios"),a()(),s(10,"div",7)(11,"h1"),d(12,"TUS HORARIOS"),a()(),s(13,"div",8),_(14,_e,13,1,"table",9)(15,he,2,0,"p",10),a()}i&2&&(p("title","MyClinic"),r(5),p("ngForOf",o.getFirstHalfMonths()),r(2),p("ngForOf",o.getSecondHalfMonths()),r(7),p("ngIf",o.horarios.length>0),r(),p("ngIf",o.horarios.length===0))},dependencies:[W,$,Z,Y,Q,X,j,K,R,J,q,G,ee,U,z,A],styles:['@charset "UTF-8";.horarios-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.month-columns[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%;max-width:1400px}.month-column[_ngcontent-%COMP%]{flex:1;margin:0 10px}.month-container[_ngcontent-%COMP%]{width:700px;margin:20px auto;padding:15px;border:2px solid #ccc;border-radius:10px;background-color:#f9f9f9;box-shadow:0 4px 8px #0000001a}.month-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:center;font-size:1.5rem;color:#333;margin-bottom:15px}.days-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:10px}.day-container[_ngcontent-%COMP%]{width:200px;padding:10px;border:1px solid #ddd;border-radius:5px;background-color:#fff;display:flex;flex-direction:column;align-items:flex-start}.checkbox-container[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:10px}.checkbox-input[_ngcontent-%COMP%]{margin-right:10px}.time-selector[_ngcontent-%COMP%]{margin-top:10px;width:100%}.time-label[_ngcontent-%COMP%]{font-size:.9rem;margin-bottom:5px;display:block}.time-select[_ngcontent-%COMP%]{width:100%;padding:5px;font-size:1rem;border:1px solid #ccc;border-radius:5px}.submit-btn[_ngcontent-%COMP%]{margin-top:20px;padding:15px 20px;background-color:#007bff;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:25px;margin-bottom:50px}.submit-btn[_ngcontent-%COMP%]:hover{background-color:#0056b3}.pos-cerrar-sesion[_ngcontent-%COMP%]{position:absolute;top:10px;right:50px;background-color:#000}.p-fixed-bottom[_ngcontent-%COMP%]{position:fixed;bottom:0;width:100%}.pos-cerrar-sesion[_ngcontent-%COMP%]{background-color:#d32f2f;color:#fff;font-size:16px;padding:10px 20px;border-radius:25px;border:none;transition:background-color .3s,transform .2s}.pos-cerrar-sesion[_ngcontent-%COMP%]:hover{background-color:#b71c1c;transform:scale(1.05)}.pos-cerrar-sesion[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 2px #ffffff80}.pos-cerrar-sesion[_ngcontent-%COMP%]:active{background-color:#9a0007}.checkbox-container[_ngcontent-%COMP%]{display:flex;align-items:center;margin:10px 0;padding:5px}.checkbox-input[_ngcontent-%COMP%]{display:none}.checkbox-label[_ngcontent-%COMP%]{position:relative;padding-left:40px;font-size:1.1rem;font-weight:600;color:#555;cursor:pointer;-webkit-user-select:none;user-select:none;display:inline-block;line-height:24px;transition:all .3s ease}.checkbox-label[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;top:0;width:24px;height:24px;border:2px solid #4CAF50;border-radius:5px;background-color:#fff;transition:all .3s ease}.checkbox-input[_ngcontent-%COMP%]:checked + .checkbox-label[_ngcontent-%COMP%]:before{background-color:#4caf50;border-color:#4caf50}.checkbox-input[_ngcontent-%COMP%]:checked + .checkbox-label[_ngcontent-%COMP%]{color:#4caf50}.checkbox-label[_ngcontent-%COMP%]:hover:before{border-color:#388e3c}.checkbox-label[_ngcontent-%COMP%]:active:before{transform:scale(.95)}.checkbox-input[_ngcontent-%COMP%]:focus + .checkbox-label[_ngcontent-%COMP%]:before{outline:2px solid #388E3C;outline-offset:2px}.day-label[_ngcontent-%COMP%]{font-size:15px;font-weight:600;color:#333;margin-bottom:5px;display:block;text-align:center;padding:10px;background-color:#f4f4f4;border-radius:5px;box-shadow:0 2px 4px #0000001a;transition:all .3s ease;cursor:default}.horarios-table[_ngcontent-%COMP%]{width:80%;border-collapse:collapse;margin-top:20px;font-family:Arial,sans-serif;background-color:#f9f9f9}.horarios-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:#3f51b5;color:#fff}.horarios-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:12px 15px;text-align:left;font-size:16px}.horarios-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{border-bottom:1px solid #ddd}.horarios-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px 15px;font-size:20px;text-align:left}.horarios-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f2f2f2}.horarios-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#e0e0e0}.no-horarios[_ngcontent-%COMP%]{text-align:center;font-size:16px;color:#757575;font-style:italic;margin-top:20px}@media (max-width: 768px){.horarios-table[_ngcontent-%COMP%]{font-size:12px}.horarios-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .horarios-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px}}.w-80[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center}.mb-50[_ngcontent-%COMP%]{margin-bottom:50px;padding-bottom:100px}.disponible[_ngcontent-%COMP%]{color:#707070}.pendiente[_ngcontent-%COMP%]{color:#0004fd}.rechazado[_ngcontent-%COMP%]{color:orange}.cancelado[_ngcontent-%COMP%]{color:red}.aceptado[_ngcontent-%COMP%]{color:green}.finalizado[_ngcontent-%COMP%]{color:#ae00ff}']});let n=l;return n})();export{Se as MisHorariosComponent};
