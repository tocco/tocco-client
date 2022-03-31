import PropTypes from 'prop-types'

import FooterItem from './FooterItem'
import {StyledFooterWrapper} from './StyledComponents'
import TextValue from './TextValue'
import TimestampValue from './TimestampValue'

const DetailFooterFull = ({entity, keyField}) => (
  <StyledFooterWrapper>
    <div>
      <FooterItem
        labelId="client.entity-detail.footer.created"
        valueComponent={() => <TimestampValue value={entity.paths.create_timestamp.value} />}
      />
      <FooterItem
        labelId="client.entity-detail.footer.by"
        valueComponent={() => <TextValue value={entity.paths.create_user.value} />}
      />
    </div>
    <div>
      <FooterItem
        labelId="client.entity-detail.footer.updated"
        valueComponent={() => <TimestampValue value={entity.paths.update_timestamp.value} />}
      />
      <FooterItem
        labelId="client.entity-detail.footer.by"
        valueComponent={() => <TextValue value={entity.paths.update_user.value} />}
      />
    </div>
    <div>
      <FooterItem
        labelId="client.entity-detail.footer.version"
        valueComponent={() => <TextValue value={entity.paths.version.value} />}
      />
      <FooterItem
        labelId="client.entity-detail.footer.key"
        valueComponent={() => <TextValue value={entity.paths[keyField].value} />}
      />
    </div>
  </StyledFooterWrapper>
)

DetailFooterFull.propTypes = {
  entity: PropTypes.object.isRequired,
  keyField: PropTypes.string.isRequired
}

export default DetailFooterFull
