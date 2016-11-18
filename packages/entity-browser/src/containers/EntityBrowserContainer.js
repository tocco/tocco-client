import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import EntityBrowser from '../components/EntityBrowser'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EntityBrowser))

