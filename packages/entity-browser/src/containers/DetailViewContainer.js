import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {closeRecordDetail} from '../modules/entityBrowser/actions'

import DetailView from '../components/DetailView'

const mapActionCreators = {
  closeRecordDetail
}

const mapStateToProps = (state, props) => ({
  formDefinition: state.detailView.formDefinition,
  record: state.detailView.record
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))

