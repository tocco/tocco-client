import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {QRCode, LoadingSpinner, Typography} from 'tocco-ui'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'

import {buildUserMecardString} from '../../utils/qrCodeUtils'

const StyledContainer = styled.div`
  width: 148px;
  height: 148px;
  position: relative;
`

const StyledContent = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const UserQrCode = ({data, fetchData}) => {
  useEffect(() => { fetchData() }, [])

  let content

  if (data === undefined) {
    content = <LoadingSpinner/>
  } else if (data === null) {
    content = (
      <Typography.P>
        <FormattedMessage id="client.user-qr-action.fetchFailed"/>
      </Typography.P>
    )
  } else {
    const string = buildUserMecardString(data)
    content = <QRCode value={string}/>
  }

  return (
    <StyledContainer>
      <StyledContent>
        {content}
      </StyledContent>
    </StyledContainer>
  )
}

UserQrCode.propTypes = {
  data: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    c_address: PropTypes.string,
    phone_mobile: PropTypes.string,
    phone_company: PropTypes.string,
    phone_private: PropTypes.string,
    email: PropTypes.string,
    email_alternative: PropTypes.string,
    birthdate: PropTypes.string
  }),
  fetchData: PropTypes.func.isRequired
}

export default UserQrCode
