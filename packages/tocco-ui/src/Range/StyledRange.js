import styled from 'styled-components'

export const StyledInputWrapper = styled.div`
  width: 100%;
`

const StyledRange = styled.div`
  display: flex;

  .input {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
`

export const StyledInputItemWrapper = styled.div`
  display: inline-block;
  width: 100%;

  * {
    line-height: unset !important;
    text-align: center;
  }
`

export default StyledRange
