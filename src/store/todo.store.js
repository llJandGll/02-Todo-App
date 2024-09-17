import { Todo } from '../models/todo.model'

//* this is a object to search by category
const Filters = {
  All : "all",
  Completed: "Completed",
  Pending : "Pending",
}

const state = {
  todos : [],
  filter : Filters.All,
}

const initStore = () => {
  loadStore();
  console.log("initStore ");
};

const loadStore = () => {
  if ( !localStorage.getItem("todos")) return;
  
  const { todos = [] , filter = Filters.All } = JSON.parse(localStorage.getItem("todos"));

  state.todos = todos;
  state.filter = filter;
};

//* Funcionalidades

const saveStateLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(state));
  
};



const getTodos = ( filter = Filters.All ) => {
  switch( filter ){
    case Filters.All :
      return [...state.todos];
    case Filters.Completed :
      return state.todos.filter( todo => todo.done );
    case Filters.Pending :
      return state.todos.filter( todo => !todo.done);
    default :
      throw new Error(`Option ${filter} is not valid`);
    
  }



};


/**
 * 
 * @param [String} descri]tion 
 */
const addTodo = ( description = "" ) => {
  if(!description) throw new Error("Description is Required");
  state.todos.push( new Todo( description ));
  saveStateLocalStorage();
};

/**
 * 
 * @param {Number } param altera su estado 
 */

const toggleTodo = ( todoId ) => {
  state.todos = state.todos.map( todo => {
    if ( todo.id === todoId ) {
      todo.done = !todo.done;
    }
    return todo;
  });

  saveStateLocalStorage();
};

/**
 * 
 * @param {Number} todoId elimina mediante id 
 */
const deleteTodo = ( todoId ) => {
  
  state.todos = state.todos.filter( todo => todo.id !== todoId);
  saveStateLocalStorage();
  return state.todos;
};


const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done);
  saveStateLocalStorage();
  // initStore();
};

const setFilter = ( newFilter = Filters.All) => {
  state.filter = newFilter;
  saveStateLocalStorage();
};


const getCurrentFilter = () => {
    return state.filter;
};




export default {
  initStore,
  loadStore,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  getTodos,
  Filters
}
