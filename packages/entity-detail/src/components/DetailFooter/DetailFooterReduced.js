import React from 'react'
import PropTypes from 'prop-types'

import {StyledFooterWrapper} from './StyledComponents'
import FooterItem from './FooterItem'
import TextValue from './TextValue'

const DetailFooterReduced = ({
  entity,
  keyField
}) => (
  <StyledFooterWrapper>
    <div>
      <FooterItem
        labelId="client.entity-detail.footer.key"
        valueComponent={() => <TextValue value={entity.paths[keyField].value}/>}/>
    </div>
  </StyledFooterWrapper>
)

DetailFooterReduced.propTypes = {
  entity: PropTypes.object.isRequired,
  keyField: PropTypes.string.isRequired
}

export default DetailFooterReduced
