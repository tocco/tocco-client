import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'
import {LoadingSpinner, Typography} from 'tocco-ui'

const StyledContainer = styled.div`
  width: 148px;
  height: 148px;
  position: relative;
  align-self: center;
`

const StyledContent = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Scoreboard = ({data, fetchData}) => {
  useEffect(() => {
    fetchData()
  }, [fetchData])

  let content

  if (data === undefined) {
    content = <LoadingSpinner />
  } else if (data === null) {
    content = (
      <Typography.P>
        <FormattedMessage id="client.scoreboard.fetchFailed" />
      </Typography.P>
    )
  } else {
    content = data.map(({ranking, points, participantBean}) => (
      <React.Fragment key={participantBean.key}>
        <p>{participantBean.defaultDisplay}</p>
        <p>Ranking: {ranking}</p>
        <p>Points: {points}</p>
      </React.Fragment>
    ))
  }
  return (
    <StyledContainer>
      <StyledContent>{content}</StyledContent>
    </StyledContainer>
  )
}

Scoreboard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ParticipantBean: PropTypes.shape({
        key: PropTypes.number,
        entity: PropTypes.string,
        defaultDisplay: PropTypes.string
      }),
      points: PropTypes.number,
      ranking: PropTypes.number
    })
  ),
  fetchData: PropTypes.func
}

export default Scoreboard
