import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, number, select, text} from '@storybook/addon-knobs'

import Link from './'

storiesOf('Tocco-UI | Link', module)
  .addDecorator(withKnobs)
  .add(
    'Link',
    () => <Link
      alt={text('alt', 'This is a phone link.')}
      breakWords={boolean('breakWords', false)}
      download={text('download', 'tocco-101x101.png')}
      href={text('href', '#Link')}
      icon={select('icon', ['envelope', 'phone']) || undefined}
      label={text('label', 'Phone Link')}
      neutral={boolean('neutral', false)}
      rel={text('rel', undefined)}
      tabIndex={number('tabIndex', undefined)}
      target={select('target', ['_self', '_blank'])}
      title={text('title', 'This is the phone link.')}
    />
  )
