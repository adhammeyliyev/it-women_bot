bot.command('test', ctx => {
	ctx.reply('HTML nima?', {
		reply_markup: {
			keyboard: [['Dasturlash tili'], ['Markup tili'], ['Database']],
			resize_keyboard: true,
		},
	})
})
