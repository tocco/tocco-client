import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {fetchWidgetConfig, copyWidgetCode} from '../modules/widgetCode/actions'
import WidgetCodeCopy from './WidgetCodeCopy'

const mapActionCreators = {
  fetchWidgetConfig,
  copyWidgetCode
}

const mapStateToProps = state => ({
  widgetConfig: state.widgetCode.widgetConfig
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(WidgetCodeCopy))
