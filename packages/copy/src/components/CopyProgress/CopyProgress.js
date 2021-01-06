import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadingSpinner} from 'tocco-ui'
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 40px;
`

const CopyProgress = ({startCopy}) => {
  useEffect(() => {
    startCopy()
  }, [])

  return (
    <StyledDiv>
      <LoadingSpinner size="30px"/>
    </StyledDiv>
  )
}

CopyProgress.propTypes = {
  startCopy: PropTypes.func.isRequired
}

export default CopyProgress
