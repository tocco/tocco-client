import styled from 'styled-components'
import {
  scale,
  theme,
  StyledScrollbar
} from 'tocco-ui'
import {StyledLayoutBox} from 'tocco-ui/src/Layout'

const modalWidth = 700
const gutterWidth = 30
const totalWidth = modalWidth + gutterWidth
const basePadding = 1.8 * parseFloat(getComputedStyle(document.documentElement).fontSize) // calc px value from 1.8rem

const StyledModalContent = styled.div.attrs({
  className: props => `rrt-confirm animated ${props.isClosing ? 'fadeOut' : 'fadeIn'}`
})`
  &&& {
    background-color: ${theme.color('paper')};          // reset: react-redux-toastr (confirm.scss)
    border-radius: 0;           // reset: react-redux-toastr (confirm.scss)
    box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);         // reset: react-redux-toastr (confirm.scss)
    left: 0;                                            // reset: react-redux-toastr (confirm.scss)
    margin-left: ${Math.ceil((gutterWidth - basePadding) / 2)}px;       // reset: react-redux-toastr (confirm.scss)
    padding: 0 ${basePadding}px; // reset: react-redux-toastr (confirm.scss)
    width: calc(100% - ${gutterWidth}px - ${basePadding}px);
    ${StyledScrollbar}

    @media (min-width: ${totalWidth}px) {
      left: 50%;                                        // reset: react-redux-toastr (confirm.scss)
      margin-left: -${Math.ceil((totalWidth + basePadding) / 2)}px;     // reset: react-redux-toastr (confirm.scss)
      width: ${totalWidth}px;                           // reset: react-redux-toastr (confirm.scss)

      && {
        .title-wrapper {
          max-width: ${totalWidth}px;
        }
      }
    }

    p {
      margin-top: ${basePadding}px;
      margin-bottom: ${basePadding}px;
    }

    // copy: react-redux-toastr (index.scss)
    .close-toastr {
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 22px;
      height: auto;  // reset
      opacity: .8;  // reset
      outline: none;
      position: sticky;
      left: 100%;  // reset
      top: ${basePadding}px;  // reset
      padding-right: 0;
      width: auto;  // reset
      z-index: 2;

      &:hover {
        opacity: 1;
      }

      &:focus {
        outline: none;
      }
    }

    .title-wrapper,
    .advanced-search-button-wrapper {
      box-sizing: border-box;
      background: ${theme.color('paper')};
      padding-top: ${basePadding}px;
      padding-bottom: ${scale.space(0.2)};
      width: 100%;
      z-index: 1;
    }

    .title-wrapper {
      position: fixed;
      max-width: calc(100% - ${gutterWidth}px - ${basePadding}px);
    }

    .advanced-search-button-wrapper {
      position: sticky;
      bottom: 0;
    }

    .button-wrapper {
      position: sticky;
      bottom: 0;
      padding-top: ${scale.space(0.5)};
      padding-bottom: ${scale.space(0)};
      background-color: ${theme.color('paper')};
    }

    ${StyledLayoutBox} {
      &:first-child {
        margin-top: 3.4rem;
      }
    }
  }
`

export {
  StyledModalContent
}
