import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//Redux
import { Provider } from 'react-redux';

// Router 
import { BrowserRouter } from 'react-router-dom';

//store
import { store } from './store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
)
