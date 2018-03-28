import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'
import {intlShape} from 'react-intl'

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
            (this.state.index === this.state.amountPages - 1)
            && <Button
              ink="primary"
              label={this.props.save.label}
              look="raised"
              onClick={this.props.save.fn}
            />
          }
          {
            (this.state.index > 0)
            && <Button
              className="wizard-back-button"
              label={this.msg('client.merge.back')}
              look="raised"
              onClick={this.backClick}
            />
          }
          {
            (this.state.index < this.state.amountPages - 1)
            && <Button
              className="wizard-next-button"
              disabled={!this.state.allowNext}
              ink="primary"
              label={this.msg('client.merge.next')}
              look="raised"
              onClick={this.nextClick}
            />
          }
        </div>
      </div>
    )
  }

  msg(id) {
    return this.props.intl.formatMessage({
      id
    })
  }
}

Wizard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  intl: intlShape.isRequired,
  save: PropTypes.object.isRequired
}
