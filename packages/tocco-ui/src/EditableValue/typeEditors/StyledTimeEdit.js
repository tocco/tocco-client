import styled from 'styled-components'

const StyledTimeEdit = styled.div`
  && {
    > input[type="time"] {
      width: 100%;
      padding: 5px 10px 5px 10px;
    }
    > input[type="time"]::-webkit-clear-button {
      display: none;
    }
  }
`

export default StyledTimeEdit
