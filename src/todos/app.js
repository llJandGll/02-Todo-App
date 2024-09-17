import todoStore from "../store/todo.store";
import { renderTodos, renderPending } from "../use-cases";
import html from "./app.html?raw"

const identifyingElements = {
  TodoList : ".todo-list",
  NewTodoInput : "#new-todo-input",
  ClearCompletedButtom : ".clear-completed",
  TodoFilters : ".filtro",
  TodoPending : "#pending-count",
}


/**
 * 
 * @param {String} string un id de una etiqueta html
 */

export const App = ( elementId ) => {

  const displayTodos = ( ) => {
    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    renderTodos( identifyingElements.TodoList, todos);
    renderPendingCount();
  };

  const renderPendingCount = () => {
    
    renderPending( identifyingElements.TodoPending );
    
  };
  
  //* Funcion autoinvocada
  (() => {
    const app = document.createElement("h1");
    app.innerHTML = `${ html }`;
    document.querySelector( elementId ).append( app );
    displayTodos();
  })();

    //* References Html

  const inputDescription = document.querySelector( identifyingElements.NewTodoInput );
  const todoListUl = document.querySelector( identifyingElements.TodoList ); 
  const todoDestroy = document.querySelector( identifyingElements.TodoList );
  const clearCompleted = document.querySelector( identifyingElements.ClearCompletedButtom );
  const filtersList = document.querySelectorAll( identifyingElements.TodoFilters );
  
  //* Events
  
  inputDescription.addEventListener("keyup", ( event ) => {
    let { target } = event;
    
    if ( event.keyCode !== 13 ) return;
    if (event.target.value.trim().length === 0) return;

    const existTodo = todoStore.getTodos().some( todo => todo.description.includes(target.value));
    if(existTodo) {
      target.value = "";
      throw new Error("Todo already Exist")
    }
    
    todoStore.addTodo( target.value );
    renderPendingCount();
    displayTodos();
    target.value = "";
  });


  todoListUl.addEventListener("click", ( event ) => {
    const { target } = event;
    
    const element = target.closest("[data-id]");
    const id = element.getAttribute("data-id");
    
    todoStore.toggleTodo( id );
    displayTodos();
    renderPendingCount();
    
  });

  todoDestroy.addEventListener("click", ( event ) => {
    const { target } = event;

    const isDestroyElement = target.className === "destroy";
    const element = target.closest("[data-id]");
    
    if ( !element || !isDestroyElement ) return;
    
    const id = element.getAttribute("data-id");
    todoStore.deleteTodo( id );
    renderPendingCount();
    displayTodos();
  });


  clearCompleted.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersList.forEach( element => {
    element.addEventListener("click", ( element ) => {

      filtersList.forEach( el => el.classList.remove("selected"));
      // console.log(element);
      element.target.classList = "selected";
      // console.log(element.target.text);
      const { All, Completed, Pending } = todoStore.Filters;
      switch ( element.target.text ) {
        
        case "Todos":
          todoStore.setFilter( All );
          break;
        case "Pendientes" :
          todoStore.setFilter( Pending ); 
          break;
        case "Completados" :
          todoStore.setFilter( Completed ); 
          break;
        default:
          todoStore.setFilter( All )
          break;
      }

      displayTodos();
      
    });
  });

};

