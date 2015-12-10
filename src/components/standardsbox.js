require('!style!css!./stylesheets/standardsbox.css');

import React, {
  Component
} from 'react';


var data = [
  {grade: "6th grade",
   standard:{
     sciencePractice:{
       title:"Science Practice",
       text:"Engaging In Argument From Evidence"
     },

     performanceExpectation:{
       title:"Performance Expectation:",
       text:"MS-LS1-4. Use argument based on empirical evidence and scientific reasoning to support an explanation for how characteristics animal behaviors and specialized plant structures affect the probability of successful reproduction of animals and plants respectively."
     },

     disciplinaryCoreIdea:{
       title: "Disciplinary Core Idea:",
       subtitle: "LS1.B: Growth and Development of Organisms",
       text: "Animals engage in characteristic behaviors that increase the odds of reporudction. (MS-LS1-4)"

     },

     crossCuttingConcept:{
       title: "Cross-Cutting Concept:",
       subtitle: "Cause and Effect",
       text: "Phenomena may have more than one cause, and some cause and effect relations in systems can only be described using probability. (MS-LS1-4)"

     }

   }},

  {grade: "7th grade",
   standard:{
     sciencePractice:{
       title:"Science Practice",
       text:"Engaging In Argument From Evidence"
     },

     performanceExpectation:{
       title:"Performance Expectation:",
       text:"MS-LS2-4. Construct an argument supported by empirical evidence that changes to physical or biological components of an ecosystem affect populations."
     },

     disciplinaryCoreIdea:{
       title: "Disciplinary Core Idea:",
       subtitle: "LS2.C: Ecosystem Dynamics, Functioning and Resilience",
       text: "Ecosystems are dynamic in anture; their characteristics can vary over time. Disruptions to any physical or biological component of an ecosystem can lead to shifts in all its populations. (MS-LS2-4)"

     },

     crossCuttingConcept:{
       title: "Cross-Cutting Concept:",
       subtitle: "Stability and Change",
       text: "Small changes in one part of a system might cause large changes in another part. (MS-LS2-4)"
     }

   }},

  {grade: "High School",
   standard:{
     sciencePractice:{
       title:"Science Practice",
       text:"Engaging In Argument From Evidence"
     },

     performanceExpectation:{
       title:"Performance Expectation:",
       text:"??"
     },

     disciplinaryCoreIdea:{
       title: "Disciplinary Core Idea:",
       subtitle: "??",
       text: "??"

     },

     crossCuttingConcept:{
       title: "Cross-Cutting Concept:",
       subtitle: "??",
       text: "??"
     }

   }}

];

var active = null;

/*
States:
1. Hovered
2. Active
3. Inactive

*/


var GradeStandardContent = React.createClass({
  render: function(){

    var id = this.props.myId;
    var standardData = this.props.content.standard;

    if(this.props.isActive === id || this.props.isHovered){

      return(
        <div className="columnRight">

        	<div className="algorithm">
        		<div className="algorithmHeader">{standardData.sciencePractice.title} </div>
        		<div className="algorithmLine"> {standardData.sciencePractice.text}</div>
        	</div>

        	<div className="algorithm">
        		<div className="algorithmHeader">{standardData.performanceExpectation.title} </div>
        		<div className="algorithmLine"> {standardData.performanceExpectation.text}</div>
        	</div>

        	<div className="algorithm">
        		<div className="algorithmHeader">{standardData.disciplinaryCoreIdea.title} </div>
        		<div className="algorithmLine"> {standardData.disciplinaryCoreIdea.subtitle} </div>
        		<div className="algorithmLine"> {standardData.disciplinaryCoreIdea.text}</div>
        	</div>

        	<div className="algorithm">
        		<div className="algorithmHeader">{standardData.crossCuttingConcept.title} </div>
        		<div className="algorithmLine"> {standardData.crossCuttingConcept.subtitle} </div>
        		<div className="algorithmLine"> {standardData.crossCuttingConcept.text}</div>
        	</div>
        </div>
      );

    }
    else {
      return <div></div>;
    }
  }
});

var HighLightArrow = React.createClass({

	//looks like isActive is set in the parent
	//And is checked against the current id

	//And if they match, or if the isHovered state is passed down
	//Then we render the arrow

  render: function(){

    var arrowStyle = {
      position: "absolute",
      display: "block",
      marginTop: "-6px",
      marginLeft: "-5px"
    };

    var id = this.props.myId;

    if(this.props.isActive === id || this.props.isHovered){

      return (
        <img src={require('../assets/Images/BrochureArrow1.png')} style={arrowStyle}/>
      );
    } else {
      return (<div></div>);
    }

  }

});

var GradeStandard = React.createClass({

  getInitialState: function(){
    return {hover: false};
  },

  mouseOver: function(){
    active = this.props.index;
    this.setState({hover: true});
    this.props.handleChange();
  },

  mouseOut: function(){
    this.setState({hover: false});
    this.props.handleChange();
  },

  render: function() {

    var current = false;
    if(this.state.hover){
      current = true;
    }

    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
      <HighLightArrow myId={this.props.index} isHovered={current} isActive={active}/>

      This lesson covers the follow {this.props.data.grade} standards.

      <GradeStandardContent myId={this.props.index} isHovered={current} isActive={active} content={this.props.data} />
      </div>
    );
  }
});

var StandardsList = React.createClass({

  render: function() {
    return (
      <ul>
      {this.props.standardsData.map(function(standard,i) {
       return (<GradeStandard key={i} data={standard} index={i} handleChange={this.props.handleChange}/>);
		 },this)}
  		</ul>
  		);
  }
});


var ChapterHeader = React.createClass({
  render: function() {
		var spanStyle = {
			//       font: "bold 25px 'PT Sans', 'Helvetica', 'Arial', sans-serif",
			//       color: "#222",
			//       backgroundColor: "#fff",
			//       paddingLeft: "16px",
			//       paddingRight: "16px"
		};

    return (
      <div className="chapterHeader"><span style={spanStyle}>Standards Covered</span></div>
    );
  }
});

var Chapter = React.createClass({
  render: function() {

    return (
      <div className="chapter" >
      <ChapterHeader />
      <StandardsList handleChange={this.props.handleChange} standardsData={data} />
      </div>
    );
  }


});


var StandardsBox = React.createClass({

	handleChange : function(){
		this.forceUpdate();
	},

  render : function() {
    return (
      <div className="standardsBox">
      <Chapter handleChange={this.handleChange}/>
      </div>
    );
  }
});



module.exports = StandardsBox;
