import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityBrowser from '../components/EntityBrowser'
import {requestRecords} from '../modules/entityBrowser/actions'

const mapActionCreators = {
  requestRecords
}

const mapStateToProps = (state, props) => ({})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityBrowser))

