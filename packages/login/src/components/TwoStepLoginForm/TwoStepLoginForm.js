import React, {Component} from 'react'
import '../Login/styles.scss'

export class TwoStepLoginForm extends Component {

  handleSubmit(e) {
    e.preventDefault()
    this.props.twoStepLogin(this.props.username, this.props.password, this.props.requestedCode, this.state.userCode)
  }

  handleUserCode(e) {
    this.setState({userCode: e.target.value})
  }

  render() {
    return (
      <div className="login-form">
        {
          this.props.showTitle
          && <div>
            <h1>Login</h1>
            <p>Code benötigt.</p>
          </div>
        }
        <form>
          <p>Code: {this.props.requestedCode}</p>
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
            <input
              id="code"
              type="text"
              className="form-control"
              name="code"
              autoComplete="off"
              onChange={this.handleUserCode.bind(this)}
              placeholder="Code"
            />
          </div>
          <div>
            <div>
              <button
                className={'btn btn-primary submit-button'}
                onClick={this.handleSubmit.bind(this)}
              >
                <i className="glyphicon glyphicon-log-in"/> Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

TwoStepLoginForm.propTypes = {
  twoStepLogin: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  username: React.PropTypes.string,
  password: React.PropTypes.string,
  requestedCode: React.PropTypes.string,
  showTitle: React.PropTypes.bool
}
