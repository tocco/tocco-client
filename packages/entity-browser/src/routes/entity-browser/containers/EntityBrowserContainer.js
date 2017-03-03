import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import EntityBrowser from '../components/EntityBrowser'
import {initialize} from '../modules/actions'

const mapActionCreators = {
  initialize
}

export default connect(null, mapActionCreators)(injectIntl(EntityBrowser))
