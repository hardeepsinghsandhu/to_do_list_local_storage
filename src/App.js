import './App.css';
import { React, useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid'

function App() {

  if(localStorage.getItem('todoList')===null){localStorage.setItem('todoList',JSON.stringify([]))}
  const [todoList,setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')))

  useEffect(()=>{
    localStorage.setItem('todoList',JSON.stringify(todoList))
  })

  function handleForm(e){
    const task = document.getElementById('task')
    addTodoItem(task.value)
  }

  function addTodoItem(task){
    if(((todoList.filter(item=> item.description.toUpperCase()===task.toUpperCase()).length)!==0)) return
    setTodoList([...todoList, {id:uuidv4(),description:task}])
  }

  /* function updateTodoItem(task){
    let updatedDescripton = prompt("Enter new To-do description")
    if(updatedDescripton===null){return}
    task.description = updatedDescripton
    setTodoList([...todoList])
  } */
  
  function deleteTodoItem(task){
    setTodoList(todoList.filter(x=>x.id!==task.id))
  }

  return (
    <div className='container'>
      <div className='inputField'>
        <h1>To-do List</h1>
        <form name='todoForm' onSubmit={handleForm}>
          <input type='text' placeholder='Enter Task' id='task'></input>
          <button>Add</button>
        </form>
      </div>

      <div>
        <table>
          <tbody>
          {todoList.map(x=>{return(
          <tr className='taskRows'>
            <td className='descriptionRow'>{x.description}</td>
            <td className='buttonRow'>
              {/*<button className='editButton' onClick={()=>updateTodoItem(x)}>Edit</button>*/} 
              <button className='deleteButton' onClick={()=>deleteTodoItem(x)}>Delete</button></td>
          </tr>
          )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
