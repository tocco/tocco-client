import styled from 'styled-components'

import {scale} from '../utilStyles'

const StyledLayoutContainer = styled.div`
  display: grid;
  padding-right: ${scale.space(0)};
  ${({containerWidth, theme}) => containerWidth < 600
? 'grid-template-columns: 100%;'
    : `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: ${scale.space(0.25)({theme})}`
  };
  ${({occupiesRemainingHeight}) => occupiesRemainingHeight && `
    flex: 1;
  `};
`

export default StyledLayoutContainer
