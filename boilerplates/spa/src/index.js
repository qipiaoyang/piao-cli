
import "@babel/polyfill";
// import Promise from 'promise-polyfill';
import { message } from "antd";
import dva from 'dva';
import './index.scss';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';


// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError (error) {
    message.error(error.message)
    // message.error('出错了')
  },
});

// 2. Plugins

// 3. Model
app.model(require('./models/app').default)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
