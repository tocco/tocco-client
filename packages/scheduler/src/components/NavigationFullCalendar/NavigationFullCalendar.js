import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage, intlShape} from 'react-intl'
import {Button, Menu, Typography} from 'tocco-ui'

import StyledNavigationFullCalendar from './StyledNavigationFullCalendar'

const getButtonInkProps = (viewType, type) => (viewType === type) ? {ink: 'primary'} : {}

const msg = (id, intl) => intl.formatMessage({id})

const NavigationFullCalendar = props => {
  const {
    changeRange,
    changeView,
    chooseNext,
    choosePrev,
    chooseToday,
    intl,
    isLoading,
    refresh,
    title,
    type
  } = props

  return (
    <StyledNavigationFullCalendar>
      <Menu.Button look="raised">
        <Menu.Item>
          <Menu.ButtonGroup
            look="raised"
            melt
          >
            <Menu.Item>
              <Button
                onClick={() => {
                  choosePrev()
                  changeRange()
                }}
                icon="chevron-left"
                title={msg('client.scheduler.previous', intl)}
              />
            </Menu.Item>
            <Menu.Item>
              <Button
                look="raised"
                onClick={() => {
                  chooseToday()
                  changeRange()
                }}
              ><FormattedMessage id="client.scheduler.today"/></Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                onClick={() => {
                  chooseNext()
                  changeRange()
                }}
                icon="chevron-right"
                title={msg('client.scheduler.next', intl)}
              />
            </Menu.Item>
          </Menu.ButtonGroup>
        </Menu.Item>
        <Menu.Item>
          <Button
            icon={isLoading ? '' : 'sync'}
            look="raised"
            onClick={() => { if (!isLoading) { refresh() } }}
            pending={isLoading}
            title={msg('client.scheduler.reload', intl)}
          />
        </Menu.Item>
        <Menu.Item>
          <Typography.H3>{title}</Typography.H3>
        </Menu.Item>
        <Menu.Item>
          <Menu.ButtonGroup
            look="raised"
            melt
          >
            <Menu.Item>
              <Button
                {...(getButtonInkProps('timelineDay', type))}
                onClick={() => changeView('timelineDay')}
              >
                <FormattedMessage id="client.scheduler.day"/>
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                {...(getButtonInkProps('timelineWeek', type))}
                onClick={() => changeView('timelineWeek')}
              >
                <FormattedMessage id="client.scheduler.week"/>
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                {...(getButtonInkProps('timelineMonth', type))}
                onClick={() => changeView('timelineMonth')}
              >
                <FormattedMessage id="client.scheduler.month"/>
              </Button>
            </Menu.Item>
          </Menu.ButtonGroup>
        </Menu.Item>
      </Menu.Button>
    </StyledNavigationFullCalendar>
  )
}

NavigationFullCalendar.propTypes = {
  changeRange: PropTypes.func,
  changeView: PropTypes.func,
  chooseNext: PropTypes.func,
  choosePrev: PropTypes.func,
  chooseToday: PropTypes.func,
  intl: intlShape.isRequired,
  isLoading: PropTypes.bool,
  locale: PropTypes.string,
  refresh: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string
}

export default NavigationFullCalendar
