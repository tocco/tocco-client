import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledSignalList = styled.ul`
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;

  > li > ul {
    margin-left: ${theme('space.5')};
  }
`

export default StyledSignalList
