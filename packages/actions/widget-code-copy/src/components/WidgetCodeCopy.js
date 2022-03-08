import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import {Button, LoadMask} from 'tocco-ui'

import {generateWidgetCode} from '../utils/widgetCode'
import {StyledButtonWrapper, StyledWidgetCode} from './StyledComponents'

const WidgetCodeCopy = ({fetchWidgetConfig, copyWidgetCode, widgetConfig}) => {
  useEffect(() => {
    fetchWidgetConfig()
  }, [fetchWidgetConfig])

  return (
    <LoadMask required={[widgetConfig]}>
      {widgetConfig && (
        <>
          <StyledWidgetCode>{generateWidgetCode(widgetConfig)}</StyledWidgetCode>
          <StyledButtonWrapper>
            <Button type="button" onClick={() => copyWidgetCode()} ink="primary" look="raised">
              <FormattedMessage id="client.widget-code-copy.copy" />
            </Button>
          </StyledButtonWrapper>
        </>
      )}
    </LoadMask>
  )
}

WidgetCodeCopy.propTypes = {
  fetchWidgetConfig: PropTypes.func.isRequired,
  copyWidgetCode: PropTypes.func.isRequired,
  widgetConfig: PropTypes.object
}

export default WidgetCodeCopy
