import styled from 'styled-components'

const StyledDurationEdit = styled.div`
&& {
  display: flex;
  flew-wrap: nowrap;
  align-items: center;
  > input:nth-of-type(1) { 
      margin-right: 5px;
  }
  > input: nth-of-type(2) {
    margin: 0 5px 0 5px;
  }
}
`

export default StyledDurationEdit
