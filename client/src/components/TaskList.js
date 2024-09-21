import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/tasks', { headers: { Authorization: token } });
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Your Tasks</h2>
            {tasks.map(task => (
                <div key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p>Status: {task.status}</p>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
