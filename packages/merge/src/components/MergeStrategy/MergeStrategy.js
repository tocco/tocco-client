import React from 'react'
import {intlShape, FormattedMessage} from 'react-intl'
import classNames from 'classnames'
import EditOption from './EditOption'
import {SourceEntityAction} from '../../types/SourceEntityAction'

class MergeStrategy extends React.Component {
  render() {
    const editClassNames = classNames({
      hidden: this.props.strategies.sourceEntityAction !== SourceEntityAction.EDIT
    })

    return (
      <div>
        <form>
          <div>
            <h4><FormattedMessage id="client.entityoperation.action.merge.copyRelationsTitle"/></h4>
            <div className="answer">
              <div onClick={() => this.props.changeStrategy('copyRelations', true)}>
                <input
                  type="radio"
                  className="form-check-input"
                  checked={this.props.strategies.copyRelations}
                  onChange={() => {}}
                />
                <span className="p-l-5"><FormattedMessage id="client.entityoperation.action.merge.yes"/></span>
              </div>
              <div onClick={() => this.props.changeStrategy('copyRelations', false)}>
                <input
                  type="radio"
                  className="form-check-input"
                  checked={!this.props.strategies.copyRelations}
                  onChange={() => {}}
                />
                <span className="p-l-5"><FormattedMessage id="client.entityoperation.action.merge.no"/></span>
              </div>
            </div>
          </div>
          <div>
            <h4><FormattedMessage id="client.entityoperation.action.merge.strategyTitle"/></h4>
            <div className="answer">
              <select
                className="form-control"
                value={this.props.strategies.sourceEntityAction}
                onChange={event => this.props.changeStrategy('sourceEntityAction', event.target.value)}
              >
                <option value={SourceEntityAction.NO_ACTION}>
                  {this.props.intl.formatMessage({id: 'client.entityoperation.action.merge.strategyNoAction'})}
                </option>
                <option value={SourceEntityAction.DELETE} hidden>
                  {this.props.intl.formatMessage({id: 'client.entityoperation.action.merge.strategyDelete'})}
                </option>
                {
                  (this.props.editOptions.length > 0
                    && <option value={SourceEntityAction.EDIT}>
                      {this.props.intl.formatMessage({id: 'client.entityoperation.action.merge.strategyEdit'})}
                    </option>
                  )
                }

              </select>
            </div>
            <div className={editClassNames}>
              <h5><FormattedMessage id="client.entityoperation.action.merge.editTitle"/></h5>
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
  intl: intlShape.isRequired,
  editOptions: React.PropTypes.array.isRequired,
  changeEditOptionValue: React.PropTypes.func.isRequired,
  activateEditOption: React.PropTypes.func.isRequired,
  strategies: React.PropTypes.object.isRequired,
  changeStrategy: React.PropTypes.func.isRequired
}

export default MergeStrategy
