import React from 'react'
import PropTypes from 'prop-types'
import {ResourceSchedulerApp} from 'tocco-resource-scheduler/src/main'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  margin: 10px;
`

const ResourceScheduler = () =>
  <StyledWrapper>
    <ResourceSchedulerApp
      onEventClick={({model, key}) => {
        window.open(window.location.href.replace('a/resourcescheduler', `e/${model}/${key}`), '_blank')
      }}
    />
  </StyledWrapper>

ResourceScheduler.propTypes = {
  match: PropTypes.object.isRequired
}

export default ResourceScheduler
