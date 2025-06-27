import React, { useState } from 'react';
import axios from 'axios';

function Create({ refreshTodos }) {
    const [task, setTask] = useState('');

    const handleAdd = async () => {
        if (!task.trim()) return;

        try {
            await axios.post('http://localhost:3001/add', { task });
            setTask('');
            refreshTodos();
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    // ⌨️ Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className='create_form'>
            <input
                type="text"
                placeholder='Enter Task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyDown}  // ✅ Attach event here
                className='input1'
            />
            <input
                type="button"
                value="Add"
                className='input2'
                onClick={handleAdd}
            />
        </div>
    );
}

export default Create;
