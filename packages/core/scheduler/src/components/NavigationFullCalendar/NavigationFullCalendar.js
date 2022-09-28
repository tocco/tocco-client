import PropTypes from 'prop-types'
import {FormattedMessage, injectIntl} from 'react-intl'
import {Button, ButtonGroup, Icon, Typography, DatePicker} from 'tocco-ui'

import {
  StyledNavigationFullCalendar,
  StyledButtonGroupReloadWrapper,
  StyledReloadButtonWrapper
} from './StyledComponents'

export const getButtonInkProps = (viewType, type) => (viewType === type ? {ink: 'secondary'} : {})

const msg = (id, intl) => intl.formatMessage({id})

const NavigationFullCalendar = ({
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
}) => {
  const handleReload = () => {
    if (!isLoading) {
      refresh()
    }
  }

  const handleToday = () => {
    chooseToday()
    changeRange()
  }

  const handlePrevious = () => {
    choosePrev()
    changeRange()
  }

  const handleNext = () => {
    chooseNext()
    changeRange()
  }

  const handleDateChange = date => {
    goToDate(date)
    changeRange()
  }

  const handleDayView = () => changeView('dayView')
  const handleWeekView = () => (type !== 'weekViewSimple' ? changeView('weekViewSimple') : changeView('weekView'))
  const handleMonthView = () => changeView('monthView')

  return (
    <StyledNavigationFullCalendar>
      <div>
        <Button look="raised" onClick={handleToday}>
          <FormattedMessage id="client.scheduler.today" />
        </Button>
        <ButtonGroup>
          <Button
            look="raised"
            onClick={handlePrevious}
            icon="chevron-left"
            title={msg('client.scheduler.previous', intl)}
          />
          <Button look="raised" onClick={handleNext} icon="chevron-right" title={msg('client.scheduler.next', intl)} />
        </ButtonGroup>
        <DatePicker value={date} onChange={date => handleDateChange(date)}>
          <Typography.Span>{title}</Typography.Span>
          <Icon style={{marginLeft: '5px'}} icon="chevron-down" />
        </DatePicker>
      </div>
      <StyledButtonGroupReloadWrapper>
        <ButtonGroup>
          <Button look="raised" {...getButtonInkProps('dayView', type)} onClick={handleDayView}>
            <FormattedMessage id="client.scheduler.day" />
          </Button>
          <Button
            look="raised"
            {...getButtonInkProps('weekView', type)}
            {...getButtonInkProps('weekViewSimple', type)}
            onClick={handleWeekView}
          >
            <FormattedMessage id="client.scheduler.week" />
          </Button>
          <Button look="raised" {...getButtonInkProps('monthView', type)} onClick={handleMonthView}>
            <FormattedMessage id="client.scheduler.month" />
          </Button>
        </ButtonGroup>
        <StyledReloadButtonWrapper>
          <Button
            icon={isLoading ? '' : 'sync'}
            onClick={handleReload}
            pending={isLoading}
            title={msg('client.scheduler.reload', intl)}
          />
        </StyledReloadButtonWrapper>
      </StyledButtonGroupReloadWrapper>
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
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
  title: PropTypes.string,
  type: PropTypes.string
}

export default injectIntl(NavigationFullCalendar)
