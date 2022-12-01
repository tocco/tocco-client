import styled from 'styled-components'

import {scale} from '../utilStyles'

export const StyledSwitch = styled.div`
  margin-left: ${scale.space(-0.5)};
  position: relative;
  width: 20px;
  height: 8px;
  background: transparent;
  border: 1px solid #000;
  border-radius: 35px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 35px;
    top: 50%;
    left: 1px;
    background: transparent;
    transform: translate(0, -50%);
    border: 5px solid #000;
  }
`

export const StyledSwitchLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

export const StyledSwitchInput = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${StyledSwitch} {
    border: 1px solid #fff;

    &:before {
      transform: translate(12px, -50%);
      border: 5px solid #b22a31;
    }
  }
`
