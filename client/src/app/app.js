import './app.scss';
import Router from './router';
import React from 'react';

const App = () => {
  return (
    <div className="App">
      <h1 className='title'>Communities</h1>
      <Router />
    </div>
  );
}

export default React.memo(App);
