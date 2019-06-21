import styled, {css} from 'styled-components'
import {
  colorizeBorder,
  scale,
  shadeColor,
  theme
} from 'tocco-ui'

export const StyledMergeMatrixTable = styled.table`
  && {
    width: 100%;
    max-width: 100%;
    margin-bottom: ${scale.space(-1)};
    border-collapse: collapse;
    border-spacing: 0;

    > tbody {
      > tr:nth-of-type(odd) {
        background-color: ${props => shadeColor(theme.color('paper')(props), 0.2)};
      }
    }
  }
`

const StyledMergeMatrixCell = css`
  background-color: ${props => props.selected ? theme.color('signal.info.paper') : 'transparent'};
  font-weight: ${props => props.bold ? theme.fontWeight('bold') : theme.fontWeight('regular')};
  padding: ${scale.space(-2)} ${scale.space(-1)};
  vertical-align: top;

  > label {
    margin: 0;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.6 : 1};

    :not(:last-child) {
      margin-right: ${scale.space(-1)};
    }

    input {
      margin-right: ${scale.space(-2)};
    }
  }

  time {
    vertical-align: bottom; // realignment needed because of "display: inline-block;" in declareNoneWrappingText.js
  }
`

export const StyledMergeMatrixTd = styled.td`
  && {
    ${StyledMergeMatrixCell}
    border-top: 1px solid ${props => colorizeBorder.shade2(props)};
  }
`

export const StyledMergeMatrixTh = styled.th`
  && {
    ${StyledMergeMatrixCell}
    cursor: pointer;
    border-bottom: 2px solid ${props => colorizeBorder.shade2(props)};
  }
`

export const StyledMergeMatrixLabel = styled.label`
  && {
    display: flex;
    width: 100%;
    max-width: 100%;
  }
`
