import {theme} from 'styled-system'

import StyledItem from './StyledItem'
import {declareElevation} from '../utilStyles'

const StyledItemFlyout = StyledItem.extend`
  > ul {
    position: absolute;
    top: calc(100% + ${props => theme('space.2')});
    left: 0;
    z-index: 1;

    /*
      SCR_TEMP reactivate
      ${props => declareElevation(props, 1)}
    */

    ul {
      top: 0;
      left: calc(100% + ${props => theme('space.2')});
      right: auto;
    }
  }
`

export default StyledItemFlyout
