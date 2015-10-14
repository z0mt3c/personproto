/**
 * Created by Simon on 14/10/2015.
 */
"use strict";

var React = require('react');

var TabsSwitcher = React.createClass({
    render: function() {

        var items = this.props.items.map(function(item) {
            return <li><a onClick={this.onClick.bind(this, item)}>{item.title}</a></li>;
        }.bind(this));

        return <div>
            <ul className="nav nav-tabs">
                {items}
            </ul>
        </div>;
    },
    onClick: function(item) {
        this.props.onTabClick(item);
    }
});

module.exports = TabsSwitcher;