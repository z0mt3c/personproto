"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var PersonStore = require('../../stores/personStore');
var PersonActions = require('../../actions/personActions');
var PersonList = require('./personList');

var PersonPage = React.createClass({
	getInitialState: function() {
		return {
			persons: PersonStore.getAllPersons(),
			isLoading: false
		};
	},

	componentWillMount: function() {
		PersonStore.addChangeListener(this._onChange);

	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		PersonStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			persons: PersonStore.getAllPersons(),
			isLoading: PersonStore.isLoading });
	},

	render: function() {
		return (
			<div>
				<h1>Persons</h1>
				<Link to="addPerson" className="btn btn-default">Add Person</Link>
				{this.state.isLoading ? <h1>Loading...</h1> : null}
				<PersonList persons={this.state.persons} />
			</div>
		);
	}
});

module.exports = PersonPage;