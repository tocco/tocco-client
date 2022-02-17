import {withRouterTypeCompProvider} from '../../../utils/withRouterTypeCompProvider'
import RouterlessContent from './RouterlessContent'
import RoutesContent from './RoutesContent'

export default withRouterTypeCompProvider({routerless: RouterlessContent, router: RoutesContent})
