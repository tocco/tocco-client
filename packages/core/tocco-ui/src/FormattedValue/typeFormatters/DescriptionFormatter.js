import PropTypes from 'prop-types'
import {useContext} from 'react'
import {ThemeContext} from 'styled-components'

import Icon from '../../Icon'
import Popover from '../../Popover'
import Typography from '../../Typography'
import {scale, theme} from '../../utilStyles'
import HtmlFormatter from './HtmlFormatter'

const DescriptionFormatter = props => {
  const themeContext = useContext(ThemeContext)
  const options = props.options || {}
  const content = (
    <>
      {options.title && <Typography.H5>{options.title}</Typography.H5>}
      <HtmlFormatter {...props} />
    </>
  )
  const iconStyles = {
    color: theme.color('text')({theme: themeContext}),
    fontSize: `${theme.fontSize('base')({theme: themeContext}) * theme.fontSize('factor')({theme: themeContext})}rem`,
    marginLeft: `-${scale.space(-1.9)({theme: themeContext})}`
  }

  if (options.mode === 'text') {
    return content
  }

  return (
    <Popover content={content} isPlainHtml={true}>
      <Icon style={iconStyles} icon="question-circle" />
    </Popover>
  )
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
