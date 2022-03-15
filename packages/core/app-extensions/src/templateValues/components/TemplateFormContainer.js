import {connect} from 'react-redux'

import {initializeTemplates} from '../modules/actions'
import TemplateForm from './TemplateForm'

const mapActionCreators = {
  initializeTemplates
}

const mapStateToProps = state => ({
  formDefinition: state.templateValues.formDefinition
})

export default connect(mapStateToProps, mapActionCreators)(TemplateForm)
