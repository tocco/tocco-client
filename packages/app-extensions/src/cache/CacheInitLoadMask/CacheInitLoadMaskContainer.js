import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import CacheInitLoadMask from './CacheInitLoadMask'

const mapStateToProps = state => ({
  initialised: state.cache ? state.cache.initialised : true
})

export default connect(mapStateToProps)(injectIntl(CacheInitLoadMask))
