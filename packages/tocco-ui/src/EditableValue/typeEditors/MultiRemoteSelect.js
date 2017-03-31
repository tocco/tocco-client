import React from 'react'
import Select from 'react-select'

class MultiRemoteSelect extends React.Component {
  loadOptions = searchTerm => (
    this.props.options.fetchOptions(searchTerm).then(res => ({options: res, complete: false}))
  )

  onValueClick = v => {
    if (this.props.options.valueClick) {
      this.props.options.valueClick(v)
    }
  }

  render() {
    return (
      <div>
        <Select.Async
          valueKey="key"
          labelKey="display"
          loadingPlaceholder="Laden"
          placeholder=""
          searchPromptText="Tippen, um zu suchen"
          noResultsText="-"
          multi
          value={this.props.value}
          onChange={this.props.onChange}
          onValueClick={this.onValueClick}
          loadOptions={this.loadOptions}
          filterOption={() => (true)}
          autoload={false}
        />
      </div>
    )
  }
}

MultiRemoteSelect.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    })
  ),
  options: React.PropTypes.shape({
    fetchOptions: React.PropTypes.func,
    valueClick: React.PropTypes.func
  }),
  readOnly: React.PropTypes.bool
}

export default MultiRemoteSelect
