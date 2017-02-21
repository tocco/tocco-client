import React from 'react'
import {Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

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
    let result = true
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
    const currentPage = this.getCurrentPage()
    const t = React.cloneElement(currentPage,
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
              <FormattedMessage id="client.merge.back"/>
            </button>
          }
          {
            (this.state.index < this.state.amountPages - 1)
            && <button
              className="btn wizard-next-button"
              onClick={this.nextClick}
              disabled={!this.state.allowNext}
            >
              <FormattedMessage id="client.merge.next"/>
            </button>
          }
          {
            (this.state.index === this.state.amountPages - 1)
            && <Button
              className="wizard-next-button"
              label={this.props.save.label}
              onClick={this.props.save.fn}
              icon="glyphicon-floppy-save"
              primary
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
