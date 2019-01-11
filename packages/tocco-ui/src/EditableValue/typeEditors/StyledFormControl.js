import styled from 'styled-components'

import {spaceScale} from '../../utilStyles'

const StyledFormControl = styled.div.attrs({
  className: 'form-control'
})`
  &&& {
    align-items: center;
    cursor: ${props => props.readOnly ? 'not-allowed' : 'default'};
    display: flex;

    > input {
      background-color: transparent;
      border: 0;
      cursor: inherit;
      flex-grow: 1;
      min-width: 0;
      outline: 0;

      &[type=time] {
        &::-ms-clear {
          display: none;
        }
        &::-webkit-clear-button {
          display: none;
        }
        &::-webkit-inner-spin-button {
          display: none;
        }
      }
    }

    > a,
    > button,
    > span > button {
      margin-left: ${props => spaceScale(props, -2)};
      min-width: 2.6rem;
    }
  }
`

export default StyledFormControl
