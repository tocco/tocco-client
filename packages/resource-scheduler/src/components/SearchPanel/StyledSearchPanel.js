import styled from 'styled-components'
import {
  colorizeBorder,
  scale,
  theme
} from 'tocco-ui'

export const StyledPanel = styled.div`
  && {
    .panel-group,
    .accordion-panel,
    .panel,
    .panel-default,
    .panel-heading,
    .panel-title,
    .panel-collapse,
    .panel-body {
      all: initial;
    }

    .accordion-panel {
      border: 1px solid ${props => colorizeBorder.shade2(props)};
      border-radius: ${theme.radii('regular')};
      display: block;
      margin-bottom: ${scale.space(0)};
      padding: 0 ${scale.space(-1)};

      .panel-collapse {
        &[aria-hidden="false"] {
          display: block;
        }

        &[aria-hidden="true"] {
          display: none;
          overflow: hidden;
        }
      }

      .react-bs-table-pagination .row {
        margin: 0;
      }
    }

    .panel-title > a {
      margin: 0 -${scale.space(-1)};
      display: flex;
      flex-flow: row nowrap;
      padding: ${scale.space(-1)};

      > h5 {
        align-self: center;
        flex: 1 1 auto;
        margin: 0 0 0 ${scale.space(-1)};
      }

      > svg {
        align-self: center;
        font-size: 2rem;
      }
    }
  }
`
