import React, { useState } from 'react';
import './Todo.css';
const Todo = () => {
  const[todo,setTodo] =  useState("");
  const[todos,setTodos] =  useState([]);
  const [editid, seteditid] = useState(0);
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(editid){
      const editTodo = todos.find((i)=> i.id === editid)
      const updatedTodos = todos.map((t)=>t.id === editTodo.id?(t={id:t.id,todo}): {id:t.id,todo:t.todo})
      setTodos(updatedTodos);
      seteditid(0)
      setTodo("")
      return
    }
    if(todo !== ''){
      setTodos([{id:`${todo}-${Date.now()}`,todo},...todos])
    }
    setTodo("")

  }
  const handleDelete = (id) =>{
    const delTodo = todos.filter((to)=>to.id !== id);
    setTodos([...delTodo])
  }
  const handleEdit = (id) => {
    
    const editTodo = todos.find((i)=>i.id === id);
    setTodo(editTodo.todo)
    seteditid(id);

  }

  return (
      
    <div className = "App">
      <div className="container">
        <h1>Todo List App </h1>
        <form className="todoform" onSubmit={handleSubmit}>
          <input type = 'text' onChange={(e)=>setTodo(e.target.value)} value={todo}/>
          <button type='submit'>{editid?"Edit":"Go"}</button>
        </form>
        <ul className="alltodos">
          {
            todos.map((t)=>(
              <li className="singleTodo"><span className="todoText" key={t.id}>{t.todo}</span>
              <button onClick={()=>handleEdit(t.id)}>Edit</button>
              <button onClick={()=>handleDelete(t.id)}>Delete</button>
              </li>          
            ))
          }
         
        </ul>
      </div>     
    </div>
  )
}

export default Todo
