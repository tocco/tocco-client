import React from 'react'
import PropTypes from 'prop-types'

import {StyledFooterWrapper} from './StyledComponents'
import FooterItem from './FooterItem'
import TimestampValue from './TimestampValue'
import TextValue from './TextValue'

const DetailFooterFull = ({
  entity,
  keyField
}) => (
  <StyledFooterWrapper>
    <div>
      <FooterItem
        labelId="client.entity-detail.footer.created"
        valueComponent={() => <TimestampValue value={entity.paths.create_timestamp.value}/>}/>
      <FooterItem
        labelId="client.entity-detail.footer.by"
        valueComponent={() => <TextValue value={entity.paths.create_user.value}/>}/>
    </div>
    <div>
      <FooterItem
        labelId="client.entity-detail.footer.updated"
        valueComponent={() => <TimestampValue value={entity.paths.update_timestamp.value}/>}/>
      <FooterItem
        labelId="client.entity-detail.footer.by"
        valueComponent={() => <TextValue value={entity.paths.update_user.value}/>}/>
    </div>
    <div>
      <FooterItem
        labelId="client.entity-detail.footer.version"
        valueComponent={() => <TextValue value={entity.paths.version.value}/>}/>
      <FooterItem
        labelId="client.entity-detail.footer.key"
        valueComponent={() => <TextValue value={entity.paths[keyField].value}/>}/>
    </div>
  </StyledFooterWrapper>
)

DetailFooterFull.propTypes = {
  entity: PropTypes.object.isRequired,
  keyField: PropTypes.string.isRequired
}

export default DetailFooterFull
