import {action} from '@storybook/addon-actions'
import PropTypes from 'prop-types'
import {useState} from 'react'

import Select from './'

const availableOptions = [
  {key: 1, display: 'Option 1'},
  {key: 2, display: 'Option 2'},
  {key: 3, display: 'Option 3'},
  {key: 4, display: 'Option 4'},
  {key: 5, display: 'Option 5'}
]

export default {
  title: 'Tocco-UI/Select',
  component: Select,
  argTypes: {
    hasAdvancedSearch: {type: 'boolean', defaultValue: false}
  }
}

const useSelectStoryHepers = delay => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState(null)
  const [value, setValue] = useState([availableOptions[2]])
  const [valueMulti, setValueMulti] = useState([availableOptions[0], availableOptions[3]])
  const [moreOptionsAvailable, setMoreOptionsAvailable] = useState(false)
  const [tooltips, setTooltips] = useState({})

  const fetchOptions = () => {
    if (options === null) {
      setOptions(null)
      setIsLoading(true)
      setTimeout(() => {
        setOptions(availableOptions)
        setIsLoading(false)
      }, delay || 0)
    }
  }

  const searchOptions = () => {
    setOptions(null)
    setIsLoading(true)
    setTimeout(() => {
      setOptions(availableOptions.filter((e, idx) => idx % 2 === 0))
      setIsLoading(false)
      setMoreOptionsAvailable(true)
    }, delay || 0)
  }

  const loadToolTip = key => {
    if (!tooltips[key]) {
      setTooltips({...tooltips, [key]: `TOOL TIP ${key}`})
    }
  }

  return {
    isLoading,
    options,
    value,
    valueMulti,
    moreOptionsAvailable,
    tooltips,
    fetchOptions,
    searchOptions,
    loadToolTip,
    setValue,
    setValueMulti
  }
}

export const Overview = props => {
  const {
    isLoading,
    options,
    value,
    valueMulti,
    moreOptionsAvailable,
    tooltips,
    fetchOptions,
    searchOptions,
    loadToolTip,
    setValue,
    setValueMulti
  } = useSelectStoryHepers(props.delay || 2000)

  const basicProps = {
    fetchOptions,
    isLoading,
    isMulti: false,
    loadTooltip: loadToolTip,
    moreOptionsAvailable,
    moreOptionsAvailableText: 'More options available',
    noResultsText: 'No more options.',
    onChange: setValue,
    options,
    searchOptions,
    tooltips,
    value
  }

  const detailLink = ({entityKey, children}) => (
    <a href={`/${entityKey}`} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )

  return (
    <div style={{maxWidth: '400px'}}>
      <h2>Single Select</h2>
      <Select {...basicProps} />

      <h2>Multi Select</h2>
      <Select {...basicProps} isMulti={true} onChange={setValueMulti} value={valueMulti} DetailLink={detailLink} />

      <h2>Multi Select immutable</h2>
      <Select
        {...basicProps}
        isMulti={true}
        onChange={setValueMulti}
        value={valueMulti}
        immutable
        DetailLink={detailLink}
      />

      <h2>Multi Remote Select</h2>
      <Select
        {...basicProps}
        isMulti={true}
        onChange={setValueMulti}
        value={valueMulti}
        DetailLink={detailLink}
        openAdvancedSearch={action('open advanced search')}
      />

      <h2>Multi Remote Select immutable</h2>
      <Select
        {...basicProps}
        isMulti={true}
        onChange={setValueMulti}
        value={valueMulti}
        immutable
        DetailLink={detailLink}
        openAdvancedSearch={action('open advanced search')}
      />
    </div>
  )
}

Overview.propTypes = {
  delay: PropTypes.number
}

export const Basic = ({delay, hasAdvancedSearch, ...props}) => {
  const {
    isLoading,
    options,
    value,
    moreOptionsAvailable,
    tooltips,
    fetchOptions,
    searchOptions,
    loadToolTip,
    setValue
  } = useSelectStoryHepers(props.delay || 2000)

  return (
    <div style={{maxWidth: '400px'}}>
      <Select
        fetchOptions={fetchOptions}
        isLoading={isLoading}
        isMulti={false}
        loadTooltip={loadToolTip}
        moreOptionsAvailable={moreOptionsAvailable}
        moreOptionsAvailableText="More options available"
        noResultsText="No more options."
        onChange={setValue}
        options={options}
        searchOptions={searchOptions}
        tooltips={tooltips}
        value={value}
        openAdvancedSearch={hasAdvancedSearch ? action('open advanced search') : undefined}
        {...props}
      />
    </div>
  )
}

Basic.propTypes = {
  delay: PropTypes.number,
  hasAdvancedSearch: PropTypes.bool
}
