import React from 'react'
import PropTypes from 'prop-types'
import {Layout} from 'tocco-ui'

import {StyledFooterWrapper} from './StyledComponents'
import FooterItem from './FooterItem'
import TextValue from './TextValue'

const DetailFooterReduced = ({entity}) => (
  <StyledFooterWrapper>
    <Layout.Container>
      <Layout.Box>
        <FooterItem
          labelId="client.entity-detail.footer.key"
          valueComponent={() => <TextValue value={entity.paths.pk.value}/>}/>
      </Layout.Box>
    </Layout.Container>
  </StyledFooterWrapper>
)

DetailFooterReduced.propTypes = {
  entity: PropTypes.object.isRequired
}

export default DetailFooterReduced
