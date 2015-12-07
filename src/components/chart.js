import React, {
  Component
} from 'react';

import Radar from './radar';

var Chart = React.createClass({
  getDefaultProps : function(){
    return {
      data : [],
      height : 250,
      width : 400
    };
  },

  render : function(){
    var x = this.props.width / 2;
    var y = this.props.height / 2;
    var radius = Math.min(x,y);
    return (
      <svg
      height={ this.props.height}
      width={this.props.width}
      style={{margin: 'auto'}}>

        <Radar data={this.props.data} x={x} y={y} r={radius} />
      </svg>
      );
    }
});

module.exports = Chart;
