import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import advertisementStore from './store/advertisementStore';
import summaryStore from './store/summaryStore';
import cityStore from './store/cityStore';
import userStore from './store/userStore';

export const Context = createContext(null)
ReactDOM.render(
  <Context.Provider value={{
    user: new userStore(),
    advertisement: new advertisementStore(),
    city: new cityStore(),
    summary: new summaryStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

