import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

const Fragments = ({fragments, selectedFragments, disabled, setFragmentSelected}) => {
  const handleChange = id => e => {
    setFragmentSelected(id, e.target.checked)
  }

  return (
    <>
      {fragments.map(fragment => (
        <div key={fragment.id}>
          <input
            type="checkbox"
            id={fragment.id}
            checked={selectedFragments.includes(fragment.id)}
            onChange={handleChange(fragment.id)}
            disabled={disabled}
          />
          <Typography.Label for={fragment.id}>{fragment.label}</Typography.Label>
        </div>
      ))}
    </>
  )
}

Fragments.propTypes = {
  fragments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  selectedFragments: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  setFragmentSelected: PropTypes.func.isRequired
}

export default Fragments
