//require styles
require('!style!css!./stylesheets/scrollbox.css');

import React, {
  Component
} from 'react';

import ReactDOM from 'react-dom';
import d3 from 'd3';

//TODO: Clean this all up!
//TODO: Continue improving scroll efficiency. Still some jank.
//Deep dive into d3 event emmiter model as an alternative to the debouncinging of the scroll event
//TODO:DONE Make this work for images, replace the last video with 4 images: glacier and rim fire


//TODO: Figure out how to style this component so it doesn't require a bunch of <br> to be composed modularly

//TODO: Refactor so that the mock data is in the data directory and passed into the main component


var mute = false,
    muteVolume = "volume",
    fixRatio = 16 / 9,
    fixHeight = innerWidth / fixRatio,
    fixTop = Math.round((innerHeight - fixHeight) / 2),
    fadeTop = Math.max(200, fixTop),
    fadeBottom = Math.min(innerHeight - 200, fixTop + fixHeight),
    fade = d3.interpolateRgb("#000", "#fff");

var debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;

    var later = function() {
         timeout = null;
         if (!immediate) func.apply(context, args);
      };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var _video_assets = "http://nsipplswezey.github.io/turn21-intro/Video/";



var ImageContent = React.createClass({
  render: function(){
    return(
      <img src={this.props.source} />
    );
  }

});

var VideoContent = React.createClass({
  render: function(){

    return (
      <video preload="auto" loop="true" autoPlay="true" >
      <source src={_video_assets + this.props.source + ".mp4"} type="video/mp4"></source>
      <source src={_video_assets + this.props.source + ".webm"} type="video/webm"></source>
      </video>

    );

  }

});




var ScrollPrompt = React.createClass({

  render: function (){

    var scrollPromptStyle = {
      position: "absolute",
      bottom: "20px",
      lineHeight: "20px",
      textAlign: "center",
      color: "white",
      fontSize: "10px",
      opacity: "0.8",
      fontWeight: "normal",
      textTransform: "uppercase",
      zIndex: 3,
      marginLeft: "7%",
      paddingLeft: "112px"
    };

    var scrollPromptSVGStyle = {
      fill: "none",
      stroke: "white",
      strokeWidth: "2px"
    };

    return(
      <div className="scroll-prompt" >
      Scroll<br/>
      <svg width="18" height="8" style={scrollPromptSVGStyle}>
      <path d="M0,0L9,7L18,0"></path>
      </svg>
      </div>
    );

  }

});


var VideoSummary = React.createClass({
  render: function(){

    return(
      <div className="video-summary">{this.props.text}</div>
    );

  }

});



var VideoHeadline = React.createClass({
  render: function(){

    return(
      <div className="video-headline headline">{this.props.text}</div>

    );

  }

});

var HeadlineCaption = React.createClass({
  render : function(){

    return (
      <div className="video-caption video-caption--head">
      <VideoHeadline text={this.props.headlineText}/>
      <VideoSummary text={this.props.summaryText}/>
      <ScrollPrompt />
      </div>


    );

  }

});

var CaptionRight = React.createClass({
  render : function(){

    return (<div className="video-caption video-caption--right"> {this.props.captionText} </div>);

  }

});

var CaptionLeft = React.createClass({
  render : function(){

    return (<div className="video-caption"> {this.props.captionText} </div>);

  }

});

var CaptionCenter = React.createClass({
  render : function(){

    return (<div className="video-caption video-caption--center"> {this.props.captionText} </div>);

  }

});

var CaptionLong = React.createClass({
  render : function(){

    return (<div className="video-caption video-caption--long"> {this.props.captionText} </div>);

  }

});


