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
        person: React.PropTypes.object.isRequired
    },
    tabs: [
    ],
    getInitialState: function() {
        return {
            activeTabIndex: '0'
        };
    },
    componentWillMount: function(){
        this.tabs = [];
        this.createTab("Biography", this.props.person.biography);
        this.createTab("History", this.props.person.history);

    },
    createTab: function(title, content) {
        this.tabs.push({key: this.tabs.length, title: title, content: content, activeState: ''});
    },
    handleTabClick: function(item) {
        this.setState({activeTabIndex: item.key});
    },
    render: function() {
        return <div>
            <TabsSwitcher items={this.tabs} onTabClick={this.handleTabClick} />
            <TabsContent items={this.tabs} activeTab={this.state.activeTabIndex} isReadonly={false}/>
        </div>;
    }
});


module.exports = PersonBiographyTabs;

