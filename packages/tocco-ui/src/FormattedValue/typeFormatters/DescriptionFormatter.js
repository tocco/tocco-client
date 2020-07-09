import PropTypes from 'prop-types'
import React, {useContext} from 'react'
import {ThemeContext} from 'styled-components'

import Typography from '../../Typography'
import Popover from '../../Popover'
import Icon from '../../Icon'
import HtmlFormatter from './HtmlFormatter'
import {scale, theme} from '../../utilStyles'

const DescriptionFormatter = props => {
  const themeContext = useContext(ThemeContext)
  const options = props.options || {}
  const content = <>
    {options.title && <Typography.H5>{options.title}</Typography.H5>}
    <HtmlFormatter {...props}/>
  </>
  const iconStyles = {
    color: theme.color('text')({theme: themeContext}),
    fontSize: theme.fontSize('base')({theme: themeContext}) * theme.fontSize('factor')({theme: themeContext}) + 'rem',
    marginLeft: '-' + scale.space(-1)({theme: themeContext})
  }

  if (options.mode === 'text') {
    return content
  }

  return <Popover
    content={content}
    isPlainHtml={true}
    placement="top"
  ><Icon
      style={iconStyles}
      icon="question-circle"/>
  </Popover>
}

DescriptionFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool,
  options: PropTypes.shape({
    mode: PropTypes.oneOf(['text', 'tooltip']),
    title: PropTypes.string
  })
}

export default DescriptionFormatter
