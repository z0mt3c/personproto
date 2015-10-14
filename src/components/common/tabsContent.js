/**
 * Created by Simon on 14/10/2015.
 */
"use strict";

var React = require('react');
var classNames = require('classnames/dedupe');

var TabsContent = React.createClass({
    render: function() {
        var activeTab = this.props.activeTab;

        var isReadonly = this.props.isReadonly;
        var items = this.props.items.map(function(item) {
            var classes = classNames("tab-pane", {active: activeTab === item.key});
            var contentElem = {};
            if(isReadonly) {
                contentElem = <div className="contentPane">{item.content}</div>;
            }else{
                contentElem =
                    <div className="contentPane">
                        <textarea rows="8" className={classNames({disabled: isReadonly})}>{item.content}</textarea>
                    </div>;
            }
            return <div key={item.key} className={classes}>{contentElem}</div>;
        });
        return <div className="tab-content">{items}</div>;
    }
});

module.exports = TabsContent;