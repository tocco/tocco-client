import {storiesOf} from '@storybook/react'
import {IntlProvider} from 'react-intl'

import {insertMenuContent} from './example'
import Button from '../Button'
import ButtonLink from '../ButtonLink'
import Typography from '../Typography'
import Icon from '../Icon'
import Menu from './Menu'

storiesOf('Navigation', module)
  .add(
    'Menu',
    () => insertMenuContent(),
    {info: {
      propTables: [Menu],
      propTablesExclude: [Button, ButtonLink, Icon, Typography.Em, Typography.Span, Typography.Strong, IntlProvider]
    }}
  )
