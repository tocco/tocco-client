import React from 'react'

import './MegerMatrix.scss'

import {HeaderRow, ToManyRelationRow, FieldRow, RelationRow} from './table-components'

class MergeMatrix extends React.Component {

  render() {
    var targetEntity = this.props.entities.find(e => e.pk === this.props.targetEntityPk)
    return (
      <div>
        <table className="table table-striped table-hover">
          <thead>
            <HeaderRow
              entities={this.props.entities}
              changeTargetEntity={this.props.changeTargetEntity}
              selectSourceField={this.props.selectSourceField}
              targetEntityPk={this.props.targetEntityPk}
            />
          </thead>
          <tbody>
          {
            this.props.model.fields.map((field, idx) => {
              return (
                <FieldRow
                  key={`fieldrow${idx}`}
                  field={field}
                  selections={this.props.selections}
                  targetEntity={targetEntity}
                  entities={this.props.entities}
                  selectSourceField={this.props.selectSourceField}
                />
              )
            })
          }
          {
            this.props.model.relations.filter(r => !r.toMany).map((relation, idx) => {
              return (
                <RelationRow
                  key={`relationrow${idx}`}
                  relation={relation}
                  selections={this.props.selections}
                  targetEntity={targetEntity}
                  entities={this.props.entities}
                  selectSourceRelation={this.props.selectSourceRelation}
                  toggleRelationMany={this.props.toggleRelationMany}
                />
              )
            })
          }
          {
            this.props.model.relations.filter(r => r.toMany).map((relation, idx) => {
              return (
                <ToManyRelationRow
                  key={`relationrow${idx}`}
                  relation={relation}
                  selections={this.props.selections}
                  targetEntity={targetEntity}
                  entities={this.props.entities}
                  toggleRelationMany={this.props.toggleRelationMany}
                />
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

MergeMatrix.propTypes = {
  entities: React.PropTypes.array.isRequired,
  model: React.PropTypes.object.isRequired,
  targetEntityPk: React.PropTypes.string,
  selections: React.PropTypes.object,
  changeTargetEntity: React.PropTypes.func.isRequired,
  selectSourceField: React.PropTypes.func.isRequired,
  selectSourceRelation: React.PropTypes.func.isRequired,
  toggleRelationMany: React.PropTypes.func.isRequired
}

export default MergeMatrix
