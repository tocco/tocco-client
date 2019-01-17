import {storiesOf} from '@storybook/react'

import {insertMultiCheckBoxContent} from './example'
import excludeIntlInfo from '../util/excludeIntlInfo'

storiesOf('Navigation', module)
  .add(
    'MultiCheckbox',
    () => insertMultiCheckBoxContent(), excludeIntlInfo()
  )
