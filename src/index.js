import React from 'react';
import ReactDom from 'react-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import App from './App';

TimeAgo.addDefaultLocale(en)
ReactDom.render(<App/>, document.getElementById('root'));