import {hot} from 'react-hot-loader/root'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import ColumnPicker from './ColumnPicker'

const mapStateToProps = (state, props) => ({
  columns: props.columns,
  onOk: props.onOk
})

export default hot(connect(mapStateToProps)(injectIntl(ColumnPicker)))
