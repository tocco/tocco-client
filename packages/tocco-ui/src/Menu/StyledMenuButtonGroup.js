import styled from 'styled-components'

import StyledMenu from './StyledMenu'
import {
  design,
  scale,
  theme
} from '../utilStyles'

const StyledMenuButtonGroup = styled(StyledMenu)`
  && {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: ${props => props.look === design.look.RAISED ? `-${scale.space(-1)(props)}` : 0};

    > hr {
      border: none;
      border-left: 1px solid ${theme.color('text')};
      display: list-item;
      height: auto;
      margin: 0;
    }

    > li,
    > hr {
      margin-bottom: ${props => props.look === design.look.RAISED ? scale.space(-1)(props) : 0};
    }

    > li {
      :not(:first-child) {
        > a,
        > button {
          margin-left: -1px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }

      :not(:last-child) {
        > a,
        > button {
          margin-right: 0;
          border-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
  }
`

export default StyledMenuButtonGroup
