import styled from 'styled-components'

export const PopoverBox = styled('div')`
  font-family: "Helvetica Neue", Helvetica, Arial sans-serif;
  display: flex;
  min-width: 4em;
  min-height: 4em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5c5c5c;
  color: #ffffff;
  border-radius: 10px;
  margin: 0.9em;
  padding: 0.5em;
  text-align: center;
  ${props => props.popperStyle};
  z-index: 1000000000;
`

export default PopoverBox
