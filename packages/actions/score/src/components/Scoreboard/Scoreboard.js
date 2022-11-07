import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {LoadMask} from 'tocco-ui'

import {StyledTable, StyledTh, StyledTd, StyledTr, ContainerDiv} from './StyledComponents'

const Scoreboard = ({data, fetchData}) => {
  useEffect(() => {
    fetchData()
  }, [fetchData])

  const scoreBoardList = data
    ? data.map(({place, points, resultUserBean: {key, defaultDisplay}}) => (
        <StyledTr key={key}>
          <StyledTd data-testid="place">{place}</StyledTd>
          <StyledTd data-testid="points">{points}</StyledTd>
          <StyledTd data-testid="defaultDisplay">{defaultDisplay}</StyledTd>
        </StyledTr>
      ))
    : null

  return (
    <LoadMask required={[data]}>
      <ContainerDiv>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Platzierung</StyledTh>
              <StyledTh>Punkte</StyledTh>
              <StyledTh>Nachname, Vorname</StyledTh>
            </tr>
          </thead>
          <tbody>{scoreBoardList}</tbody>
        </StyledTable>
      </ContainerDiv>
    </LoadMask>
  )
}

Scoreboard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.number,
      points: PropTypes.number,
      resultUserBean: PropTypes.shape({
        key: PropTypes.string,
        defaultDisplay: PropTypes.string
      })
    })
  ),
  fetchData: PropTypes.func.isRequired
}

export default Scoreboard
