import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import {Button, LoadMask, StyledLabel} from 'tocco-ui'

import {StyledButtonWrapper, StyledCalendarCopy} from './StyledComponents'

const SubscribeCalendarCopy = ({fetchCalendarLinks, copyCalendarLink, links}) => {
  useEffect(() => {
    fetchCalendarLinks()
  }, [fetchCalendarLinks])

  return (
    <LoadMask required={[links]}>
      {links?.map(link => (
        <>
          <StyledLabel>{link.label}</StyledLabel>
          <StyledCalendarCopy>{link.link}</StyledCalendarCopy>
          <StyledButtonWrapper>
            <Button type="button" onClick={() => copyCalendarLink(link.link)} ink="primary" look="raised">
              <FormattedMessage id="client.subscribe-calendar.copy" />
            </Button>
          </StyledButtonWrapper>
        </>
      ))}
    </LoadMask>
  )
}

SubscribeCalendarCopy.propTypes = {
  fetchCalendarLinks: PropTypes.func.isRequired,
  copyCalendarLink: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.string)
}

export default SubscribeCalendarCopy
