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

// Test Email Route
router.post('/send-reminder', auth, async (req, res) => {
    const currentTime = new Date();
    const thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60000);

    try {
        const tasksDue = await Task.find({
            assignedTo: req.user.id,
            dueDate: { $gte: currentTime, $lte: thirtyMinutesLater }
        }).populate('assignedTo');

        if (tasksDue.length === 0) {
            return res.status(200).send('No tasks due in the next 30 minutes.');
        }

        for (const task of tasksDue) {
            const { assignedTo, title, dueDate } = task;
            const email = assignedTo.email;
            const emailBody = generateTaskEmail(assignedTo.name, title, dueDate);

            // Send the email
            try {
                await sendEmail(email, `Task Due Soon: ${title}`, emailBody);
                console.log(`Reminder email sent to ${email}`);
            } catch (error) {
                console.error(`Error sending email to ${email}:`, error);
            }
        }

        res.status(200).send(`Reminder emails sent to ${tasksDue.length} tasks.`);
    } catch (error) {
        console.error('Error checking for due tasks:', error);
        res.status(500).send('Error checking for due tasks.');
    }
});


module.exports = router;

