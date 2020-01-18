import {
  Router
} from 'express'
import DevController from './controllers/DevController'
import SearchController from './controllers/SearchController'

const routes = Router()

routes.post('/dev', DevController.store)
routes.get('/devs', DevController.index)

routes.get('/search', SearchController.index)

module.exports = routes