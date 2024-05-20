const mongoose = require('mongoose');

const autoTimeoutSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    infractions: { type: Number, default: 0 },
    timeout: { type: Date, default: null }
});

const AutoTimeout = mongoose.model('AutoTimeout', autoTimeoutSchema);

module.exports = AutoTimeout;
