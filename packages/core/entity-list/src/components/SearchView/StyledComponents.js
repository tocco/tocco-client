import styled from 'styled-components'

export const StyledAdminSearchFormWrapper = styled.div`
  display: flex; // enables StyledPlaceHolder to take full height
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100 - 77px); // TODO: This is only a temporary workaround, height needs to be 100%
  overflow-y: auto;
  overflow-x: hidden;
`
