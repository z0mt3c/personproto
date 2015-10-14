/**
 * Created by Simon on 14/10/2015.
 */
"use strict";

var React = require('react');
var classNames = require('classnames/dedupe');

var TabsContent = React.createClass({
    render: function() {
        var activeTab = this.props.activeTab;
        var items = this.props.items.map(function(item) {
            var classes = classNames("tab-pane", {active: activeTab === item.key});
            return <div key={item.key} className={classes}>{item.content}</div>;
        });
        return <div className="tab-content">{items}</div>;
    }
});

module.exports = TabsContent;