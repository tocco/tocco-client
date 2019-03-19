import styled from 'styled-components'
import _get from 'lodash/get'

import StyledMenu from './StyledMenu'
import StyledItemFlyout from './StyledItemFlyout'

const StyledMenuStack = styled(StyledMenu)`
  && {
    > li {
      flex-direction: column;

      > button,
      > a {
        border-radius: 0;
        box-shadow: none;
        text-align: left;
        text-transform: none;
        width: 100%;
      }
    }

    > hr {
      border: none;
      border-top: 1px solid ${props => _get(props.theme, 'colors.text')};
      display: list-item;
      margin: 0;
    }

    > :not(${StyledItemFlyout}) > ul {
      width: calc(100% - 20px);
      margin-left: 20px;
    }
  }
`

export default StyledMenuStack
