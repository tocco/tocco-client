import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Icon, Typography} from 'tocco-ui'

import {updateMarked as updateMarkedAction} from '../../modules/entityDetail/actions'
import {StyledActionSpan} from './StyledComponents'

const MarkButton = ({entityName, entityId, marked, updateMarked}) => {
  const [mouseOver, setMouseOver] = useState(false)

  useEffect(() => {
    if (!marked) {
      setMouseOver(false) // reset mouse over to false to show empty star when user unmarks even if still hovering
    }
  }, [marked])

  const handleClick = e => {
    e.stopPropagation()
    updateMarked(entityName, entityId, !marked)
  }

  return (
    <Typography.Span>
      <StyledActionSpan
        marked={marked}
        onClick={handleClick}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <Icon icon={marked || mouseOver ? 'star-full' : 'star'} />
      </StyledActionSpan>
    </Typography.Span>
  )
}

MarkButton.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  marked: PropTypes.bool.isRequired,
  updateMarked: PropTypes.func.isRequired
}

const mapActionCreators = {
  updateMarked: updateMarkedAction
}

const mapStateToProps = state => ({
  entityName: state.input.entityName,
  entityId: state.input.entityId,
  marked: state.entityDetail.marked
})

export default connect(mapStateToProps, mapActionCreators)(MarkButton)
