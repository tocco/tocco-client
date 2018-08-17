import PropTypes from 'prop-types'
import React from 'react'

import {Icon} from 'tocco-ui'

const PropsTable = props => {
  const rows = []

  for (const propName in props.props) {
    if (props.props.hasOwnProperty(propName)) {
      const prop = props.props[propName]
      rows.push(
        <tr key={propName}>
          <td>{propName}</td>
          <td>{prop.description}</td>
          <td>{prop.required && <Icon icon="exclamation"/>}</td>
          <td>{prop.type.name}</td>
        </tr>
      )
    }
  }

  return (
    <div className="table-responsive">
      <h1>Properties</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

PropsTable.propTypes = {
  props: PropTypes.object.isRequired
}

export default PropsTable
