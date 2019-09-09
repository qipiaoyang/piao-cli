
export default {
  namespace: 'upload',
  state: {
    fileList: []
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

  },
  subscriptions: {
    setup({dispatch, history}) {

    }
  },
};
