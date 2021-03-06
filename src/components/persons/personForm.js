"use strict";

var React = require('react');
var PersonBiographyTabs = require('./personBiographyTabs');
var Input = require('../common/textInput');

var PersonForm = React.createClass({
	propTypes: {
		person:	React.PropTypes.object.isRequired,
		onSave:	React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},
	render: function() {
		return (
			<form>
				<h1>Manage Person</h1>
				<Input
					name="firstName"
					label="First Name"
					value={this.props.person.firstName}
					onChange={this.props.onChange}
					error={this.props.errors.firstName} />

				<Input
					name="lastName"
					label="Last Name"
					value={this.props.person.lastName}
					onChange={this.props.onChange}
					error={this.props.errors.lastName} />
				<PersonBiographyTabs person={this.props.person} onChange={this.props.onChange}/>
				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = PersonForm;