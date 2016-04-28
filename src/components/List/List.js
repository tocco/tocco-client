import React from 'react'
import { Link } from 'react-router';

const Item = (props) => (
  <tr>
    <td><Link to={'/detail/' + props.data.key}>{props.data.key}</Link></td>
    <td><Link to={'/detail/' + props.data.key}>{props.data.fields.label.value}</Link></td>
  </tr>
)

const List = (props) => {
  if (props.list.length === 0) {
    return <div className="List empty">Keine Einträge gefunden</div>
  }
  return (
    <table className="List table table-hover">
      <thead>
        <tr>
          <th style={{width: '100px'}}>Schlüssel</th>
          <th>Bezeichnung</th>
        </tr>
      </thead>
      <tbody>
        {props.list.map((item, index) => <Item key={index} data={item}/>)}
      </tbody>
    </table>
  )
}

List.propTypes = {
  list: React.PropTypes.array.isRequired
}

export default List
