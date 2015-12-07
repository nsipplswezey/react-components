var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var MacroConstants = require('../constants/macroconstants');

import Immutable from 'immutable';

//so these are a series of actions
//passed to the dispatcher? and evaluated in the dispatcher context

var CHANGE_EVENT = 'change';


var _userMacros = {
  //mock data
  //user id
  1 : {
    //current day
    0 : {
      //the current register before entry
      currentProtein : 0,
      currentFat : 0,
      currentCarb : 0,
      //todays history
      todaysProtein : [],
      todaysFat : [],
      todaysCarb : []

    }

  }

}; //collection of macros


/**
 * Updates the current macro sum for any macro
 * @param {string} text Which macro to add to
 * @param {number} integer Amount to add to current macro sum
 */
function updateMacro(macro,increment){


  //TODO: create a unique ID checking system
  var id = 1;
  //TODO: create a 'day' interval that resets at 4am
  var currentDay = 0;

  var user = _userMacros[id];
  var todaysMacros = user[currentDay];
  //console.log('updateMacro', todaysMacros);

  if(macro==='protein'){
    todaysMacros.currentProtein += increment;

  }else if(macro==='fat'){
    todaysMacros.currentFat += increment;

  }else if(macro==='carbs'){
    todaysMacros.currentCarb += increment;

  }else{
    //console.log('error in update macro');
  }

  //console.log('post update', todaysMacros);

}


/**
 * Registers the addition of a macro by pushing the current macro sum
 * into the current macro array, which is displayed below.
 * @param {string} text Which macro to add to
 * @param {number} integer Current macro sum to push to macro sum array
 */
function incrementMacro(macro,currentSum){


}


/**
 *  Retrieve or create a new macro history. If ID is provided, retrieves macros from DB.
 *  If no ID is provided, creates a new set of macros
 * @param {string} text The unique ID for the user
 */
function createMacroDay(uniqueID){


}

/**
 * If no ID is provided, create a macro user id and local object to store macro data
 *
 * @param {string} text The unique ID for the user
 */
 function createLocalMacroUser(uniqueID){


 }


var MacroStore = Object.assign({}, EventEmitter.prototype,{

  getAll: function(){
    return _userMacros;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);

  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action;
    //console.log(action);
    var integerIncrement = action.increment;
    var targetMacro = action.macro;

    switch(action.actionType) {
      case MacroConstants.MACRO_UPDATE:
      updateMacro(targetMacro,integerIncrement);
      MacroStore.emitChange();
      break;
    }
    return true;

  })

});

module.exports = MacroStore;
