import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import MergeMatrix from './MergeMatrix'

export const createRoutes = (store) => {
  const routes = {
    path: '/',
    component: CoreLayout,
    indexRoute: MergeMatrix(store)
  }

  return routes
}

export default createRoutes
