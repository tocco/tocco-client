import styled from 'styled-components'
import {
  Button,
  scale,
  theme
} from 'tocco-ui'

export const basePadding = scale.space(0.5)

export const StyledModalContent = styled.div`
  position: relative;
  background-color: ${theme.color('paper')};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);
  padding: ${basePadding};
  max-height: 80vh;
  min-width: 350px;
  max-width: 700px;
  margin: auto;
  top: 10%;
  display: grid;
  grid-template-rows: [title] auto [message] 1fr;
`

export const StyledCloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  opacity: .8;
  outline: none;
  position: absolute;
  right: ${basePadding};
  top: ${basePadding};
  padding: 0;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`

export const StyledModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99999;
`

export const StyledPageOverlay = styled.div`
  background-color: rgba(50, 50, 50, .7);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4; // higher than header components
`

export const StyledModalButton = styled(Button)`
  margin-top: ${scale.space(0)};

  &:last-child {
    margin-right: 0;
  }
`

export const StyledModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
