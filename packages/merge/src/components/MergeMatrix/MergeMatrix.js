import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'

import {HeaderRow, ToManyRelationRow, FieldRow, RelationRow} from './table-components'
import {StyledMergeMatrixTable} from './StyledMergeMatrix'

const MergeMatrix = props => {
  const targetEntity = props.entities.find(e => e.pk === props.targetEntityPk)

  return (
    <StyledMergeMatrixTable>
      <thead>
        <HeaderRow
          entities={props.entities}
          changeTargetEntity={props.changeTargetEntity}
          selectSourceField={props.selectSourceField}
          targetEntityPk={props.targetEntityPk}
          intl={props.intl}
        />
      </thead>
      <tbody>
        {
          props.model.fields.map((field, idx) =>
            <FieldRow
              key={`fieldrow${idx}`}
              field={field}
              selections={props.selections}
              targetEntity={targetEntity}
              entities={props.entities}
              selectSourceField={props.selectSourceField}
            />
          )
        }{
          props.model.relations.filter(r => !r.toMany).map((relation, idx) =>
            <RelationRow
              key={`relationrow${idx}`}
              relation={relation}
              selections={props.selections}
              targetEntity={targetEntity}
              entities={props.entities}
              selectSourceRelation={props.selectSourceRelation}
              toggleRelationMany={props.toggleRelationMany}
            />
          )
        }{
          props.model.relations.filter(r => r.toMany).map((relation, idx) =>
            <ToManyRelationRow
              key={`relationrow${idx}`}
              relation={relation}
              selections={props.selections}
              targetEntity={targetEntity}
              entities={props.entities}
              toggleRelationMany={props.toggleRelationMany}
            />
          )
        }
      </tbody>
    </StyledMergeMatrixTable>
  )
}

const fieldsPropType = PropTypes.shape({
  label: PropTypes.string,
  name: PropTypes.string
})

const relationsPropType = PropTypes.shape({
  label: PropTypes.string,
  name: PropTypes.string,
  toMany: PropTypes.bool
})

MergeMatrix.propTypes = {
  entities: PropTypes.array.isRequired,
  model: PropTypes.shape({
    fields: PropTypes.arrayOf(fieldsPropType).isRequired,
    relations: PropTypes.arrayOf(relationsPropType).isRequired
  }).isRequired,
  targetEntityPk: PropTypes.string,
  selections: PropTypes.object,
  changeTargetEntity: PropTypes.func.isRequired,
  selectSourceField: PropTypes.func.isRequired,
  selectSourceRelation: PropTypes.func.isRequired,
  toggleRelationMany: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default MergeMatrix
