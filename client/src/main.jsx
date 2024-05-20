import './index.css'

import { persistor, store } from './redux/store.js' // Import persistor from redux store

import App from './App.jsx'
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
)