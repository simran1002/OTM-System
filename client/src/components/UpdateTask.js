import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead
import './UpdateTask.css'; // Link to the CSS file

const UpdateTask = () => {
    const { id } = useParams(); // Get task ID from URL
    const navigate = useNavigate(); // Use useNavigate for navigation
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'Not Started',
        assignedTo: ''
    });
    const [users, setUsers] = useState([]); // State for user options

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: token }
            });
            setTask(response.data);
        };

        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/users`, {
                headers: { Authorization: token }
            });
            setUsers(response.data); // Assuming response.data is an array of user objects
        };

        fetchTask();
        fetchUsers();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.patch(`http://localhost:5000/api/tasks/${id}`, task, {
            headers: { Authorization: token }
        });
        alert('Task updated successfully!');
        navigate('/tasks'); // Redirect after updating
    };

    return (
        <div className="update-task-container">
            <h2 className="update-task-title">Update Task</h2>
            <form className="update-task-form" onSubmit={handleUpdateTask}>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                />
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate.split('T')[0]} // Format date for input
                    onChange={handleChange}
                    required
                />
                <select name="status" value={task.status} onChange={handleChange}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select
                    name="assignedTo"
                    value={task.assignedTo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name} {/* Assuming user object has name and _id */}
                        </option>
                    ))}
                </select>
                <button type="submit" className="update-task-button">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;
