import React from 'react'

import EditOption from './EditOption'

class MergeStrategy extends React.Component {
  render() {
    // this.props.wizardAllowNext(false)
    return (
      <div>
        <form>
          <div>
            <h4>Sollen alle Relationen der Ausgangsdatensätzen aug den Zieldatensatz mitkopiert werden?</h4>
            <div className="answer">
              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  checked={this.props.strategies.transferRelations}
                  onChange={() => this.props.changeStrategy('transferRelations', true)}
                />
                <span style={{paddingLeft: '5px'}}>Yes</span>
              </div>
              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  checked={!this.props.strategies.transferRelations}
                  onChange={() => this.props.changeStrategy('transferRelations', false)}
                />
                <span style={{paddingLeft: '5px'}}>No</span>
              </div>
            </div>
          </div>
          <div>
            <h4>Was soll mit den Ausgansdatensätzen passieren?</h4>
            <div className="answer">
              <select
                className="form-control"
                value={this.props.strategies.sourceEntityAction}
                onChange={(event) => this.props.changeStrategy('sourceEntityAction', event.target.value)}
              >
                <option value="noAction">Keine Aktion</option>
                <option value="delete">Löschen</option>
                <option value="edit">Bearbeiten</option>
              </select>
            </div>
            <div className={this.props.strategies.sourceEntityAction === 'edit' ? '' : 'hidden'}>
              <h5>Bearbeiten</h5>
              <div className="answer">
                {
                  this.props.editOptions.map((editOption, idx) => {
                    return <EditOption
                      key={`fieldset${idx}`}
                      editOption={editOption}
                      activateEditOption={this.props.activateEditOption}
                      onValueChange={this.props.changeEditOptionValue}
                    />
                  })
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

MergeStrategy.propTypes = {
  editOptions: React.PropTypes.array.isRequired,
  changeEditOptionValue: React.PropTypes.func.isRequired,
  activateEditOption: React.PropTypes.func.isRequired,
  strategies: React.PropTypes.object.isRequired,
  changeStrategy: React.PropTypes.func.isRequired
}

export default MergeStrategy
