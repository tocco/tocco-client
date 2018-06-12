import {theme} from 'styled-system'
import {StyledUl} from '../Typography'

const StyledSignalList = StyledUl.extend`
  && {
    list-style-type: none;
    margin: 0 0 ${props => theme('space.5')} 0;

    & & {
      margin: 0 0 0 1.25rem;
    }
  }
`

export default StyledSignalList
