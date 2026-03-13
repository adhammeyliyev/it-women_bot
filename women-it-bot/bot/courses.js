module.exports = bot => {
	bot.command('courses', ctx => {
		ctx.reply('Kursni tanlang:', {
			reply_markup: {
				keyboard: [['Frontend'], ['Python'], ['Grafik Dizayn']],
				resize_keyboard: true,
			},
		})
	})
}

bot.hears('Frontend', ctx => {
	ctx.reply('1-dars: HTML asoslari')

	ctx.replyWithDocument({
		url: 'https://example.com/html.pdf',
	})
})
