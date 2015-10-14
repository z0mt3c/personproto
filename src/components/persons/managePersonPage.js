"use strict";

var React = require('react');
var Router = require('react-router');
var PersonForm = require('./personForm');
var PersonActions = require('../../actions/personActions');
var PersonStore = require('../../stores/personStore');
var toastr = require('toastr');

var ManagePersonPage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			person: { id: '', firstName: '', lastName: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var personId = this.props.params.id; //from the path '/person:id'
		if (personId) {
			this.setState({person: PersonStore.getPersonById(personId) });
		}
	},

	setPersonState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.person[field] = value;
		return this.setState({person: this.state.person});
	},

	personFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.person.firstName.length < 3) {
			this.state.errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.person.lastName.length < 3) {
			this.state.errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	savePerson: function(event) {
		event.preventDefault();

		if (!this.personFormIsValid()) {
			return;
		}

		if (this.state.person.id) {
			PersonActions.updatePerson(this.state.person);
		} else {
			PersonActions.createPerson(this.state.person);
		}
		
		this.setState({dirty: false});
		toastr.success('Person saved.');
		this.transitionTo('persons');
	},

	render: function() {
		return (
			<PersonForm
				person={this.state.person}
				onChange={this.setPersonState}
				onSave={this.savePerson}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManagePersonPage;