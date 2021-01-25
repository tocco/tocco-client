import styled from 'styled-components'

import {scale} from '../utilStyles'

const StyledLayoutContainer = styled.div`
  display: grid;
  ${({containerWidth, theme}) => containerWidth < 600
? 'grid-template-columns: 100%;'
    : `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: ${scale.space(-0.5)({theme})}`
  };
`

export default StyledLayoutContainer
