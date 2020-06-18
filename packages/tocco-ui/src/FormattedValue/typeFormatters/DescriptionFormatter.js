import PropTypes from 'prop-types'
import React, {useContext} from 'react'
import {ThemeContext} from 'styled-components'

import Typography from '../../Typography'
import Popover from '../../Popover'
import Icon from '../../Icon'
import HtmlFormatter from './HtmlFormatter'
import {theme} from '../../utilStyles'

const DescriptionFormatter = props => {
  const themeContext = useContext(ThemeContext)
  const options = props.options || {}
  const content = <React.Fragment>
    {options.title && <Typography.H5>{options.title}</Typography.H5>}
    <HtmlFormatter {...props}/>
  </React.Fragment>

  if (options.mode === 'text') {
    return content
  }

  return <Popover
    content={content}
    isPlainHtml={true}
    placement="top"
  ><Icon
      style={{
        color: theme.color('signal.info.text')({theme: themeContext}),
        fontSize: theme.fontSize('base')({theme: themeContext}) + 'rem'
      }}
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
