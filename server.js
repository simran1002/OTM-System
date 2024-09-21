const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

const cron = require('node-cron');
const Task = require('./models/Task'); // Import your Task model
const { sendEmail } = require('./emailService');

// Schedule task every minute
cron.schedule('* * * * *', async () => {
    const currentTime = new Date();
    const thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60000); // 30 minutes later

    // Find tasks that are due in 30 minutes
    const tasksDue = await Task.find({
        dueDate: { $gte: currentTime, $lte: thirtyMinutesLater }
    }).populate('assignedTo'); // Populate the assigned user

    tasksDue.forEach(task => {
        const email = task.assignedTo.email; // Assuming the User model has an email field
        const subject = `Task Due Soon: ${task.title}`;
        const text = `Your task "${task.title}" is due in 30 minutes.`;

        sendEmail(email, subject, text)
            .then(() => console.log(`Email sent to ${email}`))
            .catch(error => console.error(`Error sending email to ${email}:`, error));
    });
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
