import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

ReactDOM.render(<App />, document.getElementById('root'));

/**
 * Electron用拡張
 */
declare global {
  interface Window {
    require: any;
  }
}
