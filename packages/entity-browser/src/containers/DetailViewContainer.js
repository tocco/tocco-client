import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {closeEntityDetail} from '../modules/entityBrowser/actions'
import {saveEntity} from '../modules/detailView/actions'

import DetailView from '../components/DetailView'

const mapActionCreators = {
  closeEntityDetail,
  saveEntity
}

const mapStateToProps = (state, props) => ({
  formDefinition: state.detailView.formDefinition,
  entity: state.detailView.entity
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))

