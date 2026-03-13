require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')
const mongoose = require('mongoose')
const User = require('./models/User')
const Course = require('./models/Course')

mongoose.connect(process.env.MONGO_URI)

const bot = new Telegraf(process.env.BOT_TOKEN)

let step = {}

// START
bot.start(async ctx => {
	const telegramId = ctx.from.id
	const user = await User.findOne({ telegramId })

	if (user) {
		ctx.reply("Siz oldin ro'yxatdan o'tgansiz ✅", mainMenu())
	} else {
		ctx.reply(
			'👋 Assalomu alaykum!\n\nBu bot orqali ayollar uchun IT kurslarini bepul o‘rganishingiz mumkin.',
			Markup.keyboard([["📝 Ro'yxatdan o'tish"]]).resize(),
		)
	}
})

// REGISTER
bot.hears("📝 Ro'yxatdan o'tish", ctx => {
	step[ctx.from.id] = 'name'
	ctx.reply('Ismingizni kiriting:')
})

// NAME
bot.hears('text', ctx => {
	const telegramId = ctx.from.id

	if (step[telegramId] !== 'name') return

	step[telegramId] = 'phone'
	step['name_' + telegramId] = ctx.message.text

	ctx.reply(
		'Telefon raqamingizni yuboring',
		Markup.keyboard([
			Markup.button.contactRequest('📱 Telefon yuborish'),
		]).resize(),
	)
})

// PHONE
bot.on('contact', async ctx => {
	const telegramId = ctx.from.id

	const name = step['name_' + telegramId]
	const phone = ctx.message.contact.phone_number

	await User.create({
		telegramId,
		name,
		phone,
	})

	delete step[telegramId]
	delete step['name_' + telegramId]

	ctx.reply("✅ Ro'yxatdan o'tdingiz!", mainMenu())
})

// KURSLAR
bot.hears('Kurslar', ctx => {
	ctx.reply(
		'Kursni tanlang:',
		Markup.keyboard([
			['Frontend'],
			['Python'],
			['Grafik dizayn'],
			['⬅️ Orqaga'],
		]).resize(),
	)
})

// FRONTEND
bot.hears('Frontend', async ctx => {

	const course = await Course.findOne({ title: "Frontend darslari3" })

	if(!course) return ctx.reply("Kurs topilmadi")

	await ctx.reply(`📚 ${course.title}\n\n${course.description}`)

	await ctx.reply(`PDF darslik:\n${course.pdf}`)

	await ctx.replyWithVideo(course.video)

	await ctx.reply(`YouTube dars:\n${course.youtube}`)

})

// BACK
bot.hears('⬅️ Orqaga', ctx => {
	ctx.reply('Bosh menyu', mainMenu())
})

// MAIN MENU
function mainMenu() {
	return Markup.keyboard([['Kurslar', '📝 Test']]).resize()
}

bot.launch()

console.log('Bot ishga tushdi')
