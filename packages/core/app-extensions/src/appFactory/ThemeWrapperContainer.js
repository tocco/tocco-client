import {connect} from 'react-redux'

import {setThemeType} from './store/theme/actions'
import ThemeWrapper from './ThemeWrapper'

const mapActionCreators = {
  setThemeType
}

const mapStateToProps = state => ({
  themeType: state.theme.themeType // TODO: rename here, not good enough yet
})

export default connect(mapStateToProps, mapActionCreators)(ThemeWrapper)
