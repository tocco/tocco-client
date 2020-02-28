import styled from 'styled-components'
import {
  scale,
  theme
} from 'tocco-ui'

const modalWidth = 700
const gutterWidth = 30

const StyledModalContent = styled.div.attrs({
  className: props => `rrt-confirm animated ${props.isClosing ? 'fadeOut' : 'fadeIn'}`
})`
  &&& {
    background-color: ${theme.color('paper')}; // reset: react-redux-toastr (confirm.scss)
    border-radius: ${theme.radii('regular')}; // reset: react-redux-toastr (confirm.scss)
    box-shadow: 2px 2px 10px rgba(0, 0, 0, .4); // reset: react-redux-toastr (confirm.scss)
    left: 0;                                            // reset: react-redux-toastr (confirm.scss)
    margin-left: ${Math.ceil(gutterWidth / 2)}px;       // reset: react-redux-toastr (confirm.scss)
    padding: ${scale.space(-1)};                        // reset: react-redux-toastr (confirm.scss)
    width: calc(100% - ${gutterWidth}px);

    @media (min-width: ${modalWidth + gutterWidth}px) {
      left: 50%;                                        // reset: react-redux-toastr (confirm.scss)
      margin-left: ${Math.ceil(modalWidth / -2)}px;     // reset: react-redux-toastr (confirm.scss)
      width: ${modalWidth}px;                           // reset: react-redux-toastr (confirm.scss)
    }

    // copy: react-redux-toastr (index.scss)
    .close-toastr {
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 22px;
      height: auto;  // reset
      opacity: .8;  // reset
      outline: none;
      position: absolute;
      right: 5px;  // reset
      top: 5px;  // reset
      width: auto;  // reset

      &:hover {
        opacity: 1;
      }

      &:focus {
        outline: none;
      }
    }
  }
`

export {
  StyledModalContent
}
