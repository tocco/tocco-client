import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityBrowser from '../components/EntityBrowser'
import {initialize} from '../modules/actions'

const mapActionCreators = {
  initialize
}

const mapStateToProps = (state, props) => ({
  showDetailEntityId: state.entityBrowser.showDetailEntityId,
  showSearchForm: state.entityBrowser.showSearchForm
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityBrowser))

