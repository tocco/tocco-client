import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'

import LoginContainer from '../../containers/LoginContainer'

const LoadUsernameMask = ({usernameOrPk, showTitle}) => (
  <LoadMask required={[usernameOrPk]}>
    <LoginContainer currentPage="PASSWORD_UPDATE" showTitle={showTitle} />
  </LoadMask>
)

LoadUsernameMask.propTypes = {
  usernameOrPk: PropTypes.any,
  showTitle: PropTypes.bool
}

export default LoadUsernameMask
