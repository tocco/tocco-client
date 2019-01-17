import {storiesOf} from '@storybook/react'

import excludeIntlInfo from '../util/excludeIntlInfo'
import {insertTypographyContent} from './example'

storiesOf('Display Data', module)
  .add(
    'Typography',
    () => insertTypographyContent(), excludeIntlInfo()
  )
