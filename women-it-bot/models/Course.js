const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
	title: String,
	description: String,
	pdf: String,
	video: String,
	youtube: String
})

module.exports = mongoose.model('Course', courseSchema)