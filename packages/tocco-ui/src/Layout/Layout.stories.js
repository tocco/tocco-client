import {IntlProvider} from 'react-intl'
import {storiesOf} from '@storybook/react'

import {insertLayoutContent, ExampleCell, ExamplePanel1, ExamplePanel2, ExamplePanel3} from './example'

storiesOf('Layout', module)
  .add(
    'Layout',
    () => insertLayoutContent(),
    {info: {propTablesExclude: [ExampleCell, ExamplePanel1, ExamplePanel2, ExamplePanel3, IntlProvider]}}
  )
