const User = require('../models/User')

module.exports = bot => {
	bot.command('start', async ctx => {
		const telegramId = ctx.from.id

		let user = await User.findOne({ telegramId })

		if (!user) {
			await User.create({
				telegramId,
			})

			ctx.reply("Ro'yxatdan o'tdingiz ✅")
		} else {
			ctx.reply("Siz oldin ro'yxatdan o'tgansiz")
		}
	})
}
