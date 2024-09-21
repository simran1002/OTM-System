const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();
const { sendEmail } = require('../emailService');

// Create Task
router.post('/', auth, async (req, res) => {
    const { title, description, dueDate } = req.body;
    const task = new Task({ title, description, dueDate, owner: req.user.id });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Assign Task
router.patch('/assign/:taskId/:userId', auth, async (req, res) => {
    const { taskId, userId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send('Task not found');
        }

        // Check if user has permission to assign tasks
        if (req.user.role !== 'Admin' && req.user.role !== 'Task Owner') {
            return res.status(403).send('Unauthorized');
        }

        // Assign task to user
        task.assignedTo = userId;
        await task.save();

        // Send notification email to assigned user
        const user = await User.findById(userId);
        const email = user.email;
        const subject = `New Task Assigned: ${task.title}`;
        const text = `You have been assigned a new task: "${task.title}". Please check and complete it by ${task.dueDate.toLocaleString()}.`;

        sendEmail(email, subject, text)
            .then(() => console.log(`Email sent to ${email}`))
            .catch(error => console.error(`Error sending email to ${email}:`, error));

        res.json(task);
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
