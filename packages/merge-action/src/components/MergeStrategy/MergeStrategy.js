import React from 'react'
import classNames from 'classnames'
import EditOption from './EditOption'
import {SourceEntityAction} from '../../types/SourceEntityAction'

class MergeStrategy extends React.Component {
  render() {
    var editClassNames = classNames({
      hidden: this.props.strategies.sourceEntityAction !== SourceEntityAction.EDIT
    })

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
                  checked={this.props.strategies.copyRelations}
                  onChange={() => this.props.changeStrategy('copyRelations', true)}
                />
                <span className="p-l-5">Ja</span>
              </div>
              <div>
                <input
                  type="radio"
                  className="form-check-input"
                  checked={!this.props.strategies.copyRelations}
                  onChange={() => this.props.changeStrategy('copyRelations', false)}
                />
                <span className="p-l-5">Nein</span>
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
                <option value={SourceEntityAction.NO_ACTION}>Keine Aktion</option>
                <option value={SourceEntityAction.DELETE}>Löschen</option>
                {
                  (this.props.editOptions.length > 0
                    && <option value={SourceEntityAction.EDIT}>Bearbeiten</option>
                  )
                }

              </select>
            </div>
            <div className={editClassNames}>
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
