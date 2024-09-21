import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskList.css'; // Import the CSS file

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/tasks', { headers: { Authorization: token } });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="task-list-container">
            <h2>Your Tasks</h2>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <div className="task-item" key={task._id}>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                        <p className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        <p className="task-status">Status: {task.status}</p>
                    </div>
                ))
            ) : (
                <p>No tasks assigned to you.</p>
            )}
        </div>
    );
};

export default TaskList;
