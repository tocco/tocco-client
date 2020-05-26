import React from 'react'
import PropTypes from 'prop-types'
import {QRCode, Typography} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'

const StyledQRCodeWrapper = styled.div`
  margin: 10px;
`

const Result = ({secret}) => {
  return <React.Fragment>
    <Typography.P>
      <FormattedMessage id="client.two-factor-connector.qrCodeInfo"/>
    </Typography.P>
    <StyledQRCodeWrapper>
      <QRCode value={secret.uri}/>
    </StyledQRCodeWrapper>
    <Typography.P>
      <FormattedMessage id="client.two-factor-connector.secretInfo"/>
    </Typography.P>
    <Typography.P><Typography.B>{secret.text}</Typography.B> </Typography.P>
    <Typography.P>
      <FormattedMessage id="client.two-factor-connector.backupInfo"/>
    </Typography.P>
  </React.Fragment>
}

Result.propTypes = {
  secret: PropTypes.shape({
    text: PropTypes.string,
    uri: PropTypes.string
  }).isRequired
}

export default Result
