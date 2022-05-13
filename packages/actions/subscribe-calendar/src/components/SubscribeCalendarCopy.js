import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import {Button, LoadMask} from 'tocco-ui'

import {StyledButtonWrapper, StyledCalendarCopy} from './StyledComponents'

const SubscribeCalendarCopy = ({fetchCalendarLink, copyCalendarLink, link}) => {
  useEffect(() => {
    fetchCalendarLink()
  }, [fetchCalendarLink])

  return (
    <LoadMask required={[link]}>
      <StyledCalendarCopy>{link}</StyledCalendarCopy>
      <StyledButtonWrapper>
        <Button type="button" onClick={() => copyCalendarLink()} ink="primary" look="raised">
          <FormattedMessage id="client.subscribe-calendar.copy" />
        </Button>
      </StyledButtonWrapper>
    </LoadMask>
  )
}

SubscribeCalendarCopy.propTypes = {
  fetchCalendarLink: PropTypes.func.isRequired,
  copyCalendarLink: PropTypes.func.isRequired,
  link: PropTypes.string
}

export default SubscribeCalendarCopy
