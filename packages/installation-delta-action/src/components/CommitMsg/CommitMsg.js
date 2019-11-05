import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Typography, Button} from 'tocco-ui'

const addLineBreaks = string =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br/>
    </React.Fragment>
  ))

const CommitMsg = ({msg}) => {
  const [expanded, setExpanded] = useState(false)

  const formattedText = addLineBreaks(msg)
  const text = expanded ? formattedText : formattedText[0]

  return <Typography.Span>
    {text}
    {formattedText.length > 1
    && <Button
      onClick={() => setExpanded(!expanded)}
      icon={expanded ? 'chevron-up' : 'chevron-down'}
    />}
  </Typography.Span>
}

CommitMsg.propTypes = {
  msg: PropTypes.string.isRequired
}

export default CommitMsg
