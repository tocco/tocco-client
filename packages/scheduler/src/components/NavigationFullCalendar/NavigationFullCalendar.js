import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'
import {Button, Icon, Menu, Typography, DatePicker} from 'tocco-ui'

import StyledNavigationFullCalendar from './StyledNavigationFullCalendar'

const getButtonInkProps = (viewType, type) => (viewType === type) ? {ink: 'primary'} : {}

const msg = (id, intl) => intl.formatMessage({id})

const NavigationFullCalendar = props => {
  const {
    date,
    changeRange,
    changeView,
    chooseNext,
    choosePrev,
    chooseToday,
    goToDate,
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
          <Button
            look="raised"
            onClick={() => {
              chooseToday()
              changeRange()
            }}
          ><FormattedMessage id="client.scheduler.today"/></Button>
        </Menu.Item>
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
                icon="angle-left"
                title={msg('client.scheduler.previous', intl)}
              />
            </Menu.Item>
            <Menu.Item>
              <Button
                onClick={() => {
                  chooseNext()
                  changeRange()
                }}
                icon="angle-right"
                title={msg('client.scheduler.next', intl)}
              />
            </Menu.Item>
          </Menu.ButtonGroup>
        </Menu.Item>
        <Menu.Item>
          <DatePicker
            value={date}
            onChange={date => {
              goToDate(date)
              changeRange()
            }}
          >
            <Typography.Span>{title}</Typography.Span><Icon style={{marginLeft: '5px'}} icon="chevron-down"/>
          </DatePicker>
        </Menu.Item>
        <Menu.Item>
          <Menu.ButtonGroup
            look="raised"
            melt
          >
            <Menu.Item>
              <Button
                {...(getButtonInkProps('dayView', type))}
                onClick={() => changeView('dayView')}
              >
                <FormattedMessage id="client.scheduler.day"/>
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                {...(getButtonInkProps('weekView', type))}
                onClick={() => changeView('weekView')}
              >
                <FormattedMessage id="client.scheduler.week"/>
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                {...(getButtonInkProps('monthView', type))}
                onClick={() => changeView('monthView')}
              >
                <FormattedMessage id="client.scheduler.month"/>
              </Button>
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
      </Menu.Button>
    </StyledNavigationFullCalendar>
  )
}

NavigationFullCalendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  changeRange: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  chooseNext: PropTypes.func.isRequired,
  choosePrev: PropTypes.func.isRequired,
  chooseToday: PropTypes.func.isRequired,
  goToDate: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  isLoading: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
  title: PropTypes.string,
  type: PropTypes.string
}

export {getButtonInkProps}
export default injectIntl(NavigationFullCalendar)
