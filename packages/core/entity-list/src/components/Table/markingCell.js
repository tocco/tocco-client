import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'tocco-ui'

import {setMarked as setMarkedAction} from '../../modules/list/actions'
import {StyledMarkingWrapper} from './StyledComponents'

const CellRenderer = ({rowData, markings, setMarked}) => {
  const [mouseOver, setMouseOver] = useState(false)

  const marked = markings && markings[rowData.__model] && markings[rowData.__model][rowData.__key]

  useEffect(() => {
    if (!marked) {
      setMouseOver(false) // reset mouse over to false to show empty star when user unmarks even if still hovering
    }
  }, [marked])

  const handleClick = e => {
    e.stopPropagation()
    setMarked(rowData.__model, rowData.__key, !marked)
  }

  return (
    <StyledMarkingWrapper
      marked={marked}
      onClick={handleClick}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <Icon icon={marked || mouseOver ? 'star-full' : 'star'} />
    </StyledMarkingWrapper>
  )
}

CellRenderer.propTypes = {
  rowData: PropTypes.shape({
    __key: PropTypes.string.isRequired,
    __model: PropTypes.string.isRequired
  }).isRequired,
  markings: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool)),
  setMarked: PropTypes.func.isRequired
}

const mapActionCreators = {
  setMarked: setMarkedAction
}

const mapStateToProps = state => ({
  markings: state.list.lazyData.markings
})

const MarkingCellRenderer = connect(mapStateToProps, mapActionCreators)(CellRenderer)

export const markingCell = () => ({
  id: 'mark-column',
  fixedPosition: true,
  width: 30,
  resizable: false,
  dynamic: false,
  CellRenderer: MarkingCellRenderer
})
