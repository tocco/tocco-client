import styled from 'styled-components'

export const StyledSwitch = styled.div`
  position: relative;
  width: 30px;
  height: 14px;
  background: transparent;
  border: 1px solid #000;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 35px;
    top: 50%;
    left: 1px;
    background: transparent;
    transform: translate(0, -50%);
    border: 5px solid #b71c1c;
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
      transform: translate(16px, -50%);
    }
  }
`
