const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	telegramId: Number,
	name: String,
	phone: String,
})

module.exports = mongoose.model('User', userSchema)
