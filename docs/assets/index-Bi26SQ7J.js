(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const g of n.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&i(g)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();var r=[];for(var w=0;w<256;++w)r.push((w+256).toString(16).slice(1));function A(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}var b,P=new Uint8Array(16);function x(){if(!b&&(b=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!b))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return b(P)}var k=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const L={randomUUID:k};function F(e,t,a){if(L.randomUUID&&!t&&!e)return L.randomUUID();e=e||{};var i=e.random||(e.rng||x)();return i[6]=i[6]&15|64,i[8]=i[8]&63|128,A(i)}class O{constructor(t){this.id=F(),this.description=t,this.done=!1,this.createAt=new Date}}const p={All:"all",Completed:"Completed",Pending:"Pending"},s={todos:[],filter:p.All},D=()=>{S(),console.log("initStore ")},S=()=>{if(!localStorage.getItem("todos"))return;const{todos:e=[],filter:t=p.All}=JSON.parse(localStorage.getItem("todos"));s.todos=e,s.filter=t},T=()=>{localStorage.setItem("todos",JSON.stringify(s))},U=(e=p.All)=>{switch(e){case p.All:return[...s.todos];case p.Completed:return s.todos.filter(t=>t.done);case p.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},q=(e="")=>{if(!e)throw new Error("Description is Required");s.todos.push(new O(e)),T()},I=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),T()},M=e=>(s.todos=s.todos.filter(t=>t.id!==e),T(),s.todos),N=()=>{s.todos=s.todos.filter(e=>!e.done),T()},H=(e=p.All)=>{s.filter=e,T()},R=()=>s.filter,d={initStore:D,loadStore:S,addTodo:q,toggleTodo:I,deleteTodo:M,deleteCompleted:N,setFilter:H,getCurrentFilter:R,getTodos:U,Filters:p},V=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,id:a,description:i}=e,o=`
                  <div class="view">
                    <input class="toggle" type="checkbox" ${t?"checked":""}>
                    <label> ${i}</label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="Create a TodoMVC template">
                `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",a),t&&(n.classList="completed"),n};let f;const $=(e,t=[])=>{if(f||(f=document.querySelector(e)),!f)throw new Error(`Elemento ${e} not found`);f.innerHTML="",t.forEach(a=>{f.append(V(a))})};let y;const j=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error("Element "+y+" not found");y.innerHTML=d.getTodos(d.Filters.Pending).length},B=`<section class="todoapp">\r
  <header class="header">\r
      <h1>Tareas</h1>\r
      <input \r
        id="new-todo-input" \r
        class="new-todo" \r
        placeholder="Agrega tus Tareas" \r
        autofocus\r
        >\r
        <!-- //TODO - obtener la caja por el atributo value y no por id -->\r
  </header>\r
  \r
  <!-- This section should be hidden by default and shown when there are todos -->\r
  <section class="main">\r
      <input id="toggle-all" class="toggle-all" type="checkbox">\r
      <label for="toggle-all">Mark all as complete</label>\r
      <ul class="todo-list">\r
          <!-- These are here just to show the structure of the list items -->\r
          <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
          <!-- <li class="completed" data-id="abc">\r
              <div class="view">\r
                  <input class="toggle" type="checkbox" checked>\r
                  <label>Probar JavaScript</label>\r
                  <button class="destroy"></button>\r
              </div>\r
              <input class="edit" value="Create a TodoMVC template">\r
          </li> -->\r
          <!-- <li>\r
              <div class="view">\r
                  <input class="toggle" type="checkbox">\r
                  <label>Comprar un unicornio</label>\r
                  <button class="destroy"></button>\r
              </div>\r
              <input class="edit" value="Rule the web">\r
          </li> -->\r
      </ul>\r
  </section>\r
\r
  <!-- This footer should hidden by default and shown when there are todos -->\r
  <footer class="footer">\r
      <!-- This should be "0 items left" by default -->\r
      <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
      <!-- Remove this if you don't implement routing -->\r
      <ul class="filters">\r
          <li>\r
              <a class="filtro" class="selected"  href="#/">Todos</a>\r
          </li>\r
          <li>\r
              <a class="filtro" href="#/active">Pendientes</a>\r
          </li>\r
          <li>\r
              <a class="filtro" href="#/completed">Completados</a>\r
          </li>\r
      </ul>\r
      <!-- Hidden if no completed items are left ↓ -->\r
      <button class="clear-completed">Borrar completados</button>\r
  </footer>\r
</section>\r
\r
\r
<footer class="info">\r
  <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
  <!-- Change this out with your name and url ↓ -->\r
  <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
  <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,m={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompletedButtom:".clear-completed",TodoFilters:".filtro",TodoPending:"#pending-count"},J=e=>{const t=()=>{const l=d.getTodos(d.getCurrentFilter());$(m.TodoList,l),a()},a=()=>{j(m.TodoPending)};(()=>{const l=document.createElement("h1");l.innerHTML=`${B}`,document.querySelector(e).append(l),t()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.TodoList),g=document.querySelector(m.ClearCompletedButtom),C=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",l=>{let{target:c}=l;if(l.keyCode!==13||l.target.value.trim().length===0)return;if(d.getTodos().some(u=>u.description.includes(c.value)))throw c.value="",new Error("Todo already Exist");d.addTodo(c.value),a(),t(),c.value=""}),o.addEventListener("click",l=>{const{target:c}=l,u=c.closest("[data-id]").getAttribute("data-id");d.toggleTodo(u),t(),a()}),n.addEventListener("click",l=>{const{target:c}=l,h=c.className==="destroy",u=c.closest("[data-id]");if(!u||!h)return;const v=u.getAttribute("data-id");d.deleteTodo(v),a(),t()}),g.addEventListener("click",()=>{d.deleteCompleted(),t()}),C.forEach(l=>{l.addEventListener("click",c=>{C.forEach(E=>E.classList.remove("selected")),c.target.classList="selected";const{All:h,Completed:u,Pending:v}=d.Filters;switch(c.target.text){case"Todos":d.setFilter(h);break;case"Pendientes":d.setFilter(v);break;case"Completados":d.setFilter(u);break;default:d.setFilter(h);break}t()})})};J("#app");
