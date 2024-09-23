const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();
const { sendEmail } = require('../emailService');

// Create Task
router.post('/', auth, async (req, res) => {
    const { title, description, dueDate } = req.body;

    // Check if user has permission to create tasks
    if (req.user.role !== 'Admin' && req.user.role !== 'Task Owner') {
        return res.status(403).send('Unauthorized. Only Admins and Task Owners can create tasks.');
    }

    // Create the task without the assignedTo field
    const task = new Task({ title, description, dueDate, owner: req.user.id });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// Get Assigned Tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id }).populate('owner');
        res.json(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update Task
router.patch('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
