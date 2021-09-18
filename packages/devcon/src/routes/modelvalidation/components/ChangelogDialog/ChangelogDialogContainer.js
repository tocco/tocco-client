import {connect} from 'react-redux'

import ChangelogDialog from './ChangelogDialog'

const mapStateToProps = state => ({
  changelog: state.modelValidation.changelog
})

const mapActionCreators = {
}

export default connect(mapStateToProps, mapActionCreators)(ChangelogDialog)