var VideoCaption = React.createClass({

  render: function(){

    var videoCaptionStyle = {
      base: {
        position: "absolute",
        left: "7%",
        bottom: "20%",
        width: "240px",
        zIndex: 3,
        color: "#fff",
        textShadow: "0 1px 2px #000",
        padding: "20px 0"
      }

    };

    var captionSequence = this.props.caption.map(

      function(caption,index,total){

        if(caption.type === "left"){
          return (<CaptionLeft key={index} captionText={caption.captionText}/>);
        } else if (caption.type === "right"){
          return (<CaptionRight key={index} captionText={caption.captionText}/>);
        } else if (caption.type === "long"){
          return (<CaptionLong key={index} captionText={caption.captionText}/>);
        } else if (caption.type === "center"){
          return (<CaptionCenter key={index} captionText={caption.captionText}/>);
        } else if (caption.type === "headline"){
          return (<HeadlineCaption key={index} headlineText={caption.headlineText} summaryText={caption.summaryText}/>);
        } else {
          console.log('error in captions');
        }
        });

        return (<div>
          {captionSequence}
        </div>);
      }
      });

    var VideoContainer = React.createClass({

      render: function(){

        var containerStyle = {
          zIndex: this.props.zIndex,
          position: this.props.position,
          opacity: this.props.opacity,
          display: this.props.display,
          height: this.props.height,
          top: this.props.top
        };

        var result;
        if(this.props.source.substr(this.props.source.length - 3) != 'jpg'){
          result = <VideoContent source = {this.props.source} />;
        } else {
          result = <ImageContent source = {this.props.source} />;

        }

        return(
          <div className="video-container" style={containerStyle}>
            {result}
          </div>
        );

      }

    });


    var Video = React.createClass({

      getInitialState : function(){

        return{
          state : null,
          previousState: null,
          display: this.props.first || this.props.last ? null : "none",
          rect : null,
          videoMarginTop : fixTop+"px",

          containerPosition: this.props.first || this.props.last ? "absolute" : "fixed",
          containerZIndex: this.props.first || this.props.last ? 1 : 2,
          containerHeight : fixHeight,
          containerTop: this.props.first || this.props.last ? null : fixTop + "px",
        };


      },

      //so both video and video sequences have a series of methods for chaning state

      watch_scrolled : function() {

        this.setState({
          rect : ReactDOM.findDOMNode(this).getBoundingClientRect(),
        });

        var rect = this.state.rect;

        if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
          this.watch_state(0);
        } else {
          var t = rect.top / (innerHeight - rect.height);
          this.watch_state(t < 0 || t > 1 ? 1 : 2);
          //watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
          //not sure about this dispatch and offset stuff... maybe offset needs to part of state
          //and then why do we pass rect as well? here we have it stored locally
          //maybe we need to update it after the state change?
        }

        //     watched.forEach(function(watch) {

        //       var rect = watch.element.getBoundingClientRect();
        //       if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
        //         watch_state(watch, 0);
        //       } else {
        //         var t = rect.top / (innerHeight - rect.height);
        //         watch_state(watch, t < 0 || t > 1 ? 1 : 2);
        //         watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
        //       }
        //     });
      },

      watch_scrolledStatic : function() {

        //here we invoke watch state for all the video and video sequence elements
        //and we dispatch a scroll event? idk why

        this.watch_state(1);

        //     watched.forEach(function(watch) {
        //       watch_state(watch, 1);
        //       watch_dispatch(watch, {type: "scroll", offset: .5, rect: {top: 0}}); // XXX rect
        //     });
      },


      //here's one piece of our state changer
      //we start here, just with videos for now
      //this function takes a state
      //and compares it to the current state of the component
      //and if they're different, it updates the state of the component
      //and it sets the previous state of the component
      //and it triggers a state change so that all other components can change state if needed?
      //we don't need to trigger all state changes. react does that for us.
      //and we don't need a watch, because we aren't looping through an array of watch elements, react handles that for us


      watch_state : function(state1) {
        var state0 = this.state.state;
        if (state0 !== state1){
          this.setState({
            state : state1,
            previousState : state0
          });

        }

        //     if (state0 !== state1) watch_dispatch(watch, {
        //       type: "statechange",
        //       state: watch.state = state1,
        //       previousState: state0
        //     });
      },

      fixedScroll : function(){

        //ok all video components and sequences get a state which is their bounding client rect
        //and we update it on scroll and on resize

        if(this.props.first || this.props.last){

          var fixed = (this.props.first && this.state.rect.top < fixTop) || (this.props.last && this.state.rect.bottom >= fixTop + fixHeight);

          this.setState({
            containerZIndex : fixed ? 2 : 1,
            containerPosition : fixed ? "fixed" : "absolute",
            containerTop : fixed ? fixTop + "px" : null
          });

        }

        var opacityTop = this.state.rect.top - fixHeight / 4,
            opacity = opacityTop > fixTop + fixHeight * 4 / 5 ? 0 //previous video fully opaque
        : !this.props.last && opacityTop < fixTop - fixHeight ? 0 //next video fully covers this video
        : opacityTop < fixTop ? 1  //this video fully opaque, but may be covered by next video
        : Math.max(0, Math.min(1,1 - (opacityTop - fixTop) / (fixHeight / 5))); //this video partiall opaque

        //opacity first
        if (this.props.first){

          this.setState({
            opacity : opacityTop >= fixTop - fixHeight ? 1 : 0
          });

        } else {

          this.setState({
            opacity : opacity
          });

        }

        //opacity last
        if (this.props.last){


        }

        this.setState(
          {rect : ReactDOM.findDOMNode(this).getBoundingClientRect(),
           display : this.state.state ? null : "none"
          }
        );


      },


      handleResize: function(e){
        fixHeight = innerWidth / fixRatio;
        fixTop = Math.round((innerHeight - fixHeight) / 2);
        fadeTop = Math.max(200, fixTop);
        fadeBottom = Math.min(innerHeight - 200, fixTop + fixHeight);

        //set the height of the video container
        this.setState({rect : ReactDOM.findDOMNode(this).getBoundingClientRect(),
                       containerHeight : fixHeight + "px"
                     });

        //Set the top margin of the first video
        if(this.props.id === 0){
          this.setState({videoMarginTop : fixTop+"px"});
        }

        //their version: call resize on render
        //our version: call resize on render, except it looks like you can't set state
        //so we'll use the state if possible, but fallback to the rect

        if(this.props.first && this.state.rect.top < fixTop){
          this.state.containerTop = fixTop + "px";
        } else if (this.props.last && this.state.rect.bottom >= fixTop + fixHeight) {
          this.state.containerTop = fixTop + "px";
        } else {
          this.state.containerTop = fixTop + "px";
        }

      },

      handleScroll: function(event){
        this.watch_scrolled();

        this.setState({rect: ReactDOM.findDOMNode(this).getBoundingClientRect()});
        this.fixedScroll();

      },

      componentDidMount: function() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);

      },

      componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
      },



      render : function(){
        var videoStyle = {
          marginTop : this.state.videoMarginTop
        }

        return(
          <div className="video" style={videoStyle} onScroll={this.handleScroll}>
          <VideoContainer
          source={this.props.source}

          opacity={this.state.opacity}
          display={this.state.display}

          zIndex = {this.state.containerZIndex}
          position={this.state.containerPosition}
          top={this.state.containerTop}
          height={this.state.containerHeight}
          />

          <VideoCaption caption={this.props.caption} />

          </div>
        )
      }

    });



    var VideoSequence = React.createClass({


      getInitialState : function(){
        return{
          rect : null,
          state : null,
          previousState : null,
          background : "rgb(0,0,0)",
          didScroll : false
        };
      },

      //so both video and video sequences have a series of methods for chaning state

      watch_scrolled : function() {

        //first doesn't change, it's a property of the json data, and so is length... and I'm not dealing with audio yet

        this.setState({
          rect : ReactDOM.findDOMNode(this).getBoundingClientRect(),
        });


        var rect = this.state.rect;

        if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
          this.watch_state(0);
        } else {
          var t = rect.top / (innerHeight - rect.height);
          this.watch_state(t < 0 || t > 1 ? 1 : 2);
          //watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
        }

        //     watched.forEach(function(watch) {

        //       var rect = watch.element.getBoundingClientRect();
        //       if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
        //         watch_state(watch, 0);
        //       } else {
        //         var t = rect.top / (innerHeight - rect.height);
        //         watch_state(watch, t < 0 || t > 1 ? 1 : 2);
        //         watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
        //       }
        //     });
      },

      watch_scrolledStatic : function() {

        this.watch_state(1)

        //     watched.forEach(function(watch) {
        //       watch_state(watch, 1);
        //       watch_dispatch(watch, {type: "scroll", offset: .5, rect: {top: 0}}); // XXX rect
        //     });
      },



      watch_state(state1) {
        var state0 = this.state.state;

        if (state0 !== state1){
          this.setState({
            state : state1,
            previousState : state0
          });

        }

        //     if (state0 !== state1) watch_dispatch(watch, {
        //       type: "statechange",
        //       state: watch.state = state1,
        //       previousState: state0
        //     });
      },

      handleScroll : debounce(function() {

        this.setState(
          {
            rect : ReactDOM.findDOMNode(this).getBoundingClientRect(),
            didScroll: true
          });

        this.watch_scrolled();
        var opacity = Math.max(0, Math.min(1, this.state.rect.bottom < fadeBottom ? (fadeBottom - this.state.rect.bottom) / fadeTop
                                           : this.state.rect.top < fixTop + fadeTop ? (this.state.rect.top - fixTop) / fadeTop
                                           : 1));


        this.setState({background : fade(opacity)});
      }, 100),



      handleResize : function() {

      },


      componentDidMount: function() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);

      },

      componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
      },



      //Q when does sequence state change?
      sequencestatechanged : function(sequenceState){
        if(sequenceState){
          //set all videos to preload "auto"
          //set all audio to play

        }else{

          //set body background to null
          //set all audio to pause

        }

      },

      render: function(){

        var videoSequence = this.props.sequenceData.sequence1.videoData.map(
          function(video,index,total){
            return (<Video first={index===0} last={index===total.length-1} source={video.source} caption={video.caption} key={index}/>);
          });

        return(
          <div
            className="section video-sequence"
            style ={{background : this.state.background}}
            onScroll={this.handleScroll}
            onResize={this.handleResize}>

          {videoSequence}
          </div>
        );
      }

    });

    var Article = React.createClass({
      render : function() {
        return (
          <div className="article">
          <VideoSequence sequenceData = {this.props.sequenceData} />

          </div>

        );

      }

    });

    var ScrollBox = React.createClass({
      render : function(){
        return(
          <div className="main">
          <Article sequenceData={this.props.data} />
          </div>

        );

      }

    });

    module.exports = ScrollBox;
