export default {
  namespace: "buyer",
  state: {
    testState: ""
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    * reload(payload, { put, select, call }) {

    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.indexOf('/buyer') > -1) {
          dispatch({ type: "reload"})
        }
      })
    }
  }
  ,
}
