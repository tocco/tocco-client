import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'
import {notification} from 'tocco-app-extensions'
import {Typography} from 'tocco-ui'

import Login from '../Login'

const StyledLoginHolder = styled(notification.StyledModalHolder)`
  // higher than StyledModalHolder
  // higher than StyledToasterBox
  z-index: 100000;
`

const InvalidSession = ({invalidSession, intl}) => {
  const msg = id => intl.formatMessage({id})

  const Content = () => (
    <>
      <Typography.P>
        <div dangerouslySetInnerHTML={{__html: msg('client.admin.invalidSession.description')}} />
      </Typography.P>
      <Login />
    </>
  )

  if (!invalidSession) {
    return null
  }

  return ReactDOM.createPortal(
    <StyledLoginHolder>
      <notification.ModalContent
        id="invalid-session"
        title={<FormattedMessage id="client.admin.invalidSession.title" />}
        component={() => <Content />}
        onClose={() => {}}
        onCancel={() => {}}
      />
      <notification.StyledPageOverlay />
    </StyledLoginHolder>,
    document.body
  )
}

InvalidSession.propTypes = {
  intl: PropTypes.object.isRequired,
  invalidSession: PropTypes.bool
}

export default InvalidSession
