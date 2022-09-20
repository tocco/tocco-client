import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {LoadMask} from 'tocco-ui'

const Leaderboard = ({fetchData, data}) => {
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <LoadMask required={[data]}>
      <h2>Leaderboard</h2>
      <ol>
        {data?.map(d => (
          <li key={d.participant.key}>
            {d.participant.defaultDisplay} / {d.totalPoints}
          </li>
        ))}
      </ol>
    </LoadMask>
  )
}

Leaderboard.propTypes = {
  data: PropTypes.array,
  fetchData: PropTypes.func.isRequired
}

export default Leaderboard
