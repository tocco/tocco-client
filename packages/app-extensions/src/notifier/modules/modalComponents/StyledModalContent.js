import styled from 'styled-components'
import {
  scale,
  theme,
  StyledScrollbar
} from 'tocco-ui'
import {StyledLayoutBox} from 'tocco-ui/src/Layout'

import {StyledButtonWrapper} from '../../../actions/components/StyledReportSettings'
import {StyledTitleWrapper} from '../../components/TitleMessage'
import {StyledAdvancedSearchButtonWrapper} from '../../../formData/advancedSearch/StyledAdvancedSearch'

const modalWidth = 700
const gutterWidth = 30

const StyledModalContent = styled.div.attrs({
  className: props => `rrt-confirm animated ${props.isClosing ? 'fadeOut' : 'fadeIn'}`
})`
   &&& {
    background-color: ${theme.color('paper')};          // reset: react-redux-toastr (confirm.scss)
    border-radius: 0;           // reset: react-redux-toastr (confirm.scss)
    box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);         // reset: react-redux-toastr (confirm.scss)
    left: 0;                                            // reset: react-redux-toastr (confirm.scss)
    margin-left: ${Math.ceil(gutterWidth / 2)}px;       // reset: react-redux-toastr (confirm.scss)
    padding: 0 ${scale.space(0.5)}; // reset: react-redux-toastr (confirm.scss)
    width: calc(100% - ${gutterWidth}px);
    ${StyledScrollbar}

    @media (min-width: ${modalWidth + gutterWidth}px) {
      left: 50%;                                        // reset: react-redux-toastr (confirm.scss)
      margin-left: ${Math.ceil(modalWidth / -2)}px;     // reset: react-redux-toastr (confirm.scss)
      width: ${modalWidth + gutterWidth}px;                           // reset: react-redux-toastr (confirm.scss)
    }

    // copy: react-redux-toastr (index.scss)
    .close-toastr {
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-family: "Helvetica Neue", Helvetica, Arial sans-serif;
      font-size: 22px;
      height: auto;  // reset
      opacity: .8;  // reset
      outline: none;
      position: sticky;
      left: 100%;  // reset
      top: ${scale.space(0.3)};  // reset
      width: auto;  // reset
      z-index: 2;

      &:hover {
        opacity: 1;
      }

      &:focus {
        outline: none;
      }
    }

    ${StyledTitleWrapper}, ${StyledAdvancedSearchButtonWrapper} {
      position: fixed;
      background: ${theme.color('paper')};
      padding-top: ${scale.space(0.5)};
      padding-bottom: ${scale.space(0.2)};
      width: ${modalWidth + gutterWidth}px;
      z-index: 1;
    }

    ${StyledButtonWrapper} {
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
