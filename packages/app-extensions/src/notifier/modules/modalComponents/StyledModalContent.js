import styled from 'styled-components'
import {
  scale,
  theme,
  StyledScrollbar
} from 'tocco-ui'
import {StyledLayoutBox} from 'tocco-ui/src/Layout'

import {StyledTitleWrapper} from '../../components/TitleMessage'
import {StyledCloseButton} from './ModalContent'

const maxModalWidth = 700
export const basePadding = scale.space(0.5)

const StyledModalContent = styled.div.attrs(({isClosing}) => ({
  className: `rrt-confirm animated ${isClosing ? 'fadeOut' : 'fadeIn'}`
}))`
  &&& {
    display: flex;
    flex-direction: column;
    background-color: ${theme.color('paper')};          // reset: react-redux-toastr (confirm.scss)
    border-radius: 0;           // reset: react-redux-toastr (confirm.scss)
    box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);         // reset: react-redux-toastr (confirm.scss)
    padding: 0 ${basePadding} ${basePadding}; // reset: react-redux-toastr (confirm.scss)
    width: auto;
    max-width: ${maxModalWidth}px;
    ${StyledScrollbar}
    margin: auto;
    left: 0;
    right: 0;

    ${StyledCloseButton} {
      top: ${basePadding}px;  // reset
    }

    ${/* sc-selector */StyledTitleWrapper},
    .advanced-search-button-wrapper {
      box-sizing: border-box;
      background: ${theme.color('paper')};
      padding-top: ${basePadding};
      padding-bottom: ${scale.space(0.2)};
      width: 100%;
      z-index: 1;
    }

    ${StyledTitleWrapper} {
      width: 100%;
      max-width: ${maxModalWidth}px;
    }

    .advanced-search-button-wrapper {
      position: sticky;
      bottom: 0;
      transform: translateY(1.8rem);
    }

    .button-wrapper {
      position: sticky;
      bottom: 0;
      padding-top: ${scale.space(0)};
      padding-bottom: ${basePadding};
      background-color: ${theme.color('paper')};
      transform: translateY(1.8rem);
    }

    ${StyledLayoutBox} {
      &:first-child {
        margin-top: ${scale.space(0)};
      }
    }
  }
`

export {
  StyledModalContent
}
