import {storiesOf} from '@storybook/react'
import {IntlProvider} from 'react-intl'

import Typography from '../Typography'
import Preview from '../Preview'
import insertPanelContent from './example'

storiesOf('Layout', module)
  .add(
    'Panel',
    () => insertPanelContent(), {info: {propTablesExclude:
        [IntlProvider, Preview, Typography, Typography.H4, Typography.H5, Typography.P, Typography.Span]}}
  )
