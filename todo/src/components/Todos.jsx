import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos } from "../redux/reducer"
import   {useRef} from 'react'

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodos: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
  };
};
function Todos(props) {
  const [todo, setTodo] = useState("");

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }

  const update = (id, value, e) =>{
    if(e.which === 13){
      //here 13 is key code for enter key
       props.updateTodo({id, item: value})
       inputRef.current.disabled = true;
    }
       
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  console.log("props from store ", props);
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
      />
      <button
        className="add-btn"
        onClick={() =>
          props.addTodo({
            id: Math.floor(Math.random() * 1000),
            item: todo,
            completed: false,
          })
        }
      >
        Add
      </button>
      <br/>
      <ul>
      {props.todos.map((item) =>{
        return (
           <li key={item.id}>
           <textarea
            ref={inputRef} 
           disabled={inputRef} 
           defaultValue={ item.item}
           onKeyPress={(e) => update(item.id, inputRef.current.value,e)}
           />
           <button onClick={() => changeFocus()} >Edit</button>
        <button onClick={() => props.removeTodos(item.id)}>Delete</button> {""}
        </li> 
        )
       
       
        })
        
      }
      </ul>
    </div>
  );
}
//we can use connect method to connect this component with redux store
// The connect() function connects a React component to a Redux store.

// It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

// It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.
//
export default connect(mapStateToProps, mapDispatchToProps) (Todos);
