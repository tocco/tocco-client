import React from 'react'

export class WizardPage extends React.Component {

  render() {
    return (
      <div>
        <button onClick={this.props.doNext}>Next</button>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      amountPages: props.children.length
    }
  }

  getCurrentPage = () => {
    return this.props.children.find((child, idx) => {
      return idx === this.state.index
    })
  }

  backClick = () => {
    if (this.state.index > 0) {
      this.setState(function (previousState) {
        return {index: previousState.index - 1}
      })
    }
  }

  nextClick = () => {
    if (this.state.index < (this.state.amountPages - 1)) {
      this.setState(function (previousState) {
        return {index: previousState.index + 1}
      })
    }
  }

  render() {
    var decoratedChild = this.getCurrentPage()
    var t = <WizardPage {...decoratedChild.props} doNext={this.nextClick}></WizardPage>
    return (
      <div>
        <h1>{this.state.index}</h1>
        {t}
        {(this.state.index > 0) && <button className="btn" onClick={this.backClick}>Back</button>}
        {(this.state.index < this.state.amountPages - 1) && <button className="btn" onClick={this.nextClick}>Next</button>}
      </div>
    )
  }
}

Wizard.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element)
}


