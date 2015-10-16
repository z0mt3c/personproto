/**
 * Created by Simon on 14/10/2015.
 */
"use strict";

var React = require('react');
var _ = require('lodash');
var TabsSwitcher = require('../common/tabsSwitcher');
var TabsContent = require('../common/tabsContent');

var PersonBiographyTabs = React.createClass({
    propTypes: {
        person: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    tabs: [
    ],
    getInitialState: function() {
        return {
            activeTabIndex: 0
        };
    },
    /*shouldComponentUpdate: function(nextProps, nextState) {
        return false;
    },*/

     componentWillMount: function(){
        this.tabs = [];
        this.createTab("Biography", "biography", this.props.person.biography);
        this.createTab("History", "history", this.props.person.history);

    },

    createTab: function(title, name, content) {

        var contentElement = <textarea rows="8" className="form-control" id={name} name={name} value={content} onChange={this.props.onChange}/>;
        this.tabs.push({key: this.tabs.length, title: title, name: name, content: contentElement, activeState: ''});
    },
    handleTabClick: function(item) {
        this.setState({activeTabIndex: item.key});
    },
    render: function() {
        return <div className="form-group">
            <TabsSwitcher items={this.tabs} onTabClick={this.handleTabClick} />
            <TabsContent items={this.tabs} activeTabIndex={this.state.activeTabIndex} isReadonly={false}/>
        </div>;
    }
});


module.exports = PersonBiographyTabs;

