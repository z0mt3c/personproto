"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var PersonClient = require('../api/personClient');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				persons: PersonClient.getAllPersons(function(persons) {
					console.log("success!");
					Dispatcher.dispatch({actionType: ActionTypes.LOAD_PERSONS_SUCCESS, persons: persons});
				}, function(error) {
					console.log("failed!");
					Dispatcher.dispatch({actionType: ActionTypes.LOAD_PERSONS_FAIL, error: error});
				})
			}
		});
	}
};

module.exports = InitializeActions;