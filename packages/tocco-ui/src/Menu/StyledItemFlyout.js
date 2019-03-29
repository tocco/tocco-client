import styled from 'styled-components'

import StyledItem from './StyledItem'
import {scale} from '../utilStyles'

const StyledItemFlyout = styled(StyledItem)`
  > ul {
    position: absolute;
    top: calc(100% + ${scale.space(-3)});
    left: 0;
    z-index: 1;

    ul {
      top: 0;
      left: calc(100% + ${scale.space(-3)});
      right: auto;
    }
  }
`

export default StyledItemFlyout
