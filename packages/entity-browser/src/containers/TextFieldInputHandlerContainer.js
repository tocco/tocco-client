import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import TextFieldInputHandler from './../components/EntityBrowser/InputFactory/TypeHandler/TextFieldInputHandler'
import {setSearchTerm} from '../modules/entityBrowser/actions'

const mapActionCreators = {
  setSearchTerm
}

const mapStateToProps = (state, props) => ({})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(TextFieldInputHandler))
