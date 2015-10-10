"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorClient = require('../api/authorClient');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				authors: AuthorClient.getAllAuthors(function(authors) {
					console.log("success!");
					Dispatcher.dispatch({actionType: ActionTypes.LOAD_AUTHORS_SUCCESS, authors: authors});
				}, function(error) {
					console.log("failed!");
					Dispatcher.dispatch({actionType: ActionTypes.LOAD_AUTHORS_FAIL, error: error});
				})
			}
		});
	}
};

module.exports = InitializeActions;