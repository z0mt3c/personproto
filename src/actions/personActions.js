"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var PersonClient = require('../api/personClient');
var ActionTypes = require('../constants/actionTypes');

var PersonActions = {


	createPerson: function(person) {
		var newPerson = PersonClient.savePerson(person);

		//Hey dispatcher, go tell all the stores that an person was just created.
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_PERSON,
			person: newPerson
		});
	},

	updatePerson: function(person) {
		var updatedPerson = PersonClient.savePerson(person);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_PERSON,
			person: updatedPerson
		});
	},

	deletePerson: function(id) {
		PersonClient.deletePerson(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_PERSON,
			id: id
		});
	}
};

module.exports = PersonActions;