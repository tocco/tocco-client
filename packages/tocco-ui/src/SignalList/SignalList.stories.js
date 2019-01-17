import {storiesOf} from '@storybook/react'

import insertSignalListContent from './example'
import excludeIntlInfo from '../util/excludeIntlInfo'

storiesOf('Message', module)
  .add(
    'SignalList',
    () => insertSignalListContent(), excludeIntlInfo()
  )
