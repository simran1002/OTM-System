import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import TaskOptions from './components/TaskOptions';
import UpdateTask from './components/UpdateTask';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/task-options" element={<TaskOptions />} />
                <Route path="/update-task" element={<UpdateTask />} />
            </Routes>
        </Router>
    );
};

export default App;
