import styled from 'styled-components'

import {scale} from '../utilStyles'

const StyledLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: ${({containerWidth}) => containerWidth > 680 ? '1fr 1fr' : '1fr'};
  grid-gap: ${scale.space(-0.5)};
  align-items: flex-start;
`

export default StyledLayoutContainer
