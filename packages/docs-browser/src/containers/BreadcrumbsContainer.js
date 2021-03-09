import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {Breadcrumbs} from 'tocco-ui'

const mapActionCreators = {
}

const mapStateToProps = state => ({
  pathPrefix: '/docs',
  breadcrumbsInfo: state.docs.path.breadcrumbs
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Breadcrumbs))
