import {rgba, shade} from 'polished'
import styled, {keyframes} from 'styled-components'
import _get from 'lodash/get'
import {
  scale,
  shadeColor,
  theme
} from 'tocco-ui'

const wobbleHorizontal = keyframes`
  16.65% { transform: translateX(8px); }
  33.3%  { transform: translateX(-6px); }
  49.95% { transform: translateX(4px); }
  66.6%  { transform: translateX(-2px); }
  83.25% { transform: translateX(1px); }
  100%   { transform: translateX(0); }
`

const fadeIn = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`

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

      .animated.bounceIn {
        animation-name: ${wobbleHorizontal};
        animation-timing-function: ease-in-out;
        will-change: transform;
      }
    }

    .top-right {
      z-index: 100000001;  // reset: react-redux-toastr (index.scss) - Stacking: Toaster > Modal > Blocker
    }

    .toastr {
      min-height: 80px;  // reset: react-redux-toastr (index.scss)
      opacity: 1;  // reset: react-redux-toastr (index.scss)
      border-radius: ${theme.radii('regular')}  // reset: react-redux-toastr (index.scss)

      &:hover:not( .rrt-message ) {
        box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);  // reset: react-redux-toastr (index.scss)
      }

      .rrt-holder {
        top: 16px;  // reset: react-redux-toastr (index.scss)
        margin-top: 0;  // reset: react-redux-toastr (index.scss)
        height: auto;  // reset: react-redux-toastr (index.scss)
        line-height: 1;  // reset: react-redux-toastr (index.scss)
      }

      .close-toastr {
        height: auto;
        opacity: .7;  // reset: react-redux-toastr (index.scss)

        &:hover {
          opacity: 1;
        }
      }
    }

    .rrt-confirm {
      top: 10%;  // reset: react-redux-toastr (confirm.scss)
      max-height: 80%;  // usability: prevent modal from being larger than viewport
      overflow-y: auto; // todo: enhance usability - it is not obvious that content is scrollable

      .dialog {
        padding: ${scale.space(-1)};
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
      background-color: ${props => rgba(shade(0.8, _get(props.theme, 'colors.paper')), 0.7)};
    }

    // blockingInfo
    .redux-toastr .toastr-attention {
      animation-name: ${fadeIn};
      animation-duration: .7s;
      will-change: transform;
    }

    .rrt-confirm-holder {
      z-index: 100000000;  // reset: react-redux-toastr (index.scss) - Stacking: Toaster > Modal > Blocker
    }
  }

  .redux-toastr {
    .toastr {
      background-color: ${props =>
    shadeColor(_get(props.theme, 'colors.paper'), 1)};  // reset: react-redux-toastr (index.scss)
      color: ${props => theme.color('text')};  // reset: react-redux-toastr (index.scss)

      .toastr-status {
        &.success {
          background-color: ${theme.color('signal.success.paper')};  // reset: react-redux-toastr (index.scss)
        }

        &.warning {
          background-color: ${theme.color('signal.warning.paper')};  // reset: react-redux-toastr (index.scss)
        }

        &.info {
          background-color: ${props =>
    shadeColor(_get(props.theme, 'colors.paper'), 1)};  // reset: react-redux-toastr (index.scss)
        }

        &.error {
          background-color: ${theme.color('signal.danger.paper')}; // reset: react-redux-toastr (index.scss)
        }
      }

      &.rrt-info,
      &.rrt-success,
      &.rrt-warning,
      &.rrt-error {
        color: ${theme.color('text')};  // reset: react-redux-toastr (index.scss)

        .rrt-progressbar {
          background-color: rgba(0, 0, 0, .3);  // reset: react-redux-toastr (index.scss)
        }
      }

      &.rrt-info {
        background-color: ${props =>
    shadeColor(_get(props.theme, 'colors.paper'), 1)};  // reset: react-redux-toastr (index.scss)
      }

      &.rrt-success {
        background-color: ${theme.color('signal.success.paper')};  // reset: react-redux-toastr (index.scss)
      }

      &.rrt-warning {
        background-color: ${theme.color('signal.warning.paper')};  // reset: react-redux-toastr (index.scss)
      }

      &.rrt-error {
        background-color: ${theme.color('signal.danger.paper')};  // reset: react-redux-toastr (index.scss)
      }

      .rrt-holder {
        opacity: .9;
      }
    }
  }

  // Safari 10.1+ according https://stackoverflow.com/questions/16348489/is-there-a-css-hack-for-safari-only-not-chrome
  @media not all and (min-resolution:.001dpcm) { @media {
      .tocco-notifier .redux-toastr .toastr-attention {
        background-color: transparent;
      }
  }}
}
`

export {
  StyledNotifier
}
