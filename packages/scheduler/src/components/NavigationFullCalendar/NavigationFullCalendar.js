import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'
import {Button, ButtonGroup, Icon, Typography, DatePicker} from 'tocco-ui'

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
      <div>
        <Button
          look="raised"
          onClick={() => {
            chooseToday()
            changeRange()
          }}
        >
          <FormattedMessage id="client.scheduler.today"/>
        </Button>

        <ButtonGroup>
          <Button
            look="raised"
            onClick={() => {
              choosePrev()
              changeRange()
            }}
            icon="angle-left"
            title={msg('client.scheduler.previous', intl)}
          />
          <Button
            look="raised"
            onClick={() => {
              chooseNext()
              changeRange()
            }}
            icon="angle-right"
            title={msg('client.scheduler.next', intl)}
          />
        </ButtonGroup>
        <DatePicker
          value={date}
          onChange={date => {
            goToDate(date)
            changeRange()
          }}
        >
          <Typography.Span>{title}</Typography.Span><Icon style={{marginLeft: '5px'}} icon="chevron-down"/>
        </DatePicker>

      </div>
      <div>
        <ButtonGroup>
          <Button
            look="raised"
            {...(getButtonInkProps('dayView', type))}
            onClick={() => changeView('dayView')}
          >
            <FormattedMessage id="client.scheduler.day"/>
          </Button>

          <Button
            look="raised"
            {...(getButtonInkProps('weekView', type))}
            {...(getButtonInkProps('weekViewSimple', type))}
            onClick={() => {
              if (type !== 'weekViewSimple') {
                changeView('weekViewSimple')
              } else {
                changeView('weekView')
              }
            }}
          >
            <FormattedMessage id="client.scheduler.week"/>
          </Button>

          <Button
            look="raised"
            {...(getButtonInkProps('monthView', type))}
            onClick={() => changeView('monthView')}
          >
            <FormattedMessage id="client.scheduler.month"/>
          </Button>
        </ButtonGroup>
        <Button
          icon={isLoading ? '' : 'sync'}
          onClick={() => { if (!isLoading) { refresh() } }}
          pending={isLoading}
          title={msg('client.scheduler.reload', intl)}
        />

      </div>
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
