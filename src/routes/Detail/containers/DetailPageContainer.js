import { connect } from 'react-redux'
import { updateEntity } from '../modules/detail'
import { fetchForm } from '../../../modules/forms'

import DetailPage from '../components/DetailPage'

const mapStateToProps = (state, ownProps) => {
  return {
    detail: state.detail,
    form: state.form,
    entityModel: ownProps.routeParams.entityModel,
    entityKey: ownProps.routeParams.entityKey,
    formName: ownProps.routeParams.entityModel + '_detail',
    forms: state.forms
  }
}

const mapActionCreators = {
  fetchForm,
  updateEntity
}

export default connect(mapStateToProps, mapActionCreators)(DetailPage)
