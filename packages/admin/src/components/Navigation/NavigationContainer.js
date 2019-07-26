import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Navigation from './Navigation'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  entities: state.navigation.entities
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Navigation))
