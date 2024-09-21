const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Task Owner', 'Assigned User'], default: 'Assigned User' }
});

module.exports = mongoose.model('User', userSchema);
