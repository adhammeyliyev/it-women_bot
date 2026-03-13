require('dotenv').config()
const mongoose = require('mongoose')
const Course = require('./models/Course')

mongoose.connect(process.env.MONGO_URI)

async function seed() {
	const courses = [
		{
			title: 'Frontend darslari3',
			description:
				'Frontend kursida siz LMTH, CSS va JavaScript asoslarini o‘rganasiz.',
			pdf: 'https://docs.google.com/document/d/1w3Wv3kE8CIR1YXbc6uFtwrNQg_HVIV1Rl20ZibhGw1U/edit?usp=sharing',
			video: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
			youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
		},
		{
			title: 'Python',
			description: 'Python dasturlash tilini 0 dan o‘rganish kursi.',
			pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
			video: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
			youtube: 'https://youtube.com/watch?v=kqtD5dpn9C8',
		},
	]

	for (let course of courses) {
		const exists = await Course.findOne({ title: course.title })

		if (!exists) {
			await Course.create(course)
			console.log(course.title + ' added')
		} else {
			console.log(course.title + ' already exists')
		}
	}

	console.log('Finished')
	process.exit()
}

seed()
