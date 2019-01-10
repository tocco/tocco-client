import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, boolean} from '@storybook/addon-knobs'

import Select from './'
import {Select as Raw} from './Select'

const options = [
  {key: 1, display: 'Option 1'},
  {key: 2, display: 'Option 2'},
  {key: 3, display: 'Option 3'},
  {key: 4, display: 'Option 4'},
  {key: 5, display: 'Option 5'}
]

class Story extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      options: null,
      value: [{key: 3, display: 'Option 3.'}],
      moreOptionsAvailable: false,
      tooltips: {}
    }
  }

  fetchOptions = () => {
    if (this.state.options === null) {
      this.setState({...this.state, options: null, isLoading: true})
      setTimeout(() => { this.setState({...this.state, options, isLoading: false}) }, 2000)
    }
  }

  searchOptions = () => {
    this.setState({...this.state, options: null, isLoading: true})
    setTimeout(() => {
      this.setState({
        ...this.state,
        options: options.filter((e, idx) => idx % 2 === 0),
        isLoading: false,
        moreOptionsAvailable: true
      })
    }, 2000)
  }

  setValue = value => {
    this.setState({...this.state, value})
  }

  loadToolTip = key => {
    if (!this.state.tooltips[key]) {
      this.setState({...this.state, tooltips: {...this.state.tooltips, [key]: `TOOL TIP ${key}`}})
    }
  }

  render() {
    return (
      <span>
        <Select
          isMulti={this.props.isMulti}
          fetchOptions={this.fetchOptions}
          searchOptions={this.searchOptions}
          options={this.state.options}
          isLoading={this.state.isLoading}
          onChange={this.setValue}
          value={this.state.value}
          noResultsText="No."
          moreOptionsAvailable={this.state.moreOptionsAvailable}
          moreOptionsAvailableText="More options available"
          openAdvancedSearch={action('open advanced search')}
          tooltips={this.state.tooltips}
          loadTooltip={this.loadToolTip}
        />
      </span>
    )
  }
}

Story.propTypes = {
  isMulti: PropTypes.bool

}

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add(
    'Select',
    () => <Story isMulti={boolean('isMulti', true)} action={action}/>,
    {info: {propTables: [Raw], propTablesExclude: [Story], source: false}}
  )
