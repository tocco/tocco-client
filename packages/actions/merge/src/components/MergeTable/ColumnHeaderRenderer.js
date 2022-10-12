import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Typography} from 'tocco-ui'

import {StyledStatusWrapper} from './StyledComponents'

const ColumnHeaderRenderer = ({label, entityKey, setTargetEntity, targetEntity, mergeStrategyDisplay}) => {
  const isChecked = targetEntity === entityKey
  const status = isChecked ? <FormattedMessage id="client.merge.strategy.keep" /> : mergeStrategyDisplay
  const onChange = () => setTargetEntity(entityKey)

  return (
    <>
      <input type="radio" name="column" onChange={onChange} checked={isChecked} id={`targetEntity${entityKey}`} />
      <Typography.Label for={`targetEntity${entityKey}`}>
        <Typography.B>{label}</Typography.B>
        <StyledStatusWrapper isChecked={isChecked}> ({status})</StyledStatusWrapper>
      </Typography.Label>
    </>
  )
}

ColumnHeaderRenderer.propTypes = {
  label: PropTypes.string,
  entityKey: PropTypes.string.isRequired,
  setTargetEntity: PropTypes.func.isRequired,
  targetEntity: PropTypes.string,
  mergeStrategyDisplay: PropTypes.string.isRequired
}

export default ColumnHeaderRenderer
