import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledModalContent = styled.div.attrs({
  className: props => `rrt-confirm animated ${props.isClosing ? ' fadeOut' : 'bounceIn'}`
})`
   &&& {
    background-color: ${theme('colors.base.paper')};    // reset: react-redux-toastr (confirm.scss)
    border-radius: ${theme('radii.2')};                 // reset: react-redux-toastr (confirm.scss)
    box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);         // reset: react-redux-toastr (confirm.scss)
    margin-left: -350px;                                // reset: react-redux-toastr (confirm.scss)
    padding: ${theme('space.5')};                       // reset: react-redux-toastr (confirm.scss)
    width: 700px;                                       // reset: react-redux-toastr (confirm.scss)

    // copy: react-redux-toastr (index.scss)
    .close-toastr {
      width: 10%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      background-color: transparent;
      font-size: 22px;
      border: none;
      outline: none;
      opacity: 0.5;
      cursor: pointer;
      font-family: "Helvetica Neue", Helvetica, Arial sans-serif;

      &:hover {
        opacity: 1;
      }

      &:focus {
        outline: none;
      }
    }

    // reset copy: react-redux-toastr (index.scss)
    .close-toastr {
      height: auto;
      opacity: .9;  // reset: react-redux-toastr (index.scss)
      right: 5px;
      top: 5px;
      width: auto;
    }
  }
`

export {
  StyledModalContent
}
