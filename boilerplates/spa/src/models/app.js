
export default {
	namespace: 'app',
	state: {
		pathname: "",

	},
	reducers: {
		//更新state
		updateState(state, payload) {
			return {
				...state,
				...payload
			}
		},
	},
	effects: {
		* reload(payload, { put }) {

		},
	},
	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(async (location) => {
				window.scrollTo(0, 0);
				dispatch({
					type: "reload",
					location: location,
				});
			})
		}
	},
};
