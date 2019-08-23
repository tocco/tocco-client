import React from 'react'
import PropTypes from 'prop-types'
import ToccoLogin from 'tocco-login/src/main'
import styled from 'styled-components'

const StyledLogin = styled.div`
  width: 400px;
  margin: 0 auto;
`

const Login = props => {
  const loginSuccess = ({timeout}) => {
    props.loginSuccessful(timeout)
  }

  return (
    <StyledLogin>
      <ToccoLogin
        loginSuccess={loginSuccess}
        showTitle
      />
    </StyledLogin>
  )
}

Login.propTypes = {
  loginSuccessful: PropTypes.func.isRequired
}

export default Login
