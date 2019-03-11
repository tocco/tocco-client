import styled from 'styled-components'

export const StyledLocationEdit = styled.div`
&& {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`

export const StyledLocationEditZipInput = styled.span`
  width: 35%;
  margin-right: 10px;
`

export const StyledLocationEditCityInput = styled.span`
  width: 65%;
  margin-right: 10px;
`

export const menuZipStyles = {
  menu: styles => ({
    ...styles,
    width: '294%'
  })
}

export const menuCityStyles = {
  menu: styles => ({
    ...styles,
    width: '158%',
    position: 'absolute',
    right: '0%'
  })
}
