import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Typography} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {StyledButtonWrapper, StyledCheckbox, StyledUl} from './StyledComponents'

const InfoBoxSettings = ({initialInfoBoxes, onOk}) => {
  const [infoBoxes, setInfoBoxes] = useState(initialInfoBoxes || [])
  
  const toggle = id => {
    setInfoBoxes(boxes => boxes.reduce((acc, box) => [
      ...acc,
      {...box, folded: box.id === id ? !box.folded : box.folded}
    ], []))
  }

  return (
    <div>
      <StyledUl>{infoBoxes.map(box => (
        <Typography.Li key={box.id}>
          <StyledCheckbox
            type="checkbox"
            checked={!box.folded}
            onChange={() => toggle(box.id)}
            id={box.id}
          />
          <Typography.Label for={box.id}>{box.label}</Typography.Label>
        </Typography.Li>))}
      </StyledUl>
      <StyledButtonWrapper>
        <Button type="button" onClick={() => onOk(infoBoxes)} look="raised">
          <FormattedMessage id="client.common.ok"/>
        </Button>
      </StyledButtonWrapper>
    </div>
  )
}

InfoBoxSettings.propTypes = {
  initialInfoBoxes: PropTypes.array,
  onOk: PropTypes.func
}

export default InfoBoxSettings
