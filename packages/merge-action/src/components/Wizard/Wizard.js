import React from 'react'
import {SaveButton} from 'tocco-ui'

import './styles.css'

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
      this.setState((previousState) => {
        return {index: previousState.index - 1}
      })
    }
  }

  changeAllowNext = (allow) => {
    this.setState(() => {
      return {allowNext: allow}
    })
  }

  nextClick = () => {
    var result = true
    console.log('this.currentRender', this.currentRender)
    if (this.currentRender && this.currentRender.getWrappedInstance) {
      console.log('wraped instance')
      if (this.currentRender.getWrappedInstance().wizardNext) {
        result = this.currentRender.getWrappedInstance().wizardNext()
      }
    }
    if (result && (this.state.index < (this.state.amountPages - 1))) {
      this.setState((previousState) => {
        return {index: previousState.index + 1}
      })
    }
  }

  render() {
    var currentPage = this.getCurrentPage()
    var t = React.cloneElement(currentPage,
      {
        wizardAllowNext: this.changeAllowNext,
        ref: (ref) => (this.currentRender = ref)
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
            && <button className="btn wizard-back-button" onClick={this.backClick}>Zurück</button>
          }
          {
            (this.state.index < this.state.amountPages - 1)
            && <button
              className="btn wizard-next-button"
              onClick={this.nextClick}
              disabled={!this.state.allowNext}
            >
              Weiter
            </button>
          }
          {
            (this.state.index === this.state.amountPages - 1)
            && <SaveButton
              className="btn wizard-next-button"
              label={this.props.save.label}
              onClick={this.props.save.fn}
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
