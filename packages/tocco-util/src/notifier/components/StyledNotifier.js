import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledNotifier = styled.div`
&& {
  .redux-toastr,
  .tocco-notifier {
    font-size: 16px;  // reset: nice (body in scaffolding.less)

    .bottom-center,
    .bottom-left,
    .bottom-right,
    .top-center,
    .top-left,
    .top-right {
      max-height: 100%; // usability: ensure accessibility of all notification boxes
      overflow-y: auto; // todo: enhance usability - it is not obvious that content is scrollable
    }

    .toastr {
      min-height: 88px;  // reset: react-redux-toastr (index.scss)
      opacity: 1;  // reset: react-redux-toastr (index.scss)
      border-radius: ${theme('radii.2')};  // reset: react-redux-toastr (index.scss)

      &:hover:not( .rrt-message ) {
        box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);  // reset: react-redux-toastr (index.scss)
      }

      .rrt-holder {
        top: 20px;  // reset: react-redux-toastr (index.scss)
        margin-top: 0;  // reset: react-redux-toastr (index.scss)
        height: auto;  // reset: react-redux-toastr (index.scss)
        line-height: 1;  // reset: react-redux-toastr (index.scss)
      }

      .close-toastr {
        height: auto;
        opacity: .9;  // reset: react-redux-toastr (index.scss)
      }
    }

    .rrt-confirm {
      top: 10%;  // reset: react-redux-toastr (confirm.scss)
      max-height: 80%;  // usability: prevent modal from being larger than viewport
      overflow-y: auto; // todo: enhance usability - it is not obvious that content is scrollable

      .dialog {
        padding: $line-height-computed-half;
      }

      .rrt-buttons-holder .rrt-button {
        background-color: $btn-default-bg;

        &:hover,
        &:focus,
        &:active {
          background-color: darken($btn-default-bg, 10%);
        }

        &.rrt-ok-btn:active {
          background-color: inherit;  // reset: react-redux-toastr (confirm.scss)
          color: inherit;  // reset: react-redux-toastr (confirm.scss)
        }

        &.rrt-cancel-btn:active {
          background-color: inherit;  // reset: react-redux-toastr (confirm.scss)
          color: inherit;  // reset: react-redux-toastr (confirm.scss)
        }
      }
    }

    // reset: react-redux-toastr (index.scss & confirm.scss)
    .redux-toastr .toastr-attention,
    .rrt-confirm-holder .shadow {
      background-color: ${props => theme('shadows.color')};
    }

    .rrt-confirm-holder {
      z-index: 100000000;  // reset: react-redux-toastr (confirm.scss)
    }
  }

  .redux-toastr {
    .toastr {
      background-color: ${props => theme('colors.base.fill.0')};  // reset: react-redux-toastr (index.scss)
      color: ${props => theme('colors.base.text')};  // reset: react-redux-toastr (index.scss)

      .toastr-status {
        &.success {
          background-color: ${props => theme('colors.signal.successBg')};  // reset: react-redux-toastr (index.scss)
        }

        &.warning {
          background-color: ${props => theme('colors.signal.warningBg')};  // reset: react-redux-toastr (index.scss)
        }

        &.info {
          background-color: ${props => theme('colors.base.fill.0')};  // reset: react-redux-toastr (index.scss)
        }

        &.error {
          background-color: ${props => theme('colors.signal.dangerBg')}; // reset: react-redux-toastr (index.scss)
        }
      }

      &.rrt-info,
      &.rrt-success,
      &.rrt-warning,
      &.rrt-error {
        color: ${props => theme('colors.base.text')};  // reset: react-redux-toastr (index.scss)

        .rrt-progressbar {
          background-color: rgba(0, 0, 0, .3);  // reset: react-redux-toastr (index.scss)
        }
      }

      &.rrt-info {
        background-color: ${props => theme('colors.base.fill.0')};  // reset: react-redux-toastr (index.scss)
      }

      &.rrt-success {
        background-color: ${props => theme('colors.signal.successBg')};  // reset: react-redux-toastr (index.scss)
      }

      &.rrt-warning {
        background-color: ${props => theme('colors.signal.warningBg')};  // reset: react-redux-toastr (index.scss)
      }

      &.rrt-error {
        background-color: ${props => theme('colors.signal.dangerBg')};  // reset: react-redux-toastr (index.scss)
      }

      .rrt-holder {
        opacity: .9;
      }
    }
  }
}
`

export {
  StyledNotifier
}
