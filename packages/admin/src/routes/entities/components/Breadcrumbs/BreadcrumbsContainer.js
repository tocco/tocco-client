import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Breadcrumbs from './Breadcrumbs'

const mapActionCreators = {

}

const mapStateToProps = (state, props) => ({
  breadcrumbsInfo: state.entities.path.breadcrumbsInfo
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Breadcrumbs))
