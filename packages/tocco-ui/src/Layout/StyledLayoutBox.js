import styled from 'styled-components'

import {scale} from '../utilStyles'

const StyledLayoutBox = styled.div`
  display: grid;
  height: fit-content;
  grid-template-rows: auto;
  grid-template-columns: 100%;
  margin-bottom: ${scale.space(-0.5)};
`

export default StyledLayoutBox
