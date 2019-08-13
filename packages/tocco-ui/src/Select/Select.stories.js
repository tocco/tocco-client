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

export class SelectStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      options: null,
      value: [{key: 3, display: 'Option 3'}],
      valueMulti: [{key: 2, display: 'Option 2'}],
      moreOptionsAvailable: false,
      tooltips: {}
    }
  }

  fetchOptions = () => {
    if (this.state.options === null) {
      this.setState({...this.state, options: null, isLoading: true})
      setTimeout(() => { this.setState({...this.state, options, isLoading: false}) }, this.props.delay || 0)
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
    }, this.props.delay || 0)
  }

  setValue = value => {
    this.setState({...this.state, value})
  }

  setValueMulti = valueMulti => {
    this.setState({...this.state, valueMulti})
  }

  loadToolTip = key => {
    if (!this.state.tooltips[key]) {
      this.setState({...this.state, tooltips: {...this.state.tooltips, [key]: `TOOL TIP ${key}`}})
    }
  }

  render() {
    return (
      <div style={{maxWidth: '400px'}}>
        <Select
          fetchOptions={this.fetchOptions}
          isLoading={this.state.isLoading}
          isMulti={false}
          loadTooltip={this.loadToolTip}
          moreOptionsAvailable={this.state.moreOptionsAvailable}
          moreOptionsAvailableText="More options available"
          noResultsText="No more options."
          onChange={this.setValue}
          openAdvancedSearch={action('open advanced search')}
          options={this.state.options}
          immutable={this.props.immutable}
          searchOptions={this.searchOptions}
          tooltips={this.state.tooltips}
          value={this.state.value}
        />
        <Select
          fetchOptions={this.fetchOptions}
          isLoading={this.state.isLoading}
          isMulti={true}
          loadTooltip={this.loadToolTip}
          moreOptionsAvailable={this.state.moreOptionsAvailable}
          moreOptionsAvailableText="More options available"
          noResultsText="No more options."
          onChange={this.setValueMulti}
          openAdvancedSearch={action('open advanced search')}
          options={this.state.options}
          immutable={this.props.immutable}
          searchOptions={this.searchOptions}
          tooltips={this.state.tooltips}
          value={this.state.valueMulti}
          valueLinkFactory={(key, children) =>
            <a href={`/${key}`} target="_blank" rel="noopener noreferrer" >{children}</a>
          }
        />
      </div>
    )
  }
}

SelectStory.propTypes = {
  delay: PropTypes.number,
  isMulti: PropTypes.bool,
  immutable: PropTypes.bool
}

storiesOf('Tocco-UI | Select', module)
  .addDecorator(withKnobs)
  .add(
    'Select',
    () =>
      <SelectStory
        action={action}
        delay={2000}
        immutable={boolean('immutable', false)}
      />,
    {info: {propTables: [Raw], propTablesExclude: [SelectStory], source: false}}
  )
