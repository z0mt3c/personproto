"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')} />
    <Route name="persons" handler={require('./components/persons/personPage')} />
    <Route name="addPerson" path="person" handler={require('./components/persons/managePersonPage')} />
    <Route name="managePerson" path="person/:id" handler={require('./components/persons/managePersonPage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
    <NotFoundRoute handler={require('./components/notFoundPage')} />
    <Redirect from="about-us" to="about" />
    <Redirect from="awthurs" to="persons" />
    <Redirect from="about/*" to="about" />
  </Route>
);

module.exports = routes;