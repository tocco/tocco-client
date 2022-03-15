import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {setValuesFromTemplate} from '../modules/actions'
import TemplateSelect from './TemplateSelect'

const mapActionCreators = {
  setValuesFromTemplate
}

const mapStateToProps = state => ({
  templateOptions: state.templateValues.templateOptions,
  selectedTemplate: state.templateValues.selectedTemplate
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(TemplateSelect))
