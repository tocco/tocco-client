import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'

import {HeaderRow, ToManyRelationRow, FieldRow, RelationRow} from './table-components'
import StyledMergeMatrix from './StyledMergeMatrix'

const MergeMatrix = props => {
  const targetEntity = props.entities.find(e => e.pk === props.targetEntityPk)

  return (
    <StyledMergeMatrix>
      <table className="table table-striped table-hover">
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
            props.model.fields.map((field, idx) => {
              return (
                <FieldRow
                  key={`fieldrow${idx}`}
                  field={field}
                  selections={props.selections}
                  targetEntity={targetEntity}
                  entities={props.entities}
                  selectSourceField={props.selectSourceField}
                />
              )
            })
          }
          {
            props.model.relations.filter(r => !r.toMany).map((relation, idx) => {
              return (
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
            })
          }
          {
            props.model.relations.filter(r => r.toMany).map((relation, idx) => {
              return (
                <ToManyRelationRow
                  key={`relationrow${idx}`}
                  relation={relation}
                  selections={props.selections}
                  targetEntity={targetEntity}
                  entities={props.entities}
                  toggleRelationMany={props.toggleRelationMany}
                />
              )
            })
          }
        </tbody>
      </table>
    </StyledMergeMatrix>
  )
}

MergeMatrix.propTypes = {
  entities: PropTypes.array.isRequired,
  model: PropTypes.object.isRequired,
  targetEntityPk: PropTypes.string,
  selections: PropTypes.object,
  changeTargetEntity: PropTypes.func.isRequired,
  selectSourceField: PropTypes.func.isRequired,
  selectSourceRelation: PropTypes.func.isRequired,
  toggleRelationMany: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default MergeMatrix
