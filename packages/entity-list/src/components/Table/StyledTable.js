import styled from 'styled-components'

const StyledTable = styled.div`
  && {
    .react-bs-table {
      .table {
        margin-bottom: 0;
      }

      td[ tabindex ] {
        outline: none;
      }
    }

    .break-word {
      > td {
        white-space: normal;
        word-wrap: break-word;
      }
    }

    .pointer {
      cursor: pointer;
    }
  }
`

export default StyledTable
