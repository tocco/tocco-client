import PropTypes from 'prop-types'
import React from 'react'
import {Button, ButtonGroup} from 'tocco-ui'
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

    const buttons = []

    if (this.state.index === this.state.amountPages - 1) {
      buttons.push(
        <Button
          ink="primary"
          label={this.props.save.label}
          onClick={this.props.save.fn}
        />
      )
    }

    if (this.state.index > 0) {
      buttons.push(
        <Button
          label={this.msg('client.merge.back')}
          onClick={this.backClick}
        />
      )
    }

    if (this.state.index < this.state.amountPages - 1) {
      buttons.push(
        <Button
          disabled={!this.state.allowNext}
          ink="primary"
          label={this.msg('client.merge.next')}
          onClick={this.nextClick}
        />
      )
    }

    return (
      <div className="wizard">
        <div className="wizard-body">
          {t}
        </div>
        <ButtonGroup look="raised">
          {[...buttons]}
        </ButtonGroup>
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
