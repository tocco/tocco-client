import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, number, text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import SchedulerApp from './main'

storiesOf('Apps/Scheduler', module)
  .addDecorator(withKnobs)
  .add(
    'Scheduler',
    () => <SchedulerApp
      locale={text('locale', 'de-CH')}
      calendars={[{
        id: 'id',
        label: 'Scheduler',
        model: 'User',
        calendarType: text('calendarType', 'test'),
        events: [{
          description: text('description', ''),
          start: number('start', 10),
          end: number('end', 12),
          allDay: boolean('allDay', false)
        }]
      }]}

      onDateRangeChange={action('changed range')}
      onCalendarRemove={action('calendar removed')}
      onEventClick={action('clicked')}
    />
  )
