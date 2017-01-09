import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityBrowser from '../components/EntityBrowser'
import {initialize} from '../modules/entityBrowser/actions'

const mapActionCreators = {
  initialize
}

const mapStateToProps = (state, props) => ({
  showDetailRecordId: state.entityBrowser.showDetailRecordId
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityBrowser))

