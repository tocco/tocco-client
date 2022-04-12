import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import CacheInitLoadMask from './CacheInitLoadMask'

const mapStateToProps = state => ({
  initialised: state.cache ? state.cache.initialised : true
})

export default connect(mapStateToProps)(injectIntl(CacheInitLoadMask))
