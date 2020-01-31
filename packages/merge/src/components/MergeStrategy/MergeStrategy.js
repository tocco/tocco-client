import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {
  Button,
  ButtonGroup,
  Typography
} from 'tocco-ui'

import EditOption from './EditOption'
import {SourceEntityAction} from '../../types/SourceEntityAction'
import {StyledMergeStrategyAnswer} from './StyledMergeStrategy'

class MergeStrategy extends React.Component {
  msg(id) {
    return this.props.intl.formatMessage({id})
  }

  render() {
    return (
      <form>
        <Typography.H6>{this.msg('client.merge.copyRelationsTitle')}</Typography.H6>
        <ButtonGroup>
          <Button
            look="raised"
            aria={{'aria-pressed': this.props.strategies.copyRelations}}
            label={this.msg('client.merge.yes')}
            onClick={() => this.props.changeStrategy('copyRelations', true)}
          />
          <Button
            look="raised"
            aria={{'aria-pressed': !this.props.strategies.copyRelations}}
            label={this.msg('client.merge.no')}
            onClick={() => this.props.changeStrategy('copyRelations', false)}
          />
        </ButtonGroup>

        <Typography.H6>{this.msg('client.merge.strategyTitle')}</Typography.H6>
        <StyledMergeStrategyAnswer>
          <select
            value={this.props.strategies.sourceEntityAction}
            onChange={event => this.props.changeStrategy('sourceEntityAction', event.target.value)}
          >
            <option value={SourceEntityAction.NO_ACTION}>
              {this.msg('client.merge.strategyNoAction')}
            </option>
            <option value={SourceEntityAction.DELETE} hidden>
              {this.msg('client.merge.strategyDelete')}
            </option>
            {(this.props.editOptions.length > 0
              && <option value={SourceEntityAction.EDIT}>
                {this.msg('client.merge.strategyEdit')}
              </option>
            )}
          </select>
        </StyledMergeStrategyAnswer>

        {this.props.strategies.sourceEntityAction === SourceEntityAction.EDIT
          && <React.Fragment>
            <Typography.H6>{this.msg('client.merge.editTitle')}</Typography.H6>
            <StyledMergeStrategyAnswer>
              { this.props.editOptions.map((editOption, idx) =>
                <EditOption
                  key={`fieldset${idx}`}
                  editOption={editOption}
                  activateEditOption={this.props.activateEditOption}
                  onValueChange={this.props.changeEditOptionValue}
                />
              )}
            </StyledMergeStrategyAnswer>
          </React.Fragment>
        }
      </form>
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
