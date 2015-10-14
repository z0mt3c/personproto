"use strict";

//This file is mocking a web API by hitting hard coded data.
var persons = require('./personData').persons;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(person) {
	return person.firstName.toLowerCase() + '-' + person.lastName.toLowerCase();
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var PersonClient = {
	getAllPersons: function(success, failure) {
		setTimeout(function() {
			success(_clone(persons));
		}, 1000);
	},

	getPersonById: function(id) {
		var person = _.find(persons, {id: id});
		return _clone(person);
	},
	
	savePerson: function(person) {
		if (person.id) {
			var existingPersonIndex = _.indexOf(persons, _.find(persons, {id: person.id}));
			persons.splice(existingPersonIndex, 1, person);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new persons in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			person.id = _generateId(person);
			persons.push(person);
		}

		return _clone(person);
	},

	deletePerson: function(id) {
		console.log('Pretend this just deleted the person from the DB via an AJAX call...');
		_.remove(persons, { id: id});
	}
};

module.exports = PersonClient;