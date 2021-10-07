import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import {StyledFooterItemWrapper, StyledFooterItemLabel, StyledFooterItemValue} from './StyledComponents'

const FooterItem = ({labelId, valueComponent: ValueComp}) => (
  <StyledFooterItemWrapper>
    <StyledFooterItemLabel><FormattedMessage id={labelId}/>:</StyledFooterItemLabel>
    <StyledFooterItemValue><ValueComp/></StyledFooterItemValue>
  </StyledFooterItemWrapper>
)

FooterItem.propTypes = {
  labelId: PropTypes.string.isRequired,
  valueComponent: PropTypes.func.isRequired
}

export default FooterItem
