import styled from 'styled-components'

import StyledItem from './StyledItem'
import {spaceScale} from '../utilStyles'

const StyledItemFlyout = styled(StyledItem)`
  > ul {
    position: absolute;
    top: calc(100% + ${props => spaceScale(props, -3)});
    left: 0;
    z-index: 1;

    ul {
      top: 0;
      left: calc(100% + ${props => spaceScale(props, -3)});
      right: auto;
    }
  }
`

export default StyledItemFlyout
