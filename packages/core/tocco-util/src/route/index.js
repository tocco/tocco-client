import CustomRouter from './CustomRouter'
import {extractParamsFromPath} from './path'
import {loadRoute} from './route'
import Router from './Router'
import RouteWithSubRoutes from './RouteWithSubRoutes'

export default {
  loadRoute,
  Router,
  RouteWithSubRoutes,
  extractParamsFromPath,
  CustomRouter
}
