import styled from 'styled-components'

const StyledLocationEdit = styled.div`
&& {
  display: flex;
  justify-content: space-between;

  > .zipInput {
    width: 35%;
    margin-right: 10px;
  }

  > .cityInput {
    width: 65%;
  }
}
`

export const menuZipStyles = {
  menu: styles => ({
    ...styles,
    width: '250%'
  })
}

export const menuCityStyles = {
  menu: styles => ({
    ...styles,
    width: '150%',
    position: 'absolute',
    right: '0%'
  })
}

export default StyledLocationEdit
