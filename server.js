const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

const cron = require('node-cron');
const Task = require('./models/Task');
const User = require('./models/User');
const { sendEmail } = require('./emailService');

// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    const currentTime = new Date();
    const thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60000);

    try {
        const tasksDue = await Task.find({
            dueDate: { $gte: currentTime, $lte: thirtyMinutesLater }
        }).populate('assignedTo');

        // Send email to each user assigned to a task
        for (const task of tasksDue) {
            if (task.assignedTo) {
                const { assignedTo, title, dueDate } = task;
                const email = assignedTo.email;

                // Generate the email body
                const emailBody = generateTaskEmail(assignedTo.name, title, dueDate);

                // Send the email
                await sendEmail(email, `Task Due Soon: ${title}`, emailBody)
                    .then(() => console.log(`Email sent to ${email}`))
                    .catch(error => console.error(`Error sending email to ${email}:`, error));
            } else {
                console.warn(`Task "${task.title}" has no assigned user.`);
            }
        }
    } catch (error) {
        console.error('Error checking for due tasks:', error);
    }
});

// Generate email body for the task
const generateTaskEmail = (name, taskTitle, dueDate) => {
    return `
        Hi ${name},

        This is a reminder that the task "${taskTitle}" is due on ${dueDate.toLocaleString()}.

        Please ensure to complete it on time.

        Best regards,
        Task Management Team
    `;
};

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
