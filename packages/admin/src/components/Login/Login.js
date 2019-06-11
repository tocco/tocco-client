import React from 'react'
import PropTypes from 'prop-types'
import ToccoLogin from 'tocco-Login/src/main'
import {Box} from '@rebass/grid'
const Login = props => {
  const loginSuccess = ({timeout}) => {
    props.loginSuccessful(timeout)
  }

  return (
    <div>
      <Box width={1 / 4} ml="auto" mr="auto" mt="auto">
        <ToccoLogin
          loginSuccess={loginSuccess}
          showTitle
        />
      </Box>
    </div>
  )
}

Login.propTypes = {
  loginSuccessful: PropTypes.func.isRequred
}

export default Login
