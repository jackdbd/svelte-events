import "@babel/polyfill";

import App from './components/App';
import './assets/css/global.css';

const app = new App({
    target: document.body
});

window.app = app;

export default app;
