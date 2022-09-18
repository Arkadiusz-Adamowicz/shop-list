import React, { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import dateFormat from 'dateformat';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  //add tasks
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      text: input,
      isComplete: false,
    };
    console.log(newItem);
    setItems([...items, newItem]);
    setInput('');
  };

  // delete tasks
  const deleteItem = (id) => {
    let filteredItems = [...items].filter((item) => item.id !== id);
    setItems(filteredItems);
    console.log('task deleted');
  };

  // toggle completed task
  const toggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
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
            placeholder='Enter an item'
          />
          </div>
        </form>
        <div>
          {items.map((item) => (
            <div className={`item-row ${item.completed ? 'completed' : ''}`}  key={item.id} onDoubleClick={() => toggleComplete(item.id)}>
              <p>
                {item.text}
              </p>
                <RiDeleteBinLine className='icon' onClick={() => deleteItem(item.id)}/>
            </div>
          ))}
        </div>
        <p className='counter'>{(items < 1 ) ? 'You have no items in basket' : `Items: ${items.length}`}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
