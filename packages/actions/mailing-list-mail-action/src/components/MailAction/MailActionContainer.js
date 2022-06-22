import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {loadFormDefinition, sendMail, validate} from '../../modules/mailAction/actions'
import MailAction from './MailAction'

const mapActionCreators = {
  loadFormDefinition,
  sendMail,
  validate
}

const mapStateToProps = state => ({
  formDefinition: state.mailAction.formDefinition,
  formValid: state.mailAction.formValid
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MailAction))
