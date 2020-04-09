import styled from 'styled-components'

export const StyledInputWrapper = styled.div`
  width: 100%;
`
export const StyledInputItemWrapper = styled.div`
  display: inline-block;
  width: 100%;

  * {
    line-height: unset !important;
    text-align: center;
  }
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
    align-items: center;
  }
`

export default StyledRange
