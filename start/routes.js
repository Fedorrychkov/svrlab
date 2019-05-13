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
const { graphqlAdonis, graphiqlAdonis } = require('apollo-server-adonis')
const schema = require('../app/Data/Schema')
const Route = use('Route')

// base api route
Route.any('/api', () => 'TODO: Return help about api.')

Route.post('/api/image', 'ImageController.upload')
Route.group(() => {
  Route.get('', 'ImageController.all')
  Route.delete(':id', 'ImageController.delete')
}).prefix('api/images')

Route.group(() => {
  Route.post('', 'AmplifierController.create')
  Route.put('', 'AmplifierController.update')
  Route.get('', 'AmplifierController.all')
  Route.get(':id', 'AmplifierController.get')
}).prefix('api/amplifier')

Route.group(() => {
  Route.post('', 'MusicController.create')
  Route.put('', 'MusicController.update')
  Route.get('', 'MusicController.all')
  Route.get(':id', 'MusicController.get')
}).prefix('api/music')

Route.group(() => {
  Route.post('', 'OrderController.create')
  Route.put('setstatus', 'OrderController.setstatus')
  Route.get('statuses', 'OrderStatusController.all')
  Route.get('all', 'OrderController.all')
  Route.get(':id', 'OrderController.get')
}).prefix('api/order')

Route.group(() => {
  Route.post('', 'CustomFieldController.create')
  Route.get('', 'CustomFieldController.all')
  Route.get(':type', 'CustomFieldController.getByType')
}).prefix('api/custom-field')

Route.any('/api/graphql', graphqlAdonis({ schema: schema }))

Route.get(
  '/api/graphiql',
  graphiqlAdonis({
    endpointURL: '/api/graphql'
  }),
)

Route.any('*', 'NuxtController.render')
