import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {Breadcrumbs} from 'tocco-ui'

const mapActionCreators = {

}

const mapStateToProps = (state, props) => ({
  pathPrefix: '/e',
  breadcrumbsInfo: state.entities.path.breadcrumbsInfo,
  currentView: state.entities.path.currentViewTitle
    ? {
        display: state.entities.path.currentViewTitle,
        title: state.entities.path.currentViewTitle
      }
    : null
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Breadcrumbs))
