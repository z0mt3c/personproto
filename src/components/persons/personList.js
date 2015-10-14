"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var PersonActions = require('../../actions/personActions');
var toastr = require('toastr');

var PersonList = React.createClass({
	propTypes: {
		persons: React.PropTypes.array.isRequired
	},

	deletePerson: function(id, event) {
		event.preventDefault();
		PersonActions.deletePerson(id);
		toastr.success('Person Deleted');
	},

	render: function() {
		var createPersonRow = function(person) {
			return (
				<tr key={person.id}>
					<td><a href="#" onClick={this.deletePerson.bind(this, person.id)}>Delete</a></td>
					<td><Link to="managePerson" params={{id: person.id}}>{person.id}</Link></td>
					<td>{person.firstName} {person.lastName}</td>
				</tr>
			);
		};

		return (
			<div>
				<table className="table">
					<thead>
						<th></th>
						<th>ID</th>
						<th>Name</th>
					</thead>
					<tbody>
						{this.props.persons.map(createPersonRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = PersonList;