import PropTypes from 'prop-types'
import React from 'react'
import PropVal from '@storybook/addon-info/dist/components/PropVal'
import PrettyPropType from '@storybook/addon-info/dist/components/types/PrettyPropType'

// Copy of @storybook/addon-info to enhance legibility.

const Table = props => <table {...props} />
const Td = props => <td {...props}
  style={{
    ...props.style,
    paddingBottom: 3,
    paddingRight: 10,
    paddingTop: 3,
    textAlign: 'left',
    verticalAlign: 'top'
  }}
/>
const Tr = props => <tr {...props} style={{...props.style}} />
const Th = props => <th {...props}
  style={{
    borderBottom: '1px solid #ccc',
    paddingBottom: 3,
    paddingRight: 10,
    paddingTop: 3,
    textAlign: 'left',
    verticalAlign: 'top'
  }}
/>
const Tbody = props => <tbody {...props} />
const Thead = props => <thead {...props} />

export const multiLineText = input => {
  if (!input) {
    return input
  }
  const text = String(input)
  const arrayOfText = text.split(/\r?\n|\r/g)
  const isSingleLine = arrayOfText.length < 2
  return isSingleLine
    ? text
    : arrayOfText.map((lineOfText, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={`${lineOfText}.${i}`}>
        {i > 0 && <br />} {lineOfText}
      </span>
    ))
}

const determineIncludedPropTypes = (propDefinitions, excludedPropTypes) => {
  if (excludedPropTypes.length === 0) {
    return propDefinitions
  }

  return propDefinitions.filter(
    propDefinition => !excludedPropTypes.includes(propDefinition.property)
  )
}

export default function PropTable(props) {
  const {
    type,
    maxPropObjectKeys,
    maxPropArrayLength,
    maxPropStringLength,
    propDefinitions,
    excludedPropTypes
  } = props

  if (!type) {
    return null
  }

  const includedPropDefinitions = determineIncludedPropTypes(propDefinitions, excludedPropTypes)

  if (!includedPropDefinitions.length) {
    return <small>No propTypes defined!</small>
  }

  const propValProps = {
    maxPropObjectKeys,
    maxPropArrayLength,
    maxPropStringLength
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>property</Th>
          <Th>propType</Th>
          <Th>required</Th>
          <Th>default</Th>
          <Th>description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {includedPropDefinitions.map((row, i) => (
          <Tr
            key={row.property}
            style={{backgroundColor: i % 2 === 0 ? '#fafafa' : '#fff'}}
          >
            <Td
              style={{fontWeight: 'bold'}}
            >{row.property}</Td>
            <Td>
              <PrettyPropType propType={row.propType} />
            </Td>
            <Td>{row.required ? 'yes' : '-'}</Td>
            <Td>
              {row.defaultValue === undefined ? (
                '-'
              ) : (
                <PropVal val={row.defaultValue} {...propValProps} valueStyles={{}} />
              )}
            </Td>
            <Td>{multiLineText(row.description)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

Td.propTypes = {style: PropTypes.object}
Tr.propTypes = {style: PropTypes.object}
PropTable.displayName = 'PropTable'
PropTable.defaultProps = {
  type: null,
  propDefinitions: [],
  excludedPropTypes: []
}
PropTable.propTypes = {
  type: PropTypes.func,
  maxPropObjectKeys: PropTypes.number.isRequired,
  maxPropArrayLength: PropTypes.number.isRequired,
  maxPropStringLength: PropTypes.number.isRequired,
  excludedPropTypes: PropTypes.arrayOf(PropTypes.string),
  propDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      propType: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      required: PropTypes.bool,
      description: PropTypes.string,
      defaultValue: PropTypes.any
    })
  )
}
