import React, {useState, useMemo} from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import EditableValue from '../EditableValue'
import StatedValue from '../StatedValue'
import Icon from './Icon'
import Typography from '../Typography'
import SearchBox from '../SearchBox'

export const Header = styled.div`
  width: 50%;
  margin: 0 auto;
  text-align: center;
`

export const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 140px);
  grid-gap: 20px 10px;
  justify-content: center;
`

export const IconContainer = styled.div`
  text-align: center;
  display: block;
  cursor: pointer;

  span{
    display: block;
  }
`

function copyTocClipboard(key) {
  const textArea = document.createElement('textarea')
  textArea.value = key
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('Copy')
  textArea.remove()
  alert(`copied "${key}" to clipboard`)
}

const IconsShowcase = () => {
  const [filter, setFilter] = useState('')
  const [size, setSize] = useState('16px')

  const mappings = require('./mapping')

  const trans = Object.keys(mappings).reduce((acc, key) => {
    return [...acc, {...mappings[key], key}]
  }, [])

  const fuse = useMemo(() => {
    const options = {
      minMatchCharLength: 1,
      keys: ['key', 'tags', 'id']
    }

    return new Fuse(trans, options)
  }, [])

  const icons = filter ? fuse.search(filter) : trans

  return <div>
    <Header>
      <SearchBox placeholder="Search for an Icon.." value={filter} onSearch={setFilter} liveSearch minInputLength={2}/>
      <Typography.H5>{icons.length} Results</Typography.H5>
    </Header>
    <div style={{width: '100px'}}>
      <StatedValue label="Size" hasValue={size}>
        <EditableValue type="string" value={size} events={{onChange: setSize}}/>
      </StatedValue>
    </div>
    <Box>
      {icons.map((mapping, idx) => {
        return <IconContainer key={idx} onClick={() => {
          copyTocClipboard(mapping.key)
        }}>
          <Icon icon={mapping.key} style={{fontSize: size}}/>
          <Typography.Span>{mapping.key}</Typography.Span>
        </IconContainer>
      })}
    </Box></div>
}

export default IconsShowcase
