/**
 * Created by Simon on 14/10/2015.
 */
"use strict";

var React = require('react');
var classNames = require('classnames/dedupe');

var TabsContent = React.createClass({
    propTypes: {
        activeTabIndex: React.PropTypes.number.isRequired,
        items: React.PropTypes.array.isRequired
    },
    render: function() {
        var activeTabIndex = this.props.activeTabIndex;

        var items = this.props.items.map(function(item) {
            var classes = classNames("tab-pane", {active: activeTabIndex === item.key});

            return <div key={item.key} className={classes}>
                        <div className="contentPane">{item.content}</div>
                    </div>;
        });
        return <div className="tab-content">{items}</div>;
    }
});

module.exports = TabsContent;