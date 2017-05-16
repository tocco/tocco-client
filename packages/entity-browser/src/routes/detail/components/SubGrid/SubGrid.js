import React from 'react'
import {withRouter} from 'react-router'
import EntityListApp from 'entity-list/src/main'

const SubGrid = props => {
  return (
    <div>
      <EntityListApp
        entityName={props.modelField.targetEntity}
        formBase={`${props.detailFormName}_${props.gridName}`}
        limit={5}
        showSearchForm={false}
        preselectedSearchFields={[{
          id: props.modelField.reverseRelationName,
          value: {key: props.entityKey},
          hidden: true
        }]}
        onRowClick={e => {
          const newUrl = `${props.match.url}/${props.relationName}/${e.id}`
          props.history.push(newUrl)
        }}
      />
    </div>
  )
}

SubGrid.propTypes = {
  entityKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  detailFormName: React.PropTypes.string.isRequired,
  gridName: React.PropTypes.string.isRequired,
  relationName: React.PropTypes.string.isRequired,
  modelField: React.PropTypes.shape({
    targetEntity: React.PropTypes.string,
    reverseRelationName: React.PropTypes.string
  }).isRequired,
  history: React.PropTypes.shape({
    push:  React.PropTypes.func
  }).isRequired,
  match: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(SubGrid)
