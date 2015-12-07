import React, {
  Component
} from 'react';
import 'babel-polyfill'; //promises and Object.assign for flux

require('!style!css!less!bootstrap/less/bootstrap.less');

import MacroTracker from './components/macrotracker.js';


export class App extends Component {
  render () {
    return (
      <MacroTracker/>
    );
  }
}
