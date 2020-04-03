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

  .extender {
    display: flex;
    align-items: flex-start;
  }
`

export const StyledInputItemWrapper = styled.div`
  display: inline-block;
  text-align: center;
  width: 100%;

  * {
    line-height: unset !important;
    text-align: center;
  }
`

export default StyledRange
