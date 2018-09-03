import PropTypes from 'prop-types'
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
            <h5><FormattedMessage id="client.merge.copyRelationsTitle"/></h5>
            <div className="answer">
              <div onClick={() => this.props.changeStrategy('copyRelations', true)}>
                <input
                  type="radio"
                  className="form-check-input"
                  checked={this.props.strategies.copyRelations}
                  onChange={() => {}}
                />
                <span className="p-l-5"><FormattedMessage id="client.merge.yes"/></span>
              </div>
              <div onClick={() => this.props.changeStrategy('copyRelations', false)}>
                <input
                  type="radio"
                  className="form-check-input"
                  checked={!this.props.strategies.copyRelations}
                  onChange={() => {}}
                />
                <span className="p-l-5"><FormattedMessage id="client.merge.no"/></span>
              </div>
            </div>
          </div>
          <div>
            <h5><FormattedMessage id="client.merge.strategyTitle"/></h5>
            <div className="answer">
              <select
                className="form-control"
                value={this.props.strategies.sourceEntityAction}
                onChange={event => this.props.changeStrategy('sourceEntityAction', event.target.value)}
              >
                <option value={SourceEntityAction.NO_ACTION}>
                  {this.props.intl.formatMessage({id: 'client.merge.strategyNoAction'})}
                </option>
                <option value={SourceEntityAction.DELETE} hidden>
                  {this.props.intl.formatMessage({id: 'client.merge.strategyDelete'})}
                </option>
                {
                  (this.props.editOptions.length > 0
                    && <option value={SourceEntityAction.EDIT}>
                      {this.props.intl.formatMessage({id: 'client.merge.strategyEdit'})}
                    </option>
                  )
                }

              </select>
            </div>
            <div className={editClassNames}>
              <h5><FormattedMessage id="client.merge.editTitle"/></h5>
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
  editOptions: PropTypes.array.isRequired,
  changeEditOptionValue: PropTypes.func.isRequired,
  activateEditOption: PropTypes.func.isRequired,
  strategies: PropTypes.object.isRequired,
  changeStrategy: PropTypes.func.isRequired
}

export default MergeStrategy
