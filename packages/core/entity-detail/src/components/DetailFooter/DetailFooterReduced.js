import PropTypes from 'prop-types'

import FooterItem from './FooterItem'
import {StyledFooterWrapper} from './StyledComponents'
import TextValue from './TextValue'

const DetailFooterReduced = ({entity, keyField}) => (
  <StyledFooterWrapper>
    <div>
      <FooterItem
        labelId="client.entity-detail.footer.key"
        valueComponent={() => <TextValue value={entity.paths[keyField].value} />}
      />
    </div>
  </StyledFooterWrapper>
)

DetailFooterReduced.propTypes = {
  entity: PropTypes.object.isRequired,
  keyField: PropTypes.string.isRequired
}

export default DetailFooterReduced
