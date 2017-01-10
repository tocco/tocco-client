import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {closeRecordDetail} from '../modules/entityBrowser/actions'
import {saveRecord} from '../modules/detailView/actions'

import DetailView from '../components/DetailView'

const mapActionCreators = {
  closeRecordDetail,
  saveRecord
}

const mapStateToProps = (state, props) => ({
  formDefinition: state.detailView.formDefinition,
  record: state.detailView.record
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))

