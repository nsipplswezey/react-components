import React, {
  Component
} from 'react';

var RadarPaths = require('paths-js/radar');

var Radar = React.createClass({

  getDefaultProps : function(){
    return{
      fill: "#0D95BC",
      stroke: "#777",
      data: [],
      max: 100,
      r: 100,
      rings: 5,
      x:0,
      y:0
    };
  },

  getCurve: function(curve,i){
    var path = curve.polygon.path.print();

    return (
      <path key={i} d={path} fill={this.props.fill} />
    );

  },

  getRing: function(ring, i){
    var path = ring.path.print();

    return (
      <path key={i} d={path} stroke={this.props.stroke} />
    );
  },

  render: function(){
    var paths = RadarPaths({
        data : this.props.data,
        max : this.props.max,
        r : this.props.r,
        rings : this.props.rings,
        center : [this.props.x, this.props.y]
    });

    return (
      <g fill="none" stroke="none">
        { paths.rings.map(this.getRing) }
        <g opacity="0.6">
	        { paths.curves.map(this.getCurve)  }
	       </g>
      </g>
     );
  }
});

module.exports = Radar;
