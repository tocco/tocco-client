import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs'

import Link from './'
import excludeIntlInfo from '../util/excludeIntlInfo'

storiesOf('Display Data', module)
  .addDecorator(withKnobs)
  .add(
    'Link',
    () => <Link
      alt={text('alt', 'This is a phone link.')}
      breakWords={boolean('breakWords', false)}
      download={text('download', 'tocco-101x101.png')}
      href={text('href', '#Link')}
      icon={text('icon', 'phone')}
      label={text('label', 'Phone Link')}
      neutral={boolean('neutral', true)}
      target={select('target', ['_blank', '_self'])}
      title={text('title', 'This is the phone link.')}
    />, excludeIntlInfo()
  )
