import React, {
  Component
} from 'react';
import 'babel-polyfill'; //promises and Object.assign for flux


//data
import RadarData from './data/radar_data'
import ScrollboxData from './data/scrollbox_data'

//components
import MacroTracker from './components/macrotracker.js';
import Chart from './components/chart.js';
import ScrollBox from './components/scrollbox.js';
import StandardsBox from './components/standardsbox.js';



export class App extends Component {
  render () {
    return (
      <div>

        <ScrollBox data={ScrollboxData}/>

        <StandardsBox />

        <div style={{height:'400px'}} />

        <div style={{textAlign:'center'}}>
          <MacroTracker />
          <br />

          <div style={{height:'300px'}} />

          <Chart data={RadarData} />
        </div>

        <div style={{height:'300px'}} />

      </div>
    );
  }
}
