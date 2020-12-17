import styled from 'styled-components'

import {scale} from '../utilStyles'

const StyledLayoutBox = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-gap: ${scale.space(-0.5)};
  margin-bottom: .5rem;
`

export default StyledLayoutBox
