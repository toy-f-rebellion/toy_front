import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './component/configstore';
import { hydrate, render } from 'react-dom';

// const rootElement = document.getElementById('root');
// if (rootElement.hasChildNodes()) {
//   <Provider store={store}>
//     hydrate(<App />, rootElement);
//   </Provider>
// } else {
//   <Provider store={store}>
//     render(<App />, rootElement);
//   </Provider>
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();