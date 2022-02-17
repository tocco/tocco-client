import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {withRouterTypeCompProvider} from '../../../utils/withRouterTypeCompProvider'
import Breadcrumbs from './Breadcrumbs'
import RouterlessBreadcrumbsComp from './RouterlessBreadcrumbs'

const mapActionCreators = {}

const mapStateToProps = state => ({
  pathPrefix: '/docs',
  breadcrumbsInfo: state.docs.path.breadcrumbs,
  embedded: state.input.embedded
})

const RouterBreadcumbs = connect(mapStateToProps, mapActionCreators)(injectIntl(Breadcrumbs))
const RouterlessBreadcrumbs = connect(mapStateToProps, mapActionCreators)(injectIntl(RouterlessBreadcrumbsComp))

export default withRouterTypeCompProvider({routerless: RouterlessBreadcrumbs, router: RouterBreadcumbs})
