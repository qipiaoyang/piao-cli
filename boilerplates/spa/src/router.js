import PropTypes from 'prop-types';
import {Switch, Route, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';

const {ConnectedRouter} = routerRedux;
const Routers = function ({history, app}) {

  const routes = [
    // 我是买家
    {
      path: '/buyer/:type',
      component: () => import('./routes/buyer'),
      models: () => [
        import('./models/buyer/index'),
        import('./models/common/upload'),
      ]
    },
    
  ];


  return (
    <ConnectedRouter className='router' history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/buyer"/>)}/>
          {

            routes.map(({path, ...dynamics}, key) => (
              <Route key={key}
                     exact
                     path={path}
                     component={dynamic({
                       app,
                       ...dynamics,
                     })}
              >
              </Route>
            ))
          }
        </Switch>

      </App>
    </ConnectedRouter>
  );
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers




