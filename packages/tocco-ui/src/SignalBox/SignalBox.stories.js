import {storiesOf} from '@storybook/react'
import {IntlProvider} from 'react-intl'

import {insertSignalBoxContent} from './example'
import {Typography} from '../index'

storiesOf('Message', module)
  .add(
    'SignalBox',
    () => insertSignalBoxContent(),
    {info: {propTablesExclude: [IntlProvider, Typography.I, Typography.P, Typography.B]}}
  )
