import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import configureStore from './configureStore';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';

// const store = configureStore();

ReactDOM.render((
  // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </Provider>
), document.getElementById('root'))
