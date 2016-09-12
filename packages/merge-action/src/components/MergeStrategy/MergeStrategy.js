import React from 'react'

import Option from './Option'

class MergeStrategy extends React.Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Kopieren?</label>
            <input type="radio" className="form-check-input" name="copy" id="optionsRadios1" value="option1"/> Yes
            <input type="radio" className="form-check-input" name="copy" id="optionsRadios2" value="option2"/> No
          </div>
          <div className="form-group">
            <label>Was soll geschehen?</label>
            {
              this.props.options.map((options, idx) => {
                return <Option
                  key={`fieldset${idx}`}
                  fieldSet={options}
                  activateOption={this.props.activateOption}
                  onValueChange={this.props.changeOptionValue}
                />
              })
            }
          </div>
        </form>
      </div>
    )
  }
}

MergeStrategy.propTypes = {
  options: React.PropTypes.array.isRequired,
  changeOptionValue: React.PropTypes.func.isRequired,
  activateOption: React.PropTypes.func.isRequired
}

export default MergeStrategy
