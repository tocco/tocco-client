import styled from 'styled-components'

import {scale} from '../utilStyles'

const StyledLayoutContainer = styled.div`
  display: grid;
  ${({containerWidth}) => containerWidth < 600 ? 'grid-template-columns: 1fr'
    : 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));'};
  grid-gap: ${scale.space(-0.5)};
`

export default StyledLayoutContainer
