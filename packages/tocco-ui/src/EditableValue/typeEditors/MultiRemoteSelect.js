import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'

class MultiRemoteSelect extends React.Component {
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
          searchPromptText={this.props.options.searchPromptText}
          clearAllText={this.props.options.clearAllText}
          noResultsText={this.props.options.noResultsText}
          multi
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

MultiRemoteSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  ),
  options: PropTypes.shape({
    options: PropTypes.array,
    fetchOptions: PropTypes.func,
    isLoading: PropTypes.bool,
    valueClick: PropTypes.func,
    clearAllText: PropTypes.string,
    searchPromptText: PropTypes.string,
    noResultsText: PropTypes.string,
    moreOptionsAvailable: PropTypes.bool,
    moreOptionsAvailableText: PropTypes.string
  }),
  readOnly: PropTypes.bool
}

export default MultiRemoteSelect
