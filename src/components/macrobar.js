import React, {
  Component
} from 'react';

import MacroActions from '../actions/macroactions'

var MacroCount = React.createClass({

  render: function(){

    return(
      <input className="form-control" value={this.props.currentcount} data-test={this.props.category + '-identifier'} type="text" placeholder="Current count..." readonly  >
      </input>
    );

  }

});

var MacroIdentifier = React.createClass({

  render: function(){
    return(
      <button className={"btn btn-success col-xs-3"} data-test={this.props.text + '-count'}>
        {this.props.text}
      </button>
    );

  }

});

var MacroButton = React.createClass({

  render: function(){
    return(
      <button className={"btn btn-primary col-xs-3"} onClick={this._onUpdateClick} data-test={this.props.category + '-' + this.props.value}>
        {'+' + this.props.value}
      </button>
    );

  },

  _onUpdateClick: function(){

    var increment = this.props.value;
    var macro = this.props.category;

    MacroActions.updateMacro(increment,macro);

  }

});

var MacroBar = React.createClass({

  propTypes: {
  },

  render: function() {
    //console.log('render', this.props.data);

    var currentUser = 1;
    var currentDay = 0;
    var currentUserData = this.props.data[currentUser];
    var currentUserDataDay = currentUserData[currentDay];

    var currentBarData = this.props.category === 'carbs' ? currentUserDataDay.currentCarb :
    this.props.category === 'fat' ? currentUserDataDay.currentFat :
    this.props.category === 'protein' ? currentUserDataDay.currentProtein : 0;


    return (

        <div className="row center-block">
          <MacroIdentifier text={this.props.category} />
          <MacroButton value={10} category={this.props.category}/>
          <MacroButton value={5} category={this.props.category}/>
          <MacroButton value={1} category={this.props.category}/>
          <MacroCount currentcount={currentBarData} category={this.props.category}/>
        </div>

    );

  }

});

module.exports = MacroBar;
