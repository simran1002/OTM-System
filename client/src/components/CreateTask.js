import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/tasks', { title, description, dueDate }, { headers: { Authorization: token } });
        window.location.reload();
    };

    return (
        <form onSubmit={handleCreateTask}>
            <input type="text" placeholder="Task Title" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <input type="date" onChange={(e) => setDueDate(e.target.value)} />
            <button type="submit">Create Task</button>
        </form>
    );
};

export default CreateTask;
