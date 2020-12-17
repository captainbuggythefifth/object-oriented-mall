import React from 'react';
import './App.css';
import Complex from 'components/templates/Complex';
import store from 'store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Complex />
    </Provider>
  );
}

export default App;
