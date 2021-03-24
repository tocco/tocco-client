import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import DocsView from './DocsView'

const mapStateToProps = state => ({
  domainTypes: state.input.domainTypes,
  rootNodes: state.input.rootNodes
})

const mapActionCreators = {
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsView))
