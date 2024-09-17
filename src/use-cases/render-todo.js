import { createTodoHtml } from './create-todo-html'



let element;
export const renderTodos = ( elementoId , todos = []) => {
  
  if ( !element ) {
    element = document.querySelector( elementoId );
  }

  if (!element) throw new Error(`Elemento ${elementoId} not found`);
  
  element.innerHTML = "";

  todos.forEach( todo => {
    // console.log(todo);
    
    element.append(createTodoHtml( todo ));
  });
};