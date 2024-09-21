import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit } from 'react-icons/fa';

const TaskOptions = () => {
    const navigate = useNavigate();

    return (
        <div className="task-options-container">
        <center>
            <h2>Task Management Options</h2>
            <div className="button-group">
                <button onClick={() => navigate('/create-task')}>
                    <FaPlus /> Create Task
                </button>
                <button onClick={() => navigate('/tasks')}>
                    <FaEye /> View Tasks
                </button>
                <button onClick={() => navigate('/update-task')}>
                    <FaEdit /> Update Task
                </button>
            </div>
            </center>
        </div>
    );
};

export default TaskOptions;
