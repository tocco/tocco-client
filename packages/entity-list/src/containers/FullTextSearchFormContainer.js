import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import FullTextSearchForm from '../components/FullTextSearchForm'
import {submitSearchForm} from '../modules/searchForm/actions'

const mapActionCreators = {
  submitSearchForm
}

export default connect(null, mapActionCreators)(injectIntl(FullTextSearchForm))
