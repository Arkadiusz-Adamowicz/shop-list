import React, { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import dateFormat from 'dateformat';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  //add tasks
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      text: input,
      isComplete: false,
    };
    console.log(newTask);
    setTasks([...tasks, newTask]);
    setInput('');
  };

  // delete tasks
  const deleteTask = (id) => {
    let filteredTasks = [...tasks].filter((task) => task.id !== id);
    setTasks(filteredTasks);
    console.log('task deleted');
  };

  // toggle completed task
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className='app'>
      <div className='container'>
        <h1>
          <FaShoppingBasket className='shop-icon'/>
          <span>Shoplist</span>
        </h1>
        <div className='date'>
          <p>{dateFormat('dddd')}</p>
          <p>{dateFormat('d')}</p>
          <p>{dateFormat('mmmm')}</p>
          <p>{dateFormat('yyyy')}</p>
        </div>
        <div>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
          <AiOutlinePlus className='icon'/>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Enter a task'
          />
          </div>
        </form>
        <div>
          {tasks.map((task) => (
            <div className={`task-row ${task.completed ? 'completed' : ''}`}  key={task.id} onDoubleClick={() => toggleComplete(task.id)}>
              <p>
                {task.text}
              </p>
                <RiDeleteBinLine className='icon' onClick={() => deleteTask(task.id)}/>
            </div>
          ))}
        </div>
        <p className='counter'>{(tasks < 1 ) ? 'You have no tasks' : `Tasks: ${tasks.length}`}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
