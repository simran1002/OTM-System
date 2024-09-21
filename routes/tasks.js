const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
    const task = new Task({ ...req.body, owner: req.user.id });
    await task.save();
    res.status(201).send(task);

    const assignTask = async (taskId, userId) => {
        const task = await Task.findById(taskId);
        task.assignedTo = userId;
        await task.save();
    
        const user = await User.findById(userId); // Fetch the user details
        const email = user.email;
        const subject = `New Task Assigned: ${task.title}`;
        const text = `You have been assigned a new task: "${task.title}".`;
    
        sendEmail(email, subject, text)
            .then(() => console.log(`Email sent to ${email}`))
            .catch(error => console.error(`Error sending email to ${email}:`, error));
    };
    
});


// Get Tasks for Assigned User
router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ assignedTo: req.user.id }).populate('owner');
    res.json(tasks);
});


// Update Task
router.patch('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});


module.exports = router;

