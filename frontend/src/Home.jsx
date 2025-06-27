import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsCheckCircleFill, BsTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };


    useEffect(() => {
        fetchTodos();
    }, []);
    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(() => {
                // Update only the edited todo
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === id ? { ...todo, done: !todo.done } : todo
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(() => {
                // Remove the deleted todo
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>To Do List</h2>
            <Create refreshTodos={fetchTodos} /> {/* ✅ Passing function */}
            {
                todos.length === 0 ? (
                    <div><h3>No Tasks Found</h3></div>
                ) : (
                    todos.map((todo) => (
                        <div key={todo._id} className='task'>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                    <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill> :
                                    <BsCircleFill className='icon checkbox-icon' />
                                }
                                {/* Use checkbox icon here */}
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div className='delete'>
                                {/* Delete icon here */}
                                <BsTrashFill className='icon delete-icon' onClick={() => handleDelete(todo._id)} />
                            </div>
                        </div>
                    ))
                )
            }
        </div >
    );
}

export default Home;
