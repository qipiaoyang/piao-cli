
export default {
	'GET /seller/quote/v1': (req, res) => {
		let rows = [];
		for(let i = 0; i < 30; i++) {
			rows.push({
				id: i,
				name: `【英雄联盟】
				  游戏等级22；四位英雄、3个皮肤
				  QQ等级1-5级；有QQ好友`,
				price: '0',
				pay_duration: i,
				user_identity: 0,
				state: 0,
				num: `${parseInt(Math.random() * 10)}`,
			})
		}
		res.send({
			code: 200,
			data: {
				total: 30,
				data: rows
			}
		})
	},
};
