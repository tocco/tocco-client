import {connect} from 'react-redux'

import syncValidation from '../../form/syncValidation'
import {initializeTemplates} from '../modules/actions'
import TemplateForm from './TemplateForm'

const mapActionCreators = {
  initializeTemplates
}

const mapStateToProps = state => ({
  formDefinition: state.templateValues.formDefinition,
  validate: state.templateValues.fieldDefinitions
    ? syncValidation(state.templateValues.fieldDefinitions, state.templateValues.formDefinition)
    : () => ({})
})

export default connect(mapStateToProps, mapActionCreators)(TemplateForm)
