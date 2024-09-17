import todoStore from "../store/todo.store";

let element;
export const renderPending = ( elementId ) => {
  if ( !element ) {
    element = document.querySelector( elementId );
  }

  if (!element) throw new Error("Element "+element+" not found");

  element.innerHTML = todoStore.getTodos( todoStore.Filters.Pending ).length;
};