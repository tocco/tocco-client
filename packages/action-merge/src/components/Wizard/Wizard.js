import React from 'react'
import * as Tocco from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import './styles.scss'

export class Wizard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      amountPages: props.children.length,
      allowNext: true
    }
  }

  getCurrentPage = () => {
    return this.props.children.find((child, idx) => {
      return idx === this.state.index
    })
  }

  backClick = () => {
    if (this.state.index > 0) {
      this.setState(previousState => {
        return {index: previousState.index - 1}
      })
    }
  }

  changeAllowNext = allow => {
    this.setState(() => {
      return {allowNext: allow}
    })
  }

  nextClick = () => {
    var result = true
    if (this.currentRender && this.currentRender.getWrappedInstance) {
      if (this.currentRender.getWrappedInstance().wizardNext) {
        result = this.currentRender.getWrappedInstance().wizardNext()
      }
    }
    if (result && (this.state.index < (this.state.amountPages - 1))) {
      this.setState(previousState => {
        return {index: previousState.index + 1}
      })
    }
  }

  render() {
    var currentPage = this.getCurrentPage()
    var t = React.cloneElement(currentPage,
      {
        wizardAllowNext: this.changeAllowNext,
        ref: ref => (this.currentRender = ref)
      }
    )

    return (
      <div className="wizard">
        <div className="wizard-body">
          {t}
        </div>
        <div className="wizard-footer">
          {
            (this.state.index > 0)
            && <button
              className="btn wizard-back-button"
              onClick={this.backClick}
            >
              <FormattedMessage id="client.entityoperation.action.merge.back"/>
            </button>
          }
          {
            (this.state.index < this.state.amountPages - 1)
            && <button
              className="btn wizard-next-button"
              onClick={this.nextClick}
              disabled={!this.state.allowNext}
            >
              <FormattedMessage id="client.entityoperation.action.merge.next"/>
            </button>
          }
          {
            (this.state.index === this.state.amountPages - 1)
            && <Tocco.Button
              className="btn wizard-next-button"
              label={this.props.save.label}
              onClick={this.props.save.fn}
              icon="glyphicon-floppy-save"
            />
          }
        </div>
      </div>
    )
  }
}

Wizard.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  save: React.PropTypes.object.isRequired
}
