import styled from 'styled-components'

const StyledMergeMatrix = styled.div`
  && {
    .merge-matrix-selected-col {
      background-color: #f0f8ff;
    }

    .merge-matrix-th-selected {
      .targetIcon {
        color: #f08080;
      }
    }

    .merge-matrix-th {
      cursor: pointer;

      .targetIcon {
        color: #d3d3d3;
      }
    }

    label.selection-label {
      font-weight: normal;
      margin: 0 .3rem;
    }
  }
`

export default StyledMergeMatrix
