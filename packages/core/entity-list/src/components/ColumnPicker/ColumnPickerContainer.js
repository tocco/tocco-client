import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import ColumnPicker from './ColumnPicker'

const mapStateToProps = (state, props) => ({
  columns: props.columns,
  onOk: props.onOk
})

export default connect(mapStateToProps)(injectIntl(ColumnPicker))
