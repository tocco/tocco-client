import {rgba, shade} from 'polished'
import styled, {keyframes} from 'styled-components'
import _get from 'lodash/get'
import {
  scale,
  theme
} from 'tocco-ui'

import {StyledMessageWrapper, StyledTitleWrapper} from './StyledTitleMessage'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const iconSize = scale.font(7)
const infoColor = theme.color('signal.info.text')
const successColor = theme.color('signal.success.text')
const warningColor = theme.color('signal.warning.text')
const dangerColor = theme.color('signal.danger.text')

export const StyledNotifier = styled.div`
  && {
    .redux-toastr {
      .toastr {
        background-color: ${theme.color('paper')};  // reset: react-redux-toastr (index.scss)
        color: ${theme.color('text')};  // reset: react-redux-toastr (index.scss)
        border: 1px solid ${theme.color('text')};

        .rrt-holder {
          width: 30px;
          top: ${scale.space(-0.5)};  // reset: react-redux-toastr (index.scss)
          margin-top: 0;  // reset: react-redux-toastr (index.scss)
          height: auto;  // reset: react-redux-toastr (index.scss)
          line-height: 1;  // reset: react-redux-toastr (index.scss)
          font-size: ${iconSize};
        }

        .rrt-left-container {
          width: 40px;
          height: 40px;
        }

        .rrt-middle-container {
          width: 100%; // reset: react-redux-toastr (index.scss)
          margin-left: 0; // reset: react-redux-toastr (index.scss)
          padding: ${scale.space(-0.5)};

          > div:first-child {
            margin-left: calc(${iconSize} + ${scale.space(-1)}); // icon size + spacing
            margin-top: ${scale.space(-2.5)};
          }
        }

        .toastr-status {
          &.success {
            border-color: ${successColor};
          }

          &.warning {
            border-color: ${warningColor};
          }

          &.info {
            border-color: ${infoColor};
          }

          &.error {
            border-color: ${dangerColor};
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

          ${StyledTitleWrapper} {
            * {
              font-size: ${scale.font(1.5)};
              font-weight: ${theme.fontWeight('regular')};
            }
            padding-bottom: ${scale.space(-0.5)};
            position: static;
            top: unset;
          }

          ${StyledMessageWrapper} {
            margin-top: 0;
          }
        }

        &.rrt-info {
          border-color: ${infoColor};

          ${/* sc-selector */StyledTitleWrapper} *,
          .rrt-holder {
            color: ${infoColor};
          }
        }

        &.rrt-success {
          border-color: ${successColor};

          ${/* sc-selector */StyledTitleWrapper} *,
          .rrt-holder {
            color: ${successColor};
          }
        }

        &.rrt-warning {
          border-color: ${warningColor};

          ${/* sc-selector */StyledTitleWrapper} *,
          .rrt-holder {
            color: ${warningColor};
          }
        }

        &.rrt-error {
          border-color: ${dangerColor};

          ${/* sc-selector */StyledTitleWrapper} *,
          .rrt-holder {
            color: ${dangerColor};
          }
        }
      }
    }

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
          animation-name: ${fadeIn};
          animation-timing-function: ease-in-out;
          will-change: transform;
        }
      }

      .top-right {
        z-index: 100000001;  // reset: react-redux-toastr (index.scss) - Stacking: Toaster > Modal > Blocker
      }

      .toastr {
        opacity: 1;  // reset: react-redux-toastr (index.scss)
        border-radius: 0;  // reset: react-redux-toastr (index.scss)
        box-shadow: none; // reset: react-redux-toastr (index.scss)

        &:hover:not(.rrt-message) {
          box-shadow: none;  // reset: react-redux-toastr (index.scss)
        }

        .close-toastr {
          height: auto;
          opacity: .7;  // reset: react-redux-toastr (index.scss)
          margin-top: 5px;
          margin-right: 0;
          font-size: ${scale.font(1.5)}; // reset: react-redux-toastr (index.scss)

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
        background-color: ${({theme}) => rgba(shade(0.8, _get(theme, 'colors.paper')), 0.7)};
      }

      // blockingInfo
      .redux-toastr .toastr-attention {
        animation-name: ${fadeIn};
        animation-duration: .7s;
        will-change: transform;
      }

      .rrt-confirm-holder {
        z-index: 99999;  // reset: react-redux-toastr (index.scss) - Stacking: Toaster > Modal > Blocker
      }
    }

    // Safari 10.1+ https://stackoverflow.com/questions/16348489/is-there-a-css-hack-for-safari-only-not-chrome
    @media not all and (min-resolution: .01dpcm) {
      @media {
        .tocco-notifier .redux-toastr .toastr-attention {
          background-color: transparent;
        }
      }
    }
  }
`
