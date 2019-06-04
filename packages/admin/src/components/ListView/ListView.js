import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ListView = ({match}) => {
  const display = match.params.relation || match.params.entity
  return (
    <div>
      <h1>List View</h1>
      <table border="1" frame="void" rules="all">
        {
          [...Array(10).keys()].map(i =>
            <tr key={i}>
              <td>
                {i}
              </td>
              <td>
                <Link to={i + '/'}>{display} {i}</Link>
              </td>
            </tr>
          )
        }
      </table>

    </div>
  )
}

ListView.propTypes = {
  match: PropTypes.object.isRequired
}

export default ListView
