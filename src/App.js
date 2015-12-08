import React, {
  Component
} from 'react';
import 'babel-polyfill'; //promises and Object.assign for flux

//bootstrap styling
require('!style!css!less!bootstrap/less/bootstrap.less');


//data
import RadarData from './data/radar_data'
import ScrollboxData from './data/scrollbox_data'

//components
import MacroTracker from './components/macrotracker.js';
import Chart from './components/chart.js';
import ScrollBox from './components/scrollbox.js'



export class App extends Component {
  render () {
    return (
      <div>
        <div style={{textAlign:'center'}}>
          <MacroTracker />
          <br />
          <Chart data={RadarData} />
        </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ScrollBox data={ScrollboxData}/>
      </div>
    );
  }
}
