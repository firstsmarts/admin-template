import React from 'react'
import {render} from 'react-dom'
import getRouter from './router'
import {AppContainer} from 'react-hot-loader'

import {Provider} from 'react-redux'
import store from './redux'
import './index.css'

render((
  <Provider store={store}>
    <AppContainer>
      {getRouter()}
    </AppContainer>
  </Provider>
), document.getElementById('root'));

if (module.hot) {
  module
    .hot
    .accept('./pages/index', () => {
      const NextRootContainer = require('./pages/index');

      render((
        <Provider store={store}>
          <AppContainer>
            {NextRootContainer()}
          </AppContainer>
        </Provider>
      ), document.getElementById('root'));
    })
}
