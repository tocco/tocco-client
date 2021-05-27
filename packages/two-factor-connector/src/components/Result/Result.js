import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography, Icon} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

import {StyledButtonWrapper} from '../GlobalStyledComponents'
import {StyledMessageWrapper, StyledIconWrapper, StyledTextWrapper} from './StyledComponents'

const Result = ({success, goToStart, setupSuccessful, intl}) => {
  const msg = id => intl.formatMessage({id})

  if (setupSuccessful) {
    return (
      <>
        <StyledMessageWrapper>
          <StyledIconWrapper isSuccessful={true}>
            <Icon icon={'check'}/>
          </StyledIconWrapper>
          <StyledTextWrapper>
            <Typography.P>
              <FormattedMessage id="client.two-factor-connector.successfulText"/>
            </Typography.P>
          </StyledTextWrapper>
        </StyledMessageWrapper>
        <StyledButtonWrapper>
          <Button
            label={msg('client.two-factor-connector.okButton')}
            ink="primary"
            look="raised"
            onClick={success}
          />
        </StyledButtonWrapper>
      </>
    )
  }

  return (
    <>
      <StyledMessageWrapper>
        <StyledIconWrapper isSuccessful={false}>
          <Icon icon={'times'}/>
        </StyledIconWrapper>
        <StyledTextWrapper>
          <Typography.P>
            <FormattedMessage id="client.two-factor-connector.errorText"/>
          </Typography.P>
        </StyledTextWrapper>
      </StyledMessageWrapper>
      <StyledButtonWrapper>
        <Button
          label={msg('client.two-factor-connector.okButton')}
          ink="primary"
          look="raised"
          onClick={goToStart}
        />
      </StyledButtonWrapper>
    </>
  )
}

Result.propTypes = {
  intl: intlShape.isRequired,
  success: PropTypes.func.isRequired,
  goToStart: PropTypes.func.isRequired,
  setupSuccessful: PropTypes.bool
}

export default Result
