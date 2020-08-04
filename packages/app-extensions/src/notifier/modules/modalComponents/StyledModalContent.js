import styled from 'styled-components'
import {
  scale,
  theme,
  StyledScrollbar
} from 'tocco-ui'
import {StyledLayoutBox} from 'tocco-ui/src/Layout'

import {StyledTitleWrapper} from '../../components/TitleMessage'
import {StyledCloseButton} from './ModalContent'

const modalWidth = 700
const gutterWidth = 30
const totalWidth = modalWidth + gutterWidth
// eslint-disable-next-line max-len
export const basePadding = 1.8 * parseFloat(getComputedStyle(document.documentElement).fontSize) // calc px value from 1.8rem

const StyledModalContent = styled.div.attrs(({isClosing}) => ({
  className: `rrt-confirm animated ${isClosing ? 'fadeOut' : 'fadeIn'}`
}))`
  &&& {
    background-color: ${theme.color('paper')};          // reset: react-redux-toastr (confirm.scss)
    border-radius: 0;           // reset: react-redux-toastr (confirm.scss)
    box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);         // reset: react-redux-toastr (confirm.scss)
    left: 0;                                            // reset: react-redux-toastr (confirm.scss)
    margin-left: ${Math.ceil((gutterWidth - basePadding) / 2)}px;       // reset: react-redux-toastr (confirm.scss)
    padding: 0 ${basePadding}px ${basePadding}px; // reset: react-redux-toastr (confirm.scss)
    width: calc(100% - ${gutterWidth}px - ${basePadding}px);
    ${StyledScrollbar}

    @media (min-width: ${totalWidth}px) {
      left: 50%;                                        // reset: react-redux-toastr (confirm.scss)
      margin-left: -${Math.ceil((totalWidth + basePadding) / 2)}px;     // reset: react-redux-toastr (confirm.scss)
      width: ${totalWidth}px;                           // reset: react-redux-toastr (confirm.scss)

      && {
        ${StyledTitleWrapper} {
          max-width: ${totalWidth}px;
        }
      }
    }

    ${StyledCloseButton} {
      top: ${basePadding}px;  // reset
    }

    ${/* sc-selector */StyledTitleWrapper},
    .advanced-search-button-wrapper {
      box-sizing: border-box;
      background: ${theme.color('paper')};
      padding-top: ${basePadding}px;
      padding-bottom: ${scale.space(0.2)};
      width: 100%;
      z-index: 1;
    }

    ${StyledTitleWrapper} {
      max-width: calc(100% - ${gutterWidth}px - ${basePadding}px);
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
      padding-bottom: ${basePadding}px;
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
