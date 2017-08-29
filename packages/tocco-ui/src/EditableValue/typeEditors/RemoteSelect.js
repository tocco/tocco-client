import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'

class RemoteSelect extends React.Component {
  onValueClick = v => {
    if (this.props.options.valueClick) {
      this.props.options.valueClick(v)
    }
  }

  getOptions = () => {
    const options = [...(this.props.options.options || [])]
    if (this.props.options.moreOptionsAvailable) {
      const option = {display: this.props.options.moreOptionsAvailableText, disabled: true}
      options.push(option)
    }
    return options
  }

  render() {
    return (
      <div>
        <Select
          valueKey="key"
          labelKey="display"
          loadingPlaceholder="Laden"
          placeholder=""
          clearValueText={this.props.options.clearValueText}
          searchPromptText={this.props.options.searchPromptText}
          noResultsText={this.props.options.noResultsText}
          multi={false}
          value={this.props.value}
          onChange={this.props.onChange}
          onValueClick={this.onValueClick}
          filterOption={() => (true)}
          autoload={false}
          onInputChange={searchTerm => {
            this.props.options.fetchOptions(searchTerm)
          }}
          options={this.getOptions()}
          isLoading={this.props.options.isLoading}
          disabled={this.props.readOnly}
        />
      </div>
    )
  }
}

RemoteSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
    PropTypes.string // empty string coming from Redux Form if value null
  ]),
  options: PropTypes.shape({
    options: PropTypes.array,
    fetchOptions: PropTypes.func,
    isLoading: PropTypes.bool,
    valueClick: PropTypes.func,
    clearValueText: PropTypes.string,
    searchPromptText: PropTypes.string,
    noResultsText: PropTypes.string,
    moreOptionsAvailable: PropTypes.bool,
    moreOptionsAvailableText: PropTypes.string
  }),
  readOnly: PropTypes.bool
}

export default RemoteSelect
