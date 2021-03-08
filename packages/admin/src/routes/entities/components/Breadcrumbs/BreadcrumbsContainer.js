import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {Breadcrumbs} from 'tocco-ui'

const mapActionCreators = {

}

const mapStateToProps = (state, props) => ({
  pathPrefix: '/e',
  breadcrumbsInfo: state.entities.path.breadcrumbsInfo,
  currentViewTitle: state.entities.path.currentViewTitle
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Breadcrumbs))
