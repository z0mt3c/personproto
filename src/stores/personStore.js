"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _persons = [];
var _isLoading = false;

var PersonStore = assign({}, EventEmitter.prototype, {

	isLoading: _isLoading,

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllPersons: function() {
		return _persons;
	},


	getPersonById: function(id) {
		return _.find(_persons, {id: id});
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			//_persons = action.initialData.persons;
			PersonStore.isLoading = true;
			PersonStore.emitChange();
			console.log("initialized." + PersonStore.isLoading);
			break;
		case ActionTypes.LOAD_PERSONS_SUCCESS:
			PersonStore.isLoading = false;
			console.log("success: " + action.persons + PersonStore.isLoading);
			_persons = action.persons;

			PersonStore.emitChange();
			break;
		case ActionTypes.LOAD_PERSONS_FAIL:
			console.log("failed: " + action.persons);
			_persons = action.persons;
			_isLoading = false;
			PersonStore.emitChange();
			break;
		case ActionTypes.CREATE_PERSON:
			_persons.push(action.person);
			PersonStore.emitChange();
			break;
		case ActionTypes.UPDATE_PERSON:
			var existingPerson = _.find(_persons, {id: action.person.id});
			var existingPersonIndex = _.indexOf(_persons, existingPerson);
			_persons.splice(existingPersonIndex, 1, action.person);
			PersonStore.emitChange();
			break;	
		case ActionTypes.DELETE_PERSON:
			_.remove(_persons, function(person) {
				return action.id === person.id;
			});
			PersonStore.emitChange();
			break;
		default:
			// no op
	}
});

module.exports = PersonStore;