'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/
const { graphqlAdonis, graphiqlAdonis } = require('apollo-server-adonis');
const schema = require('../app/Data/Schema');
const Route = use('Route');

// base api route
Route.any('/api', () => 'TODO: Return help about api.')
Route.post('/api/image', 'ImageController.upload');
Route.get('/api/images', 'ImageController.all');

Route.any('/api/graphql', graphqlAdonis({ schema: schema }));

Route.get(
  '/api/graphiql',
  graphiqlAdonis({
    endpointURL: '/api/graphql',
  }),
);

Route.any('*', 'NuxtController.render')
